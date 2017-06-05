import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'login',
    templateUrl: 'partials/login'
})
export class LoginComponent {

}

@Component({
    selector: 'family',
    templateUrl: 'partials/family'
})
export class MmmberArea implements OnInit {
    @Input('user') user: any;

    ngOnInit() {
        if (this.user) {
            //get hirerchihal data of the user
        }
    }
}