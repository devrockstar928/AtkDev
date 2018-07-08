
import { Injectable } from '@angular/core';
import { CONFIG } from '../../services/config.service';
import { HttpGeneralService } from '../../services/http-general.service';
import { UserSessionService } from '../../services/app-user-session.service';
import { AuthenticationService } from '../../../auth/_services';
import { Type_Of_Account, User_Session_Keys, Tier } from '../../model/interface';
const ccUrl = CONFIG.baseUrls.contentCreator;
const userUrl = CONFIG.baseUrls.user;
const adminUrl = CONFIG.baseUrls.admin;

@Injectable()
export class TiersHttpService {

  constructor(private httpSer: HttpGeneralService
    , private userSession: UserSessionService
    , private authSer: AuthenticationService) { }

   //#region teris
   getUserTiers(tierId?: number) {

    let url;
    let ass=this.userSession.getSessionKey(User_Session_Keys.Managed_User);

    switch (this.authSer.CurrentUserType) {
      case Type_Of_Account.Admin:
        // url = `${adminUrl}/tiers/${tierId ? `?id=${tierId}` : ''}`;
          url = `${userUrl}/tiers/?cc_id=${ass['id']}&id=${ass['id']}${tierId ? `&id=${tierId}` : ''}`;
          break;
        case Type_Of_Account.CreatorContent:
        case Type_Of_Account.user:
        url = `${userUrl}/tiers/${tierId ? `?id=${tierId}` : ''}`;
        break;
        case Type_Of_Account.CreatorManager:
        if(ass){
          url = `${userUrl}/tiers/?cc_id=${ass['cc_id']}&id=${ass['cc_id']}${tierId ? `&id=${tierId}` : ''}`;
        }else{
          url = `${userUrl}/tiers/${tierId ? `?id=${tierId}` : ''}`;
        }
      default:
        break;
    }
    // const url = this.authSer.CurrentUserType == Type_Of_Account.Admin ? adminUrl : userUrl;
    return this.httpSer.get(url);
  }

  addUserTier(newTier) {
    return this.httpSer.post(newTier, `${ccUrl}/add_tier`);
  }

  get_cc_Tiers() {
    return this.httpSer.get(`${ccUrl}/ties/`);
  }

  editUserTier(oldTier: Tier) {
    if (this.authSer.CurrentUserType == Type_Of_Account.Admin) {
      oldTier.id = oldTier.tierid;
      oldTier.tier_name = oldTier.tiername;
      oldTier.tier_value = oldTier.tiervalue;
    }
    const url = this.authSer.CurrentUserType == Type_Of_Account.Admin ? `${adminUrl}/tiers` : `${ccUrl}/tiers_edit`;
    return this.httpSer.put(oldTier, url);
  }

  deleteUserTier(tier: Tier) {
    const url = this.authSer.CurrentUserType == Type_Of_Account.Admin ? `${adminUrl}/tier/${tier.id}` : `${ccUrl}/tiers/${tier.id}`;
    return this.httpSer.delete(url);

  }

  
  //#endregion
}
