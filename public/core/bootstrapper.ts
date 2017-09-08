import { Bit } from './decorator';

export class Bootstrap<T>{

    bootstrap<T>(type: { new(): T }) {
        var app = new type();
        if (!(app instanceof Bit)) {
            throw "Cannot bootstrap application. Application has to be of type Bit";
        }
    }
}