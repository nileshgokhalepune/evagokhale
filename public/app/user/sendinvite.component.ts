import { Component, Input } from '@angular/core';
import { MemberComponent } from '../user/member.component';
@Component({
    selector: 'send-invite',
    template: `
        <div style="background-color:silver;z-index:9998;position:absolute;top:0;left:0;bottom:0;right:0;opacity:0.5">
            <div>
                <label>Email Id</label>
            </div>      
        </div>
    `,
    host: {
        '(document:keyup))': 'onDocumentKeyup($event)'
    }
    //templateUrl: 'partials/sendinvite'
})
export class SendInviteComponent {
    @Input('parent') memberComp: MemberComponent;
    private onDocumentKeyup($event) {
        if ($event.keyCode === 27) {
            this.memberComp.sendInvite = false;
        }
    }
}