import { Injectable } from '@angular/core';
import { currentUser } from '../user/family.component';
@Injectable()
export class StartupService {

    public loadConfig() {

    }

    public loggedin() {
        return true;
    }

    public user() {
        return currentUser;
    }
}