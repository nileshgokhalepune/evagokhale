import { Component, Input, Directive, ViewContainerRef, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Directive({
    selector:'[me]'
})
export class MeDirective{
    constructor (private viewContainerRef:ViewContainerRef){

    }
}


@Component({
    selector: 'familytree',
    template: `
        <div class="family">
            <div class="father">
                <member [data]="father"></member>
            </div>
            <div class="mother">
                <member [data]="mother"></member>
            </div>
            <div class="me">
                <member [data]="me"></member>
            </div>
        </div>
    `
})
export class FamilyTree{
    
}