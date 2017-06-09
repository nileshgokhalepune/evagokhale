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
            <div class="collection">
                <ng-template #parents></ng-template>
            </div>
            <ng-template #spouse></ng-template>
            <div class="collection">
                <ng-template #siblings></ng-template>
            </div>
            <div class="collection">
                <ng-template #children></ng-template>
            </div>
            <div class="collection">
                <ng-template #friends></ng-template>            
            </div>
            <ng-template #self></ng-template>
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
    @ViewChild('parents', { read: ViewContainerRef }) parents: ViewContainerRef;
    @ViewChild('spouse', { read: ViewContainerRef }) spouse: ViewContainerRef;
    @ViewChild('siblings', { read: ViewContainerRef }) siblings: ViewContainerRef;
    @ViewChild('children', { read: ViewContainerRef }) children: ViewContainerRef;
    @ViewChild('friends', { read: ViewContainerRef }) friends: ViewContainerRef;
    @ViewChild('self', { read: ViewContainerRef }) self: ViewContainerRef;

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
        this.parents.clear();
        this.spouse.clear();
        this.siblings.clear();
        this.children.clear();


        if (this.currentUser.parents.length > 0) {
            this.currentUser.parents.forEach(element => {
                var parentComponent = this.parents.createComponent(componentFactory);
                var parent = parentComponent.instance;
                parent.relation = element.relation;
                parent.detail = element;
            });
        }
        const self = <MemberComponent>this.self.createComponent(componentFactory).instance;
        self.detail = { id: 1, name: this.currentUser.name, relation: this.currentUser.relation };
        self.relation = self.detail.relation;
        if (this.currentUser.spouse) {
            const spouse = <MemberComponent>this.spouse.createComponent(componentFactory).instance;
            spouse.detail = this.currentUser.spouse ? { id: 1, name: this.currentUser.spouse.name, relation: 'spouse' } : null;
            spouse.relation = spouse.detail.relation;
        }
        if (this.currentUser.siblings && this.currentUser.siblings.length > 0) {
            this.currentUser.siblings.forEach(element => {
                const frnd = this.siblings.createComponent(componentFactory).instance;
                frnd.detail = element;
                frnd.relation = element.relation;
            });
        }
        if (this.currentUser.friends && this.currentUser.friends.length > 0) {
            //render friends
            this.currentUser.friends.forEach(element => {
                const frnd = this.friends.createComponent(componentFactory).instance;
                frnd.detail = element;
                frnd.relation = element.relation;
            });
        }
    }
}

@Component({
    selector: 'member',
    template: `
        <div [attr.relation]="relation" [attr.title]="relation" [ngStyle]="style">
            <div class="hex">
                <div class="top"></div>
                <div class="middle">{{detail.name}}</div>
                <div class="bottom"></div>
            </div>
        </div>
    `
})
export class MemberComponent implements AfterViewInit {
    @Input('detail') detail: member;
    @Input('relation') relation: string;
    private style: any = {};
    private styleFactory: StyleFactory;

    constructor() {
        this.styleFactory = new StyleFactory();
    }

    ngAfterViewInit() {
        if (this.detail)
            this.style = this.styleFactory.getStyle(this.detail.relation);
    }
}

export class StyleFactory {
    getStyle(relation: string): IStyle {
        if (relation === "Self") {
            return new SelfStyle();
        } else {
            return new DefaultStyle();
        }
    }
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

export interface IStyle {
    style(): any;
}

export class DefaultStyle implements IStyle {
    style(): any {
        return {

        }
    }
}

export class SelfStyle implements IStyle {
    public style(): any {
        return {
            'bottom': "10px!important",
            'postion': "relative",
            'color': 'white'
        }
    }
}

var jsonobject = {
    name: 'E',
    id: 1,
    placeInHirerchy: 2,
    relation: 'Self',
    parents: [
        {
            relation: 'Mother',
            placeInHirerchy: 1,
            name: 'P',
            id: 2
        },
        {
            relation: 'Father',
            placeInHirerchy: 1,
            name: 'N',
            id: 3
        }
    ],
    siblings: [
        {
            relation: 'Brother',
            name: 'R',
            placeInHirerchy: 2,
            id: 4
        }
    ],
    spouse: null,
    children: null,
    cousins: [{
        relation: 'Cousin',
        name: 'A',
        placeInHirerchy: 2,
        id: 6
    },
    {
        relation: 'Cousin',
        name: 'J',
        id: 7
    }],
    friends: []
}

