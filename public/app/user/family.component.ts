import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Directive, ElementRef, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { member } from '../classess/member';
import { EventObject } from '../classess/eventobject';
import { MemberEventService } from '../services/event.service';
import { MemberComponent } from '../user/member.component';

@Component({
    selector: 'family',
    template: `
        <div type="family" [attr.current]="currentFamily">
            <div class="collection parents deg0">
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
            <div class="self center">
                <ng-template #self></ng-template>
            </div>
            <div class="danglingMenu" *ngIf="showMenu">
                <div>
                    <i class="fa fa-plus fa-2x"></i>
                    Add Family Member
                </div>
                <div>
                    <i class="fa fa-plus"></i>
                    Add Friend
                </div>
            </div>
        </div>
    `
})
export class FamilyComponent implements OnInit, AfterViewInit {
    @Input('user') user: any;
    private currentUser: member;
    private memberArray: Array<member>;
    private selfDetail: member;
    private spouseDetail: member;
    private motherDetail: member;
    private fatherDetail: member;
    private familyArray: Array<MemberComponent> = new Array<MemberComponent>();

    @Input() public currentFamily: boolean;
    @ViewChild('parents', { read: ViewContainerRef }) parents: ViewContainerRef;
    @ViewChild('spouse', { read: ViewContainerRef }) spouse: ViewContainerRef;
    @ViewChild('siblings', { read: ViewContainerRef }) siblings: ViewContainerRef;
    @ViewChild('children', { read: ViewContainerRef }) children: ViewContainerRef;
    @ViewChild('friends', { read: ViewContainerRef }) friends: ViewContainerRef;
    @ViewChild('self', { read: ViewContainerRef }) self: ViewContainerRef;
    @Output('childClicked') childClicked: EventEmitter<string> = new EventEmitter<string>();
    @ViewChildren(MemberComponent) childre: QueryList<MemberComponent>;

    constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private eventService: MemberEventService, private element: ElementRef) {
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
        }).then(() => {
            this.familyArray.forEach(component => {
                var rect = component.getBoundingRect();
                if (component.detail.relation === 'Self') {
                    //this is the root of family. get all four connector positions.
                    var connectors = component.getConnectorPositions();
                }
            });
        });
    }

    private createFamilyMembers(user: member) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MemberComponent);
        this.parents.clear();
        this.spouse.clear();
        this.siblings.clear();
        this.children.clear();
        this.friends.clear();

        if (this.user.parents && this.user.parents.length > 0) {
            this.user.parents.forEach(element => {
                var parentComponent = this.parents.createComponent(componentFactory);
                var parent = parentComponent.instance;
                this.familyArray.push(parent);
                parent.relation = element.relation;
                parent.detail = element;
            });
        }
        const self = <MemberComponent>this.self.createComponent(componentFactory).instance;
        self.detail = { id: 1, name: this.user.name, relation: this.user.relation };
        self.relation = self.detail.relation;
        this.familyArray.push(self);

        if (this.user.spouse) {
            const spouse = <MemberComponent>this.spouse.createComponent(componentFactory).instance;
            spouse.detail = this.user.spouse ? this.user.spouse : null;
            spouse.relation = spouse.detail.relation;
            this.familyArray.push(spouse);
        }

        if (this.user.siblings && this.user.siblings.length > 0) {
            this.user.siblings.forEach(element => {
                const sibling = this.siblings.createComponent(componentFactory).instance;
                sibling.detail = element;
                sibling.relation = element.relation;
                this.familyArray.push(sibling);
            });
        }

        if (this.user.children && this.user.children.length > 0) {
            this.user.children.forEach(element => {
                const child = this.children.createComponent(componentFactory).instance;
                child.detail = element;
                child.relation = element.relation;
                this.familyArray.push(child);
            });
        }

        if (this.user.friends && this.user.friends.length > 0) {
            //render friends
            this.user.friends.forEach(element => {
                const frnd = this.friends.createComponent(componentFactory).instance;
                frnd.detail = element;
                frnd.relation = element.relation;
                this.familyArray.push(frnd);
            });
        }
    }

    private clicked(value: string) {

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

export const currentUser = {
    name: 'Eva',
    id: 1,
    placeInHirerchy: 2,
    relation: 'Self',
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
            relation: 'Brother',
            name: 'Rishabh',
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
        profileImage: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_960_720.jpg',
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