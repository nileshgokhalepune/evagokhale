import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StartupService } from './services/startup.service';
import { FamilyComponent, MemberComponent } from './user/user.component';
import { FamilyContainerComponent } from './user/familycontainer.component';
import { MemberEventService } from './services/event.service';
export function init(startUp: StartupService) {
    return () => startUp.loadConfig();
};

@NgModule({
    imports: [
        BrowserModule
    ],
    entryComponents: [
        MemberComponent,
        FamilyComponent,
        FamilyContainerComponent
    ],
    declarations: [
        AppComponent,
        FamilyComponent,
        MemberComponent,
        FamilyContainerComponent
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: init,
            deps: [StartupService],
            multi: true
        },
        StartupService,
        MemberEventService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}