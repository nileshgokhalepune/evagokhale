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
    private currentUser: any;
    ngOnInit() {
        if (this.user) {
            //get hirerchihal data of the user
            this.currentUser = jsonobject;
        }
    }
}

@Component({
    selector: 'member',
    template: `
        <div>{{name}}</div>
    `
})
export class MemberComponent {
    @Input('name') name: any;
}
var jsonobject = {
    self: 'Eva',
    name: 'Eva',
    relation: 'self',
    parents: [
        {
            relation: 'Mother',
            name: 'Priti',
        },
        {
            relation: 'Father',
            name: 'Nilesh'
        }
    ],
    siblings: [
        {
            relation: 'Step brother',
            name: 'Rishabh'
        }
    ],
    spouse: {},
    childre: [],
    friedns: []
}