import { ServerHttpService } from './atk/services/server-http.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from './_services/script-loader.service';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { ThemeComponent } from './theme/theme.component';
import { HttpGeneralService } from './atk/services/http-general.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ExceptionService } from './atk/services/exception.service';
import { ToastService } from './atk/services/toast.service';

import './atk/shared/rxjs-operators';
import { } from './atk/user-module/user.routing';
import { AuthenticationService } from './auth/_services/authentication.service';
import { AdminAuthGuard } from './atk/admin-module/admin-auth-guard.service';
import { CreatorAuthGuard } from './atk/content-creator-module/creator-auth-guard.service';
import { DeleteModalComponent } from './atk/ui-component/delete-modal/delete-modal.component';
import { MaterialModule } from './material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { WebsocketService } from './atk/socket.io/web-socket.service';
import { ChatService } from './atk/socket.io/chat.service';
import { UserSessionService } from './atk/services/app-user-session.service';


@NgModule({
    declarations: [
        AppComponent,
        ThemeComponent,
        DeleteModalComponent,
  
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        FormsModule,
        MaterialModule,
        AuthModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        ScriptLoaderService,
        AuthenticationService,
        UserSessionService,        
        AdminAuthGuard,
        CreatorAuthGuard,
        WebsocketService,
        ChatService
        // { provide: MAT_DIALOG_DATA, useValue: {} },
    ],
    entryComponents: [
        DeleteModalComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
