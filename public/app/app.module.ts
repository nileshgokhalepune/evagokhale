import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StartupService } from './services/startup.service';
import { FamilyComponent, MemberComponent } from './user/user.component';

export function init(startUp: StartupService) {
    return () => startUp.loadConfig();
};

@NgModule({
    imports: [
        BrowserModule
    ],
    entryComponents: [
        MemberComponent,
        FamilyComponent
    ],
    declarations: [
        AppComponent,
        FamilyComponent,
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