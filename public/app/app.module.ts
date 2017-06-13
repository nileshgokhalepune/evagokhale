import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StartupService } from './services/startup.service';
import { FamilyComponent } from './user/user.component';
import { MemberComponent } from './user/member.component';
import { FamilyContainerComponent } from './user/familycontainer.component';
import { MemberEventService } from './services/event.service';
import { SendInviteComponent } from './user/sendinvite.component';
export function init(startUp: StartupService) {
    return () => startUp.loadConfig();
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule
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
        FamilyContainerComponent,
        SendInviteComponent
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