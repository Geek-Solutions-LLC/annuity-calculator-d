import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import {AppComponent} from './app.component';
import {AnnuityCalculatorComponent} from './annuity-calculator/annuity-calculator.component';
import {RequestFormComponent} from './annuity-calculator/request-form/request-form.component';
import {ScheduleComponent} from './annuity-calculator/schedule/schedule.component';
import {ChartComponent} from './annuity-calculator/chart/chart.component';
import {ResultComponent} from './annuity-calculator/result/result.component';
import {AbsoluteValuePipe} from "./pipes/absolute-value.pipe";
import {HttpClient} from "@angular/common/http";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ThousandSeparatorDirective } from './thousand-separator.directive';

@NgModule({ declarations: [
        AppComponent,
        AnnuityCalculatorComponent,
        RequestFormComponent,
        ScheduleComponent,
        ChartComponent,
        ResultComponent,
        AbsoluteValuePipe,
        ThousandSeparatorDirective,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/annuity-calculator-d/assets/i18n/');
}
