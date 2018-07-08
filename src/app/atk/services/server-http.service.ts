import { UserSessionService } from './app-user-session.service';
import { AuthenticationService } from './../../auth/_services/authentication.service';
import { Injectable, ErrorHandler } from '@angular/core';
import { CONFIG } from './config.service';
import { HttpGeneralService } from './http-general.service';
import { Tier, Type_Of_Account, Privilege, Level, User_Session_Keys } from '../model/interface';
// const configUrl = 'environments/config.json';
const baseUrl = CONFIG.baseUrls.base;
const ccUrl = CONFIG.baseUrls.contentCreator;
const userUrl = CONFIG.baseUrls.user;
const adminUrl = CONFIG.baseUrls.admin;
const usersUrl = CONFIG.baseUrls.users;
const associationUrl = CONFIG.baseUrls.associations;
const eventUrl = CONFIG.baseUrls.events;
const levelsUrl = CONFIG.baseUrls.levels;
const logsUrl = CONFIG.baseUrls.logs;
@Injectable()
export class ServerHttpService implements ErrorHandler {
  constructor(private httpSer: HttpGeneralService
    , private userSession: UserSessionService
    , private authSer: AuthenticationService) {
  }

  getUserFeeds(id?: number) {
    if (this.authSer.CurrentUserType == Type_Of_Account.CreatorManager
      || this.authSer.CurrentUserType == Type_Of_Account.Admin
      || this.authSer.CurrentUserType == Type_Of_Account.CreatorContent) {
      return this.getCCFeeds(id);
    } else {
      return this.httpSer.get(`${userUrl}/content/feed${id ? `?id=${id}` : ''}`);
    }
  }

  getCCFeeds(id?: number) {
    return this.httpSer.get(this.changeUrlIfCCM(`${userUrl}/cc_feed`, '?', id));
    // return this.httpSer.get(`${userUrl}/content/feed`);
  }
  //#region like
  toggle_Like(postId: number) {
    return this.httpSer.post({ postid: postId }, this.changeUrlIfCCM(`${userUrl}/toggle_like`));
  }

  post_like(postId: number) {
    return this.httpSer.get(this.changeUrlIfCCM(`${userUrl}/post_likes/${postId}`));
  }
  //#endregion

  //#region comment
  add_comment(postid, comment) {
    return this.httpSer.post({ postid: postid, comment: comment }, this.changeUrlIfCCM(`${userUrl}/comment/`));
  }
  edit_comment(postid, comment) {
    return this.httpSer.put({ postid: postid, comment: comment }, this.changeUrlIfCCM(`${userUrl}/edit_comment`));
  }
  get_post_comment(postId) {
    return this.httpSer.get(this.changeUrlIfCCM(`${userUrl}/post_comments/${postId}`));
  }
  //#endregion

  apiuser() {
    return this.httpSer.get('/api/users');
  }

  // getUserFeeds(){
  //   return this.httpSer.get(`${userUrl}/content/feed`);
  // }

  getUserInfo() {
    return this.httpSer.get(`${userUrl}/user_info`);

  }


  // //#region teris
  // getUserTiers(tierId?: number) {

  //   let url;

  //   switch (this.authSer.CurrentUserType) {
  //     case Type_Of_Account.Admin:
  //       url = `${adminUrl}/tiers/${tierId ? `?id=${tierId}` : ''}`;
  //       break;
  //       case Type_Of_Account.CreatorContent:
  //       case Type_Of_Account.user:
  //       url = `${userUrl}/tiers/${tierId ? `?id=${tierId}` : ''}`;
  //       break;
  //       case Type_Of_Account.CreatorManager:
  //       let ass=this.userSession.getSessionKey(User_Session_Keys.Managed_User);
  //       if(ass){
  //         url = `${userUrl}/tiers/?cc_id=${ass['cc_id']}&id=${ass['cc_id']}${tierId ? `&id=${tierId}` : ''}`;
  //       }else{
  //         url = `${userUrl}/tiers/${tierId ? `?id=${tierId}` : ''}`;
  //       }
  //     default:
  //       break;
  //   }
  //   // const url = this.authSer.CurrentUserType == Type_Of_Account.Admin ? adminUrl : userUrl;
  //   return this.httpSer.get(url);
  // }

  // addUserTier(newTier) {
  //   return this.httpSer.post(newTier, `${ccUrl}/add_tier`);
  // }

  // get_cc_Tiers() {
  //   return this.httpSer.get(`${ccUrl}/ties/`);
  // }

  // editUserTier(oldTier: Tier) {
  //   if (this.authSer.CurrentUserType == Type_Of_Account.Admin) {
  //     oldTier.id = oldTier.tierid;
  //     oldTier.tier_name = oldTier.tiername;
  //     oldTier.tier_value = oldTier.tiervalue;
  //     oldTier.tier_rewards = oldTier.rewards;
  //   }
  //   const url = this.authSer.CurrentUserType == Type_Of_Account.Admin ? `${adminUrl}/tiers` : `${ccUrl}/tiers_edit`;
  //   return this.httpSer.put(oldTier, url);
  // }

  // deleteUserTier(tier: Tier) {
  //   const url = this.authSer.CurrentUserType == Type_Of_Account.Admin ? `${adminUrl}/tier/${tier.id}` : `${ccUrl}/tiers/${tier.id}`;
  //   return this.httpSer.delete(url);

  // }
  // //#endregion

  //#region post
  add_Post(post) {
    return this.httpSer.post(post, this.changeUrlIfCCM(`${ccUrl}/add_post`));
  }
  add_Post_formdata(post) {
    return this.httpSer.postFormData(post, this.changeUrlIfCCM(`${ccUrl}/add_post`));
  }
  edit_Post(post) {
    return this.httpSer.put(post, this.changeUrlIfCCM(`${ccUrl}/edit_post`));
  }
  remove_Post() {
    return this.httpSer.post({}, this.changeUrlIfCCM(`${ccUrl}/remove_post`));
  }
  ///// *******content creation area********************************************* */
  user_feed() {
    return this.httpSer.get(`${userUrl}/conetent/feed`);
  }

  user_info() {
    return this.httpSer.get(`${userUrl}/user_info`);
  }

  user_post(p_id: number) {
    return this.httpSer.get(`${userUrl}/post/${p_id}`);
  }

  user_hastags(tag: string) {
    return this.httpSer.get(`${userUrl}/hashtags/${tag}`);
  }

  user_cc_feed(cc_id: number, contentId?: number) {
    return this.httpSer.get(`${userUrl}/cc_feed?cc_id=${cc_id}${contentId ? `&id=${contentId}` : ''}`);
  }

  user_most_liked_posts(cc_id: number, user_id: number) {
    return this.httpSer.get(`${userUrl} /mostLikedPosts`);
  }
  //#endregion

  //#region profile
  edit_profile(user) {
    return this.httpSer.put(user, `${userUrl}/profile/edit`);
  }

  edit_user_status() {
    return this.httpSer.put({}, `${userUrl}/status`);
  }

  get_use_profile_status() {
    return this.httpSer.get(`${userUrl}/profile/status`);
  }

  get_use_profile(userId?: number) {
    return this.httpSer.get(`${userUrl}/profile${userId ? `?id=${userId}` : ''}`);
  }

  edit_cc_profile_picture() {
    return this.httpSer.put({}, `${ccUrl}/profile/profile_picture`);
  }

  edit_cc_profile() {
    return this.httpSer.put({}, `${ccUrl}/profile/edit`);
  }

  edit_cc_profile_content() {
    return this.httpSer.put({}, `${ccUrl}/profile/content`);
  }

  get_cc_profile_content() {
    return this.httpSer.get(`${ccUrl}/profile/xp`);
  }
  //#endregion

  //#region subscriptions
  get_user_subscriptions(month?, year?, page?) {
    // /contentcreator/subscribers?m=3&y=2018
    let url:string;
    // if (month == -1) {
    //   url = this.changeUrlIfCCM(`${ccUrl}/subscripers`);
    // } else {
      if (month && year) {
        url = this.changeUrlIfCCM(`${ccUrl}/subscribers`);
        const flag = url.includes('?');
        if (flag) {
          url += month ? `&m=${month}` : '';
        }else{
          url += month ? `?m=${month}` : '';
        }
        url += year ? `&y=${year}` : '';
        url += page ? `&p=${page}` : '';
      } else {
        url = this.changeUrlIfCCM(`${ccUrl}/subscripers`);
      // }
    }
    return this.httpSer.get(url);
  }


  get_cc_subscriptions(id?: number, sub?) {
    return this.httpSer.get(`${ccUrl}/subscriptions${id ? `/${id}` : ''}${sub ? `?sub=${sub}` : ''}`);
  }

  add_user_subscriptions() {
    return this.httpSer.post({}, `${userUrl}/subscribe`);
  }

  delete_user_subscriptions_unsubscribe() {
    // "cc_id"  : 121 ,
    // "tierid" : 20
    return this.httpSer.delete(`${ccUrl}/unsubscribe`);
  }

  edit_user_subscriptions_renew_sub() {
    // "cc_id"  : 121 ,
    // "tierid" : 20
    return this.httpSer.put({}, `${userUrl}/renew_sub`);
  }

  edit_user_subscriptions_update_sub() {
    // "cc_id"  : 121 ,
    // "tierid" : 20
    return this.httpSer.put({}, `${ccUrl}/update_sub`);
  }

  test_sub() {
    // "cc_id"  : 121 ,
    // "tierid" : 20
    return this.httpSer.get(`${userUrl}/test_sub?t_id=22&c_id=33`);
  }

  admin_subscriptions_list() {
    return this.httpSer.get(`${userUrl}/subscriptions_list?id=161`);
  }

  cc_subscripers() {
    return this.httpSer.get(`${ccUrl}/subscripers?id=105`);
  }

  user_single_subscription() {
    return this.httpSer.get(`${userUrl}/single_subscription?id=46`);
  }

  //#endregion

  //#region posts likes
  user_Post_likes() {
    return this.httpSer.get(`${userUrl}/post_likes/101`);
  }

  user_toggle_like() {
    return this.httpSer.post({}, `${userUrl}/toggle_like`);
  }

  //#endregion

  //#region posts comments
  user_comment() {
    return this.httpSer.post({}, `${userUrl}/comment`);
  }

  user_post_comments() {
    return this.httpSer.get(`${userUrl}/post_comments/223`);
  }
  user_edit_comment() {
    return this.httpSer.put({}, `${ccUrl}/edit_comment`);
  }
  user_profile_comment(userid, page?) {
    return this.httpSer.get(`${userUrl}/profile_comment/${userid}${page ? `?page=${page}` : ''}`);
  }
  user_add_profile_comment(comment) {
    return this.httpSer.post(comment, `${userUrl}/profile_comment`);
  }

  //#endregion

  //#region discover
  user_discover(name) {
    return this.httpSer.get(`${userUrl}/discover?name=hamed`);
  }

  user_highest_cc() {
    return this.httpSer.get(`${userUrl}/highest_cc`);
  }

  //#endregion

  //#region skus
  cc_add_sku(sku) {
    return this.httpSer.post(sku, this.changeUrlIfCCM(`${ccUrl}/add_sku`));
  }

  // add_user_skus() {
  //   return this.httpSer.post({}, `${userUrl}/skus`);
  // }

  user_skus() {
    return this.httpSer.get(this.changeUrlIfCCM(`${userUrl}/skus`));
  }

  admin_skus() {
    let url = `${ccUrl}/skus`;
    // const url = this.authSer.CurrentUserType == Type_Of_Account.Admin
    //   ? `${adminUrl}/skus` : `${userUrl}/skus?c_id=${this.authSer.currentUser.id}`;
    const cc = this.userSession.getSessionKey<any>(User_Session_Keys.Managed_User);
    if (this.authSer.CurrentUserType == Type_Of_Account.CreatorManager && cc) {
      url += `?c_id=${cc.cc_id}`;
    } else {
      if (this.authSer.CurrentUserType == Type_Of_Account.Admin && cc) {
        url += `?c_id=${cc.id}`;
      }
    }
    return this.httpSer.get(url);
  }

  admin_skus_edit(sku) {
    return this.httpSer.put(sku, `${adminUrl}/skus`);
  }

  admin_skus_delete(sku) {
    return this.httpSer.delete(`${adminUrl}/skus/${sku.id}`);
  }

  user_purchase() {
    return this.httpSer.post({}, `${userUrl}/purchase`);
  }

  user_order() {
    return this.httpSer.post({}, `${userUrl}/order`);
  }

  //#endregion

  //#region notification

  user_toggle_notify() {
    return this.httpSer.get(`${userUrl}/toggle_notify/add_post_notify`);
  }

  user_notification_settings() {
    return this.httpSer.get(`${userUrl}/notification_settings`);
  }

  //#endregion

  //#region login

  social_login() {
    return this.httpSer.post({}, `${usersUrl}/social_login`);
  }

  user_login() {
    return this.httpSer.post({}, `${usersUrl}/login`);
  }

  user_register() {
    return this.httpSer.post({}, `${usersUrl}/register`);
  }

  //#endregion

  //#region chat

  user_contacts() {
    return this.httpSer.get(this.changeUrlIfCCM(`${userUrl}/contacts`));
  }

  toggle_block_user(userId: number) {
    return this.httpSer.get(this.changeUrlIfCCM(`${ccUrl}/toggle_block_user?u_id=${userId}`, '&'));
  }

  //#endregion

  //#region orders information

  get_orders_list(userType?: Type_Of_Account, lastOderId?: number) {
    let orders$;
    switch (userType) {
      case Type_Of_Account.Admin:
        orders$ = this.httpSer.get(`${adminUrl}/orders_list${lastOderId ? `?id=${lastOderId}` : ''}`);
        break;
      case Type_Of_Account.CreatorContent:
        orders$ = this.httpSer.get(this.changeUrlIfCCM(`${ccUrl}/my_orders${lastOderId ? `?id=${lastOderId}` : ''}`, lastOderId ? '&' : '?'));
        break;
      default:
        orders$ = this.httpSer.get(`${userUrl}/my_orders${lastOderId ? `?id=${lastOderId}` : ''}`);
        break;
    }
    return orders$;
  }

  user_single_order(orderId) {
    return this.httpSer.get(`${userUrl}/single_order?id=${orderId}`);
  }

  edit_order(order) {
    return this.httpSer.put(order, `${adminUrl}/order`);
  }
  //#endregion

  //#region general
  cc_Images() {
    return this.httpSer.get(`${ccUrl}/Images/160599602.jpg`);
  }

  user_add_player() {
    return this.httpSer.post({}, `${userUrl}/add_player`);
  }

  //#endregion

  //#region users
  getUserslist(userType: Type_Of_Account) {
    const url = userType == Type_Of_Account.all ? '' : `?type=${userType}`;
    return this.httpSer.get(`${usersUrl}${url}`);
  }


  addInternalUser(newUser) {
    return this.httpSer.post(newUser, `${usersUrl}/?type=internal`);
  }

  //#endregion


  //#region Association

  getAssociation(id?: number) {
    return this.httpSer.get(`${associationUrl}/find${id ? `/${id}` : ''}`);
  }

  addAssociation(association: Privilege) {
    return this.httpSer.post(association, `${associationUrl}`);
  }

  addAssociationWithPrivileges(association) {
    return this.httpSer.post(association, `${associationUrl}/add`);
  }

  deleteAssociation(id: number) {
    return this.httpSer.delete(`${associationUrl}/${id}`);
  }

  getSingleAssociation(id: number) {
    return this.httpSer.get(`${associationUrl}`);
  }

  getUserAssociations(type?) {
    if (type) {
      // const cc = this.userSession.getSessionKey<any>(User_Session_Keys.Managed_User);
      return this.httpSer.get(`${usersUrl}?type=${type}`);
    } else {
      return this.httpSer.get(`${associationUrl}/users`);
    }
  }
  //#endregion


  //#region Privilege

  getPrivilege(userid, id) {
    return this.httpSer.get(`${associationUrl}/${userid}/privileges/${id}`);
  }

  addPrivilege(id, Privilege) {
    return this.httpSer.post(Privilege, `${associationUrl}/${id}/privileges`);
  }

  deletePrivilege(userid, id) {
    return this.httpSer.delete(`${associationUrl}/${userid}/privileges/${id}`);
  }

  editPrivilege(id, Privilege, privId) {
    return this.httpSer.put(Privilege, `${associationUrl}/${id}/privileges/${privId}`);
  }
  //#endregion

  //#region Event

  getEvents() {
    return this.httpSer.get(`${eventUrl}`);
  }

  getSingleEvent(id) {
    return this.httpSer.get(`${eventUrl}/${id}`);
  }

  addEvent(event: Event) {
    return this.httpSer.post(event, `${eventUrl}`);
  }

  editEvent(id, event) {
    return this.httpSer.put(event, `${eventUrl}/${id}`);
  }

  //#endregion


  //#region Levels

  getLevels() {
    return this.httpSer.get(`${levelsUrl}`);
  }

  getSingleLevel(id) {
    return this.httpSer.get(`${levelsUrl}/${id}`);
  }

  addLevel(level: Level) {
    return this.httpSer.post(level, `${levelsUrl}`);
  }

  editLevel(id, level: Level) {
    return this.httpSer.put(level, `${levelsUrl}/${id}`);
  }

  //#endregion


  getScreenShotsLog(pagenum) {
    return this.httpSer.get(`${logsUrl}/screenshots/${pagenum ? `?page=${pagenum}` : ''}`);
  }
  get_user_activities(userId, pagenum = 1) {
    return this.httpSer.get(`${userUrl}/activities/${userId}/${pagenum ? `?page=${pagenum}` : ''}`);
  }
  
  
  getSupportTickets(pageNo=1){
    return this.httpSer.get(`${baseUrl}/support/${pageNo ? `${pageNo}` : ''}`);
  }
  handleError(error: any): void {
  }

  changeUrlIfCCM(url, key = '?', id?: number): string {
    const cc = this.userSession.getSessionKey<any>(User_Session_Keys.Managed_User);
    if (this.authSer.CurrentUserType == Type_Of_Account.CreatorManager) {
      url += `${key}cc_id=${cc.cc_id}${id ? `&id=${id}` : ''}`;
    } else {
      if (this.authSer.CurrentUserType == Type_Of_Account.Admin) {
        url += `${key}cc_id=${cc.id}${id ? `&id=${id}` : ''}`;
      }
      else {
        if (this.authSer.CurrentUserType == Type_Of_Account.CreatorContent) {
          url += `${key}cc_id=${this.authSer.currentUser.id}${id ? `&id=${id}` : ''}`;
        }
      }
    }
    return url;
  }
}

