import { Component, ViewChild, AfterViewInit, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FamilyComponent } from '../user/user.component';
import { member } from '../classess/member';
import { MemberEventService } from '../services/event.service';
import { otherUsers } from '../user/user.component';
@Component({
    selector: 'family-container',
    template: `
            <div #family class="mainFamily">
            </div>
            <div #relationArray>
            </div>
            <div #others>
            </div>
    `
})
export class FamilyContainerComponent {
    @ViewChild('family', { read: ViewContainerRef }) private family: ViewContainerRef;
    @ViewChild('others', { read: ViewContainerRef }) private others: ViewContainerRef;
    @Input('user') user: member;
    private userFamily: FamilyComponent;
    private otherFamilies: FamilyComponent[] = new Array<FamilyComponent>();

    constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private eventService: MemberEventService) {
        eventService.subscribe((eventObject) => {
            if (eventObject.type === 'Show') {
                this.others.clear();
                var alreadyClicked = this.otherFamilies.find(data => {
                    return data.user.id === eventObject.detail.id;
                })
                if (!alreadyClicked) {
                    var whichUser = otherUsers.find((data) => {
                        return data.id === eventObject.detail.id;
                    });
                }
                if (whichUser)
                    this.otherFamilies.push(this.createFamilyContainer(this.others, whichUser, false));
            }
        })
    }

    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this.userFamily = this.createFamilyContainer(this.family, this.user, true);
        });
    }

    private createFamilyContainer(containerRef: ViewContainerRef, detail: member, isCurrentFamily: boolean) {
        var componentResolver = this.componentFactoryResolver.resolveComponentFactory(FamilyComponent);
        var family = containerRef.createComponent(componentResolver).instance;
        family.user = detail;
        family.currentFamily = isCurrentFamily;
        return family;
    }
}