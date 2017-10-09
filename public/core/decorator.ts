import { ui } from './ui';
export function Bit(props: any): any {
    return function (target: any) {
        if (props) {
            var tag = props.selector || '';
            var html = props.template;
            var parent = props.parent;
            if (!parent) throw 'Component needs a parent. If its a root component the parent would be document body';
            var final = ui(`<${tag}>`, new arguments[0]).add(html);
            var routes = ui(`${tag}`).find('route');
            // target.prototype.routes = ui(`@${tag}`).pareseRoutes();
            target.prototype.template = final;
        }
    }
}
