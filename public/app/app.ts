import { Home } from './home';
import { Bit } from '../core/decorator';

@Bit({
    selector: 'app',
    template: `
    <app>
        Can you see me?
        <outlet>
        </outlet>
    </app>`,
    parent: 'body'
})
export class App {

}