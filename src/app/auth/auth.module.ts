import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { AuthRoutingModule } from './auth-routing.routing';

import { AtkSharedModule } from './../atk/shared/shared.module';

import { AuthComponent } from './auth.component';
import { AlertComponent } from './_directives/alert.component';
import { LogoutComponent } from './logout/logout.component';

import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';


@NgModule({
    declarations: [
        AuthComponent,
        AlertComponent,
        LogoutComponent,
    ],
    imports: [
        AtkSharedModule,
        FormsModule,
    ],
    providers: [
        AuthGuard,
        AlertService,
    ],
    entryComponents: [AlertComponent]
})

export class AuthModule {
}