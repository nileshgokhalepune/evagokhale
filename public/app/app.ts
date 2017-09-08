import { Bit } from '../core/decorator';

@Bit({
    selector: 'app',
    template: `
        <div id="mainApp">
        </div>
    `,
    parent: 'body'
})
export class App {

}