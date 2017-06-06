import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { member } from '../classess/member';
@Component({
    selector: 'login',
    templateUrl: 'partials/login'
})
export class LoginComponent {

}

@Component({
    selector: 'family',
    template: `
        <ng-template #dynamicInsert></ng-template>
    `
    //templateUrl: 'partials/family'
})
export class MmmberArea implements OnInit, AfterViewInit {
    @Input('user') user: any;
    private currentUser: member;
    private memberArray: Array<member>;
    private selfDetail: member;
    private spouseDetail: member;
    private motherDetail: member;
    private fatherDetail: member;
    @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;

    constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {

    }

    ngOnInit() {
        if (this.user) {
            //get hirerchihal data of the user
            this.currentUser = <member>jsonobject;
            // this.memberArray = new Array<member>();
            // this.selfDetail = { id: 1, name: this.currentUser.name, relation: this.currentUser.relation };
            // this.spouseDetail = this.currentUser.spouse ? { id: 1, name: this.currentUser.spouse.name, relation: 'spouse' } : null;
            // if (this.currentUser.parents.length > 0) {
            //     this.currentUser.parents.forEach(data => {
            //         if (data.relation === 'Mother') this.motherDetail = data;
            //         if (data.relation === 'Father') this.fatherDetail = data
            //     });
            // }
        }
    }

    ngAfterViewInit() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MemberComponent);
        this.dynamicInsert.clear();

        if (this.currentUser.parents.length > 0) {
            this.currentUser.parents.forEach(element => {
                var parentComponent = this.dynamicInsert.createComponent(componentFactory);
                var parent = parentComponent.instance;
                parent.relation = element.relation;
                parent.detail = element;
            });
        }
        const self = <MemberComponent>this.dynamicInsert.createComponent(componentFactory).instance;
        self.detail = { id: 1, name: this.currentUser.name, relation: this.currentUser.relation };
        self.relation = self.detail.relation;
        if (this.currentUser.spouse) {
            const spouse = <MemberComponent>this.dynamicInsert.createComponent(componentFactory).instance;
            spouse.detail = this.currentUser.spouse ? { id: 1, name: this.currentUser.spouse.name, relation: 'spouse' } : null;
            spouse.relation = spouse.detail.relation;
        }
        if (this.currentUser.friends && this.currentUser.friends.length > 0) {
            //render friends
            this.currentUser.friends.forEach(element => {
                const frnd = this.dynamicInsert.createComponent(componentFactory).instance;
                frnd.detail = element;
                frnd.relation = element.relation;
            });
        }
        if (this.currentUser.siblings && this.currentUser.siblings.length > 0) {
            this.currentUser.siblings.forEach(element => {
                const frnd = this.dynamicInsert.createComponent(componentFactory).instance;
                frnd.detail = element;
                frnd.relation = element.relation;
            });

        }
    }
}

@Component({
    selector: 'member',
    template: `
        <div class="hex" [attr.relation]="relation">
            <span>
                {{detail ? detail.name : "Data not provided"}}
            </span>
        </div>
    `
})
export class MemberComponent {
    @Input('detail') detail: member;
    @Input('relation') relation: string;
}

var jsonobject = {
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
    spouse: null,
    childre: null,
    friedns: null
}