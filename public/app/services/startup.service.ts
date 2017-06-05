import { Injectable } from '@angular/core';

@Injectable()
export class StartupService {

    public loadConfig() {

    }

    public loggedin() {
        return true;
    }

    public user() {
        return "eva";
    }
}