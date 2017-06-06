import { Component, Input, OnInit } from '@angular/core';
import { member } from '../classess/member';
@Component({
    selector: 'login',
    templateUrl: 'partials/login'
})
export class LoginComponent {

}

@Component({
    selector: 'family',
    templateUrl:`
        <member #self [name]="self"></member>
        <member #spouse [name]="spouse"></member>
    `
    /*'partials/family'*/
})
export class MmmberArea implements OnInit {
    @Input('user') user: any;
    private currentUser: any;
    private memberArray: Array<member>;
    private self: MemberComponent;
    private spouse: MemberComponent;

    ngOnInit() {
        if (this.user) {
            //get hirerchihal data of the user
            this.currentUser = jsonobject;
            this.memberArray = new Array<member>();
            this.self.detail = { id: 1, name: this.currentUser.name, relation: this.currentUser.relation };
            this.spouse.detail = { id: 1, name: this.currentUser.spouse ? this.currentUser.spouse.name : '', relation: 'spouse' };
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
    @Input('name') detail: member;
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