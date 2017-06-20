import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
// export function init(startUp: StartupService) {
// };

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    entryComponents: [
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: init,
        //     deps: [StartupService],
        //     multi: true
        // },
        // StartupService,
        // MemberEventService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}