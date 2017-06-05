import { Component, OnInit } from '@angular/core';
import { StartupService } from './services/startup.service';

@Component({
    selector: 'app',
    template: `
        <div>
            Start here
            <family *ngIf="isLoggedin" [user]="user"></family>
            <login *ngIf="!isLoggedin">
            </login>
        </div>
    `
})
export class AppComponent implements OnInit {
    private isLoggedin: boolean = false;
    private user: any;
    constructor(private startup: StartupService) {
    }

    public ngOnInit() {
        this.isLoggedin = this.startup.loggedin();
        if (this.isLoggedin) {
            this.user = this.startup.user();
        }
    }
}