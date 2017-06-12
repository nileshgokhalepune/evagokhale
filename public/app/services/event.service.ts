import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs/Rx';

@Injectable()
export class MemberEventService {
    private events = new Subject();

    public subscribe(next, error?, complete?): Subscription {
        return this.events.subscribe(next, error, complete);
    }

    public next(event) {
        this.events.next(event);
    }
}