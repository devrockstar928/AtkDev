import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './../pages/default/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { AsideLeftMinimizeDefaultEnabledComponent } from '../pages/aside-left-minimize-default-enabled/aside-left-minimize-default-enabled.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { DefaultComponent } from '../pages/default/default.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '../../_directives/href-prevent-default.directive';
import { UnwrapTagDirective } from '../../_directives/unwrap-tag.directive';
import { AsideNavLinkComponent } from '../../atk/ui-component/aside-nav-link/aside-nav-link.component';
import { AsideNavLinkGroupComponent } from '../../atk/ui-component/aside-nav-link-group/aside-nav-link-group.component';
import { MaterialModule } from '../../material/index';
import { UserProfileComponent } from '../../atk/user-module/user-header/user-profile/user-profile.component';
import { UserActionsComponent } from '../../atk/user-module/user-header/user-actions/user-actions.component';
import { UserHeaderComponent } from '../../atk/user-module/user-header/user-header/user-header.component';
import { UserXpComponent } from '../../atk/user-module/user-header/user-xp/user-xp.component';
import { NotFoundModule } from '../pages/default/not-found/not-found.module';
import { ChatComponent } from '../../atk/user-module/chat/chat.component';
import { ComponentAcitonsComponent } from '../../atk/ui-component/component-acitons/component-acitons.component';
import { AddButtonActionsComponent } from '../../atk/ui-component/add-button-actions/add-button-actions.component';


@NgModule({
    declarations: [
        LayoutComponent,
        AsideLeftMinimizeDefaultEnabledComponent,
        HeaderNavComponent,
        DefaultComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
        AsideNavLinkComponent,
        AsideNavLinkGroupComponent,
        UserXpComponent,
        UserHeaderComponent,
        UserProfileComponent,
        UserActionsComponent,
        ChatComponent,
        ComponentAcitonsComponent,
        AddButtonActionsComponent,
    ],
    exports: [
        LayoutComponent,
        AsideLeftMinimizeDefaultEnabledComponent,
        HeaderNavComponent,
        DefaultComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
        ChatComponent,
        ComponentAcitonsComponent,
        AddButtonActionsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class LayoutModule {}

