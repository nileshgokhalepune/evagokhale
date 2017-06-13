import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Directive, ElementRef, Output, EventEmitter, trigger, state, transition, style, animate } from '@angular/core';
import { member } from '../classess/member';
import { MemberEventService } from '../services/event.service';
import { StyleFactory } from '../classess/stylefactory';
import { EventObject } from '../classess/eventobject';

@Component({
    selector: 'member',
    template: `
        <div [attr.relation]="relation" [attr.title]="relation" [ngStyle]="style" (click)="clickedMe()">
            <div class="hex">
                <div class="top"></div>
                <div class="middle">{{detail.name}}</div>
                <div class="bottom"></div>
                <button [@flyInOut]="buttonState" class="btn btn-success" *ngIf="showAdd" (click)="addDialog()">Add Family</button>
            </div>
        </div>
    `,
    host: {
        '(mouseenter)': 'onmouseenter()',
        '(mouseleave)': 'onmouseleave()'
    },
    animations: [
        trigger('flyInOut', [
            state('visible', style({ transform: 'scale(1.5)' })),
            state('hidden', style({ transform: 'translateY(1)' })),
            transition('hidden => visible ', [
                animate('1000ms ease-in')
            ]),
            transition('visible => hidden', [
                animate('1000ms ease-out')
            ])
        ])
    ]
})
export class MemberComponent implements AfterViewInit {
    @Input('detail') detail: member;
    @Input('relation') relation: string;
    @Output('clicked') clicked: EventEmitter<string> = new EventEmitter<string>();
    private showAdd: boolean = false;
    private buttonState: string;
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
        this.buttonState = "visible";
        this.showAdd = true;
    }

    private onmouseleave() {
        this.buttonState = "hidden";
        this.showAdd = false;
    }

    private addDialog() {

    }
}