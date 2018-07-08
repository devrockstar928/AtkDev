import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './../../theme/layouts/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { UserRoutingModule } from './user.routing';

import { UserMainComponent } from './user-main/user-main.component';
import { UserFeedComponent } from './user-feed/user-feed.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { OrderViewComponent } from './orders/order-view/order-view.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { DataTableModule } from 'primeng/primeng';
import { MaterialModule } from '../../material/material.module';
import { OrderPurchaseComponent } from './order-purchase/order-purchase.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AtkSharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { ChatComponent } from './chat/chat.component';
import { SubscriberProfileComponent } from './user-profile/subscriber-profile/subscriber-profile.component';
import { SubscriberProfileDataComponent } from './user-profile/subscriber-profile-data/subscriber-profile-data.component';
import { SubscriberProfileOrdersComponent } from './user-profile/subscriber-profile-orders/subscriber-profile-orders.component';
import { SubscriberProfileSubsComponent } from './user-profile/subscriber-profile-subs/subscriber-profile-subs.component';
import { SubscriberStreamComponent } from './user-profile/subscriber-stream/subscriber-stream.component';
import { SubscriberCommentsComponent } from './user-profile/subscriber-comments/subscriber-comments.component';
import { SupportTicketsComponent } from './support-tickets/support-tickets.component';
import { SubscriberBlockUsersComponent } from './user-profile/subscriber-block-users/subscriber-block-users.component';

const appRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            { path: '', redirectTo: 'feeds', pathMatch: 'full' },
            { path: 'feeds', 'component': UserFeedComponent },
            { path: 'order/purchase', 'component': OrderPurchaseComponent },
            { path: 'orders', component: UserOrdersComponent },
            { path: 'orders/:id', component: OrderViewComponent },
            { path: 'orders/:id/edit', component: OrderEditComponent },
        { path: 'chat', component: ChatComponent },
            { path: 'supporttickets', component: SupportTicketsComponent }
        ]
    }
];


@NgModule({
    imports: [
        AtkSharedModule,
        LayoutModule,
        DataTableModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
        // UserRoutingModule,
    ],
    declarations: [
        UserMainComponent,
        UserFeedComponent,
        OrdersListComponent,
        OrderViewComponent,
        OrderPurchaseComponent,
        UserOrdersComponent,
        OrderEditComponent,
        // ChatComponent,
        SubscriberStreamComponent,
        SubscriberCommentsComponent,
        
        SubscriberProfileComponent,
        SubscriberProfileDataComponent,
        SubscriberProfileOrdersComponent,
        SubscriberProfileSubsComponent,
        SupportTicketsComponent,
        SubscriberBlockUsersComponent,

    ],
    exports: [
        UserMainComponent,
        UserFeedComponent,
        OrdersListComponent,
        OrderViewComponent,
        // UserRoutingModule,
    ],
    providers: [

    ]
})
export class UserDecModule { }


@NgModule({
    imports: [
        UserDecModule,
        RouterModule.forChild(appRoutes)
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [

    ]
})
export class UserModule { }
