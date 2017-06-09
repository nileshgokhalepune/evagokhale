import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ViewChild } from '@angular/core';
import { StartupService } from './services/startup.service';
import { FamilyComponent } from './user/user.component';

@Component({
    selector: 'app',
    template: `
        <div class="header">
            Family
        </div>
        <div class="main" #main>
        </div>
        <div class="other" #other>
        </div>

    `
})
export class AppComponent implements OnInit, AfterViewInit {
    private isLoggedin: boolean = false;
    private user: any;
    @ViewChild('other', { read: ViewContainerRef }) otherContainer: ViewContainerRef;
    @ViewChild('main', { read: ViewContainerRef }) main: ViewContainerRef;

    constructor(private startup: StartupService, private componentFactoryResolver: ComponentFactoryResolver) {
    }

    public ngOnInit() {
        this.isLoggedin = this.startup.loggedin();
        if (this.isLoggedin) {
            this.user = this.startup.user();
        }
    }

    public ngAfterViewInit() {
        this.main.clear();
        var familyComponentFactory = this.componentFactoryResolver.resolveComponentFactory(FamilyComponent);
        var mainInstance = this.main.createComponent(familyComponentFactory).instance;
        mainInstance.user = this.user;
    }
}