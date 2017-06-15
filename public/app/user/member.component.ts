import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Directive, ElementRef, Output, EventEmitter, trigger, state, transition, style, animate } from '@angular/core';
import { member } from '../classess/member';
import { MemberEventService } from '../services/event.service';
import { StyleFactory } from '../classess/stylefactory';
import { EventObject } from '../classess/eventobject';

@Component({
    selector: 'member',
    template: `
        <div [id]="detail.id" [attr.relation]="detail.relation" [attr.title]="relation" [ngStyle]="style" (click)="clickedMe()">
            <div class="square" style="position:relative">
                <div>
                    <img class="memberImage" *ngIf="detail && detail.profileImage" [src]="detail.profileImage" />
                    <img class="memberImage" *ngIf="detail && !detail.profileImage" src="/assets/missin.gif" />
                </div>
            </div>
            <div>{{detail.name}}</div>
        </div>
        <send-invite *ngIf="sendInvite" [parent]="this"></send-invite>
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
    @Output('hovered') hovered:EventEmitter<member> = new EventEmitter<member>();
    private showAdd: boolean = false;
    private buttonState: string;
    private style: any = {};
    private styleFactory: StyleFactory;
    public sendInvite: boolean;
    private boundingRect: any = {};
    private showMenu: boolean = false;

    constructor(private eventService: MemberEventService, private element: ElementRef) {
        this.styleFactory = new StyleFactory();
    }

    ngAfterViewInit() {
        this.boundingRect = this.element.nativeElement.getBoundingClientRect();

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
        this.buttonState = "active";
        if (this.detail.relation === 'Self')
            this.showMenu=!this.showMenu;
    }

    private onmouseleave() {
        this.buttonState = "inactive";
        if (this.detail.relation === 'Self')
            this.showAdd = false;
    }

    private addDialog() {
        event.preventDefault();
        event.stopPropagation();
        this.sendInvite = true;
    }

    private onmouseclick(){
        this.showMenu = !this.showMenu;
    }
}