import { LayoutModule } from './../../theme/layouts/layout.module';
import { MockUsingService } from './../../server-data/mock-using.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthModule } from './../../auth/auth.module';


import { DataTableModule, AutoCompleteModule } from 'primeng/primeng';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { HttpGeneralService } from '../services/http-general.service';
import { ToastService } from '../services/toast.service';
import { ExceptionService } from '../services/exception.service';
import { ServerHttpService } from '../services/server-http.service';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { MockHttpService } from '../../server-data/mock-http.service';
import { MaterialModule } from '../../material/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule
        ],
    declarations: [
    ],
    providers: [
        ServerHttpService,
        ScriptLoaderService,
        HttpGeneralService,
        HttpClient,
        ExceptionService,
        ToastService,
        MockHttpService,
        MockUsingService
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        MaterialModule
    ]
})
export class AtkSharedModule { }
