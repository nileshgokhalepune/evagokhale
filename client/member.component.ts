import { Component, Input } from '@angular/core';

@Component({
    selector:'member',
    template:`
        <div>{{data.name}}</div>
    `
})
export class MemberComponent{
    @Input() data:any;   
}