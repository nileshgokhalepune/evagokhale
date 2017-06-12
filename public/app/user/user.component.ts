import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { member } from '../classess/member';
import { EventObject } from '../classess/eventobject';
import { MemberEventService } from '../services/event.service';

@Component({
    selector: 'family',
    template: `
        <div class="family-container">
            <div class="collection parents">
                <ng-template #parents></ng-template>
            </div>
            <div class="spouse">
                <ng-template #spouse></ng-template>
            </div>
            <div class="collection siblings">
                <ng-template #siblings></ng-template>
            </div>
            <div class="collection children">
                <ng-template #children></ng-template>
            </div>
            <div class="collection friends">
                <ng-template #friends></ng-template>            
            </div>
            <div class="self">
                <ng-template #self></ng-template>
            </div>
        </div>
    `
    //templateUrl: 'partials/family'
})
export class FamilyComponent implements OnInit, AfterViewInit {
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
    @Output('childClicked') childClicked: EventEmitter<string> = new EventEmitter<string>();

    constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private eventService: MemberEventService) {
    }

    ngOnInit() {
        if (this.user) {
            //get hirerchihal data of the user
            this.currentUser = <member>this.user;
        }
    }

    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this.createFamilyMembers(this.currentUser);
        });
    }

    private createFamilyMembers(user: member) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MemberComponent);
        this.parents.clear();
        this.spouse.clear();
        this.siblings.clear();
        this.children.clear();


        if (this.currentUser.parents && this.currentUser.parents.length > 0) {
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
            spouse.detail = this.currentUser.spouse ? this.currentUser.spouse : null;
            spouse.relation = spouse.detail.relation;
        }

        if (this.currentUser.siblings && this.currentUser.siblings.length > 0) {
            this.currentUser.siblings.forEach(element => {
                const frnd = this.siblings.createComponent(componentFactory).instance;
                frnd.detail = element;
                frnd.relation = element.relation;
            });
        }

        if (this.currentUser.children && this.currentUser.children.length > 0) {
            this.currentUser.children.forEach(element => {
                const child = this.children.createComponent(componentFactory).instance;
                child.detail = element;
                child.relation = element.relation;
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

    private clicked(value: string) {

    }
}

@Component({
    selector: 'member',
    template: `
        <div [attr.relation]="relation" [attr.title]="relation" [ngStyle]="style" (click)="clickedMe()">
            <div class="hex">
                <div class="top"></div>
                <div class="middle">{{detail.name}}</div>
                <div class="bottom"></div>
            </div>
            <div style="position:absolute">
                <button *ngIf="showAdd"></button>
            </div>
        </div>
    `,
    host: {
        '(mouseenter)': 'onmouseenter()',
        '(mouseleave)': 'onmouseleave()'
    }
})
export class MemberComponent implements AfterViewInit {
    @Input('detail') detail: member;
    @Input('relation') relation: string;
    @Output('clicked') clicked: EventEmitter<string> = new EventEmitter<string>();
    private showAdd: boolean = false;
    private style: any = {};
    private styleFactory: StyleFactory;

    constructor(private eventService: MemberEventService) {
        this.styleFactory = new StyleFactory();
    }

    ngAfterViewInit() {
        if (this.detail)
            this.style = this.styleFactory.getStyle(this.detail.relation);
    }

    private clickedMe() {
        if (this.detail.relation !== 'Self') {
            var eventObject: EventObject = {
                type: 'Show',
                detail: this.detail

            }
            this.eventService.next(eventObject);
        }
    }

    private onmouseenter() {
        this.showAdd = true;
    }

    private onmouseleave() {
        this.showAdd = false;
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

export const currentUser = {
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
    friends: []
}


export const otherUsers = [
    {
        relation: 'Self',
        placeInHirerchy: 1,
        name: 'P',
        id: 2,
        parents: [],
        siblings: [
            {
                name: 'M',
                id: 1,
                placeInHirerchy: 2,
                relation: 'Sister',
            }
        ],
        spouse: {
            relation: 'Spouse',
            placeInHirerchy: 1,
            name: 'N',
            id: 3
        },
        children: [{
            name: 'E',
            id: 1,
            placeInHirerchy: 2,
            relation: 'Child',
        }, {
            relation: 'Child',
            name: 'R',
            placeInHirerchy: 2,
            id: 4
        }],
        friends: []
    },
    {
        relation: 'Self',
        name: 'R',
        placeInHirerchy: 2,
        id: 4,
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
                name: 'E',
                id: 1,
                placeInHirerchy: 2,
                relation: 'Sister',
            }
        ],
        spouse: null,
        children: null,
        friends: []
    }
]