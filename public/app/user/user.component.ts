import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Directive, ElementRef } from '@angular/core';
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
        <div class="family-container">
            <div class="hex-row">
                <ng-template #dynamicElder></ng-template>
            </div>
            <div class="hex-row even">
                <ng-template #dynamicClose></ng-template>
            </div>
            <div class="hex-row">
                <ng-template #dynamicRelative></ng-template>
            </div>
            <div class="hex-row even">
                <ng-template #dynamicExtern></ng-template>
            </div>
        </div>
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
    @ViewChild('dynamicElder', { read: ViewContainerRef }) dynamicElder: ViewContainerRef;
    @ViewChild('dynamicClose', { read: ViewContainerRef }) dynamicClose: ViewContainerRef;
    @ViewChild('dynamicExtern', { read: ViewContainerRef }) dynamicExtern: ViewContainerRef;

    constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {

    }

    ngOnInit() {
        if (this.user) {
            //get hirerchihal data of the user
            this.currentUser = <member>jsonobject;
        }
    }

    ngAfterViewInit() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MemberComponent);
        this.dynamicExtern.clear();
        this.dynamicElder.clear();
        this.dynamicClose.clear();


        if (this.currentUser.parents.length > 0) {
            this.currentUser.parents.forEach(element => {
                var parentComponent = this.dynamicElder.createComponent(componentFactory);
                var parent = parentComponent.instance;
                parent.relation = element.relation;
                parent.detail = element;
            });
        }
        const self = <MemberComponent>this.dynamicClose.createComponent(componentFactory).instance;
        self.detail = { id: 1, name: this.currentUser.name, relation: this.currentUser.relation };
        self.relation = self.detail.relation;
        if (this.currentUser.spouse) {
            const spouse = <MemberComponent>this.dynamicClose.createComponent(componentFactory).instance;
            spouse.detail = this.currentUser.spouse ? { id: 1, name: this.currentUser.spouse.name, relation: 'spouse' } : null;
            spouse.relation = spouse.detail.relation;
        }
        if (this.currentUser.siblings && this.currentUser.siblings.length > 0) {
            this.currentUser.siblings.forEach(element => {
                const frnd = this.dynamicClose.createComponent(componentFactory).instance;
                frnd.detail = element;
                frnd.relation = element.relation;
            });
        }
        if (this.currentUser.cousins && this.currentUser.cousins.length > 0) {
            this.currentUser.cousins.forEach(element => {
                const frnd = this.dynamicExtern.createComponent(componentFactory).instance;
                frnd.detail = element;
                frnd.relation = element.relation;
            });
        }
        if (this.currentUser.friends && this.currentUser.friends.length > 0) {
            //render friends
            this.currentUser.friends.forEach(element => {
                const frnd = this.dynamicExtern.createComponent(componentFactory).instance;
                frnd.detail = element;
                frnd.relation = element.relation;
            });
        }
    }
}

@Component({
    selector: 'member',
    template: `
        <div [attr.relation]="relation" [attr.title]="relation">
            <div class="hex">
                <div class="top"></div>
                <div class="middle">{{detail.name}}</div>
                <div class="bottom"></div>
            </div>
        </div>
    `
})
export class MemberComponent {
    @Input('detail') detail: member;
    @Input('relation') relation: string;
}

@Component({

})
export class RelationDirective {
    style = {};
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    setCoordinates(first: any, second: any) {

    }
}

var jsonobject = {
    name: 'Eva',
    id: 1,
    placeInHirerchy: 2,
    relation: 'self',
    parents: [
        {
            relation: 'Mother',
            placeInHirerchy: 1,
            name: 'Priti',
            id: 2
        },
        {
            relation: 'Father',
            placeInHirerchy: 1,
            name: 'Nilesh',
            id: 3
        }
    ],
    siblings: [
        {
            relation: 'Step brother',
            name: 'Rishabh',
            placeInHirerchy: 2,
            id: 4
        }
    ],
    spouse: null,
    children: null,
    cousins: [{
        relation: 'Cousin',
        name: 'Arjun',
        placeInHirerchy: 2,
        id: 6
    },
    {
        relation: 'Cousin',
        name: 'Janaki',
        id: 7
    }],
    friends: []
}

