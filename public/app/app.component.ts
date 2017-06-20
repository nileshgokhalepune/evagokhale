import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <div class="header">
            Family
        </div>
        <div class="main" #main>
            <family-container [user]="user" [attr.familyId]="user.id"></family-container>
        </div>
        <div class="other" #other>
        </div>
    `
})
export class AppComponent  {
}
