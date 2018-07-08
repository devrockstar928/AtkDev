import { NotFoundComponent } from './theme/pages/default/not-found/not-found.component';
import { ThemeComponent } from './theme/theme.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './auth/logout/logout.component';
import { AdminAuthGuard } from './atk/admin-module/admin-auth-guard.service';
import { AuthGuard } from './auth/_guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { CreatorAuthGuard } from './atk/content-creator-module/creator-auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    { path: 'logout', component: LogoutComponent },
    {
        path: '',
        component: ThemeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'admin',
                canActivate: [AdminAuthGuard],
                loadChildren: '.\/atk\/admin-module\/admin.module#AdminModule'
            },
            {
                path: 'creator',
                canActivate: [CreatorAuthGuard],
                loadChildren: '.\/atk\/content-creator-module\/content-creator.module#ContentCreatorModule'
            },
            // { path: 'contentcreator', redirectTo: 'creator', pathMatch: 'full' },
            {
                path: 'contentcreator',
                canActivate: [CreatorAuthGuard],
                loadChildren: '.\/atk\/content-creator-module\/content-creator.module#ContentCreatorModule'
            },
            {
                path: 'user',
                loadChildren: '.\/atk\/user-module\/user.module#UserModule'
            },
            {
                path: 'dashboard',
                loadChildren: '.\/theme\/pages\/default\/index\/index.module#IndexModule'
            },
            { path: 'no-access', loadChildren: '.\/auth\/not-authorized\/not-authorized.component#NotAuthorizedModule' },
            { path: '**', loadChildren: '.\/theme\/pages\/default\/not-found\/not-found.module#NotFoundModule' },
        ]
    }

];

@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule { }
