import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StartupService } from './services/startup.service';
import { LoginComponent, MmmberArea, MemberComponent } from './user/user.component';

export function init(startUp: StartupService) {
    return () => startUp.loadConfig();
};

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MmmberArea,
        MemberComponent
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: init,
            deps: [StartupService],
            multi: true
        },
        StartupService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}