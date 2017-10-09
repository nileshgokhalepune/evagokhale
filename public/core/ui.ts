export module DomModule {
    export class DomElement {
        private element: Array<any>;
        private ns: string;
        constructor(private selector: string, private bit?: any, private withNs?: any, private svgOrXHtml?: any) {
            this.element = new Array();
        }

        /**
         * Initialize the DomElement.
         * 
         * @memberof DomElement
         */
        init() {
            if (!this.selector || this.selector.length === 0) throw "Selector cannot be empty";
            Array.prototype.push.apply(this.element, new DomRouter.ElementFactory(this.withNs, this.ns).create(this.selector));
        }

        add(html: string) {
            var domHtml = document.createElement('html');
            domHtml.innerHTML = html;
            var children = domHtml.children[1].children;
            for (var i in this.element) {
                for (var j = 0; j < children.length; j++) {
                    if (children[j].tagName === "route") {
                        //found route. Add to route collection and add necessary events.
                        var route = new DomRouter.Route(children[j].getAttribute("name"),
                            children[j].getAttribute("link"), this);
                            
                    }
                    this.element[i].appendChild(children.item(j));
                }
            }
        }

        find(tagName: string): Array<any> {
            if (!this.element) throw "Element not defined";
            this.element.forEach(item => {

            });
            return;
        }

    }
    export interface IElementFactory {
        create(selector: String): any;
    }
    export module DomRouter {
        export class ElementFactory implements IElementFactory {
            constructor(private withNs: boolean, private ns: any) {

            }

            create(selector): any {
                var prefix = selector[0];
                var element: Array<any> = new Array<any>();
                if (prefix === "#") {
                    return element.push(document.getElementById(selector.substr(1)));
                }
                if (prefix === "<") {
                    var matches = selector.match(/<([\w-]*)>/);
                    if (matches === null || matches === undefined) {
                        throw 'Invalid selector';
                    }
                    var nodeName = matches[0].replace('<', '').replace('>', '');
                    var ele;
                    if (this.withNs) {
                        element.push(document.createElementNS(this.ns, nodeName));
                        for (var i in element) {
                            element[i].setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                            document.body.appendChild(element[i]);
                        }
                        element.push(element);
                    } else {
                        ele = document.createElement(nodeName);
                        document.body.appendChild(ele);
                        element.push(ele);
                    }
                }
                if (prefix == "@") {
                    var tags = document.getElementsByName(selector);
                    for (var j = 0; j < tags.length; j++) {
                        element.push(tags[j]);
                    }
                }
                return element;
            }
        }
        export class Router {
            parseRoutes(root: DomElement) {

            }
        }

        export class Route {
            constructor(private name: String, private link: String, private parent: DomElement) {
            }
        }
    }
}
export const ui = function (selector, bit?, withNs?: any, svgOrXHtml?: any) {
    var ele;
    if (selector instanceof DomModule.DomElement) {
        ele = selector;
    } else {
        ele = new DomModule.DomElement(selector, bit, withNs, svgOrXHtml);
        ele.init();
    }
    return ele;
}

// selector: any;
// element: any;
// withNs: boolean;
// svgOrXhtml: string;
// ns: string;
// bit: any;
// children: Array<object>;
// constructor(selector: string, bit: any, withNs: boolean, svgOrXHtml: string) {
//     this.selector = selector || null;
//     this.element = null;
//     this.withNs = withNs || false;
//     this.svgOrXhtml = svgOrXHtml;
//     this.ns = this.svgOrXhtml === 'svg' ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1999/xhtml';
//     this.bit = bit;
// }

// private get_InnerHtml() {
//     return this.element.innerHTML;
// }

// private set_InnerHtml(val: string) {
//     this.element.innerHTML = val;
// }

// private parseHtml(html?: string): void {
//     var dHtml = document.createElement('html');
//     dHtml.innerHTML = html || this.get_InnerHtml();
//     var templateChildren = dHtml.children[1].children;
//     for (var i = 0; i < templateChildren.length; i++) {
//         if (templateChildren[i].hasChildNodes()) {
//             this.parseHtml(templateChildren[i].innerHTML);;
//         }
//         var outer: any = templateChildren[i].outerHTML;
//         var matches = outer.match(/\[[a-zA-Z0-9]+\]=[\'|\"][a-zA-Z0-9]+\(.*\)[\'|\"]/mg);//(/\[.*[a-zA-Z]\]=[\"|\'].*[a-zA-Z]\([\"|\'].*[a-zA-Z0-9][\"|\']\)[\"|\']/)
//         if (matches) {
//             for (var match of matches) {
//                 //Try to parse the even and get the method to bind
//                 var splits = match.split('=');
//                 if (splits && splits.length == 2) {
//                     var eventToBind = splits[0].replace('[', '').replace(']', '');
//                     var methodToBind = splits[1].replace('"', '');
//                     var startBracePos = methodToBind.indexOf('(') + 1;
//                     var endBracePos = methodToBind.indexOf(')') - 1;
//                     //var parmsToBind = methodToBind.substr(startBracePos, endBracePos - startBracePos).split(',');
//                     var methodOnObject = this.bit[methodToBind.substr(0, methodToBind.indexOf('('))];
//                     if (!methodOnObject) methodOnObject = this.wrapMethod(methodToBind);
//                     //methodOnObject.bind(null, parmsToBind);
//                     templateChildren[i].addEventListener(eventToBind, methodOnObject);
//                 }
//             }
//             console.log(templateChildren[i]);
//         }
//         if (!this.children) this.children = [];
//         this.children.push(templateChildren[i]);

//     }
// }
// private wrapMethod(what) {
//     var wrapper = new Function(what.replace('"', ''));
//     return wrapper;
// }

// appendToBody(overwrite: boolean) {
//     var body = document.getElementsByTagName('body');
//     var existing = this.get_InnerHtml();
//     if (!overwrite) {
//         existing = body.item(0).innerHTML + this.get_InnerHtml();
//     }
//     body.item(0).innerHTML = existing;
// }

// init() {
//     switch (this.selector[0]) {
//         case '<': {
//             var matches = this.selector.match(/<([\w-]*)>/);
//             if (matches === null || matches === undefined) {
//                 throw 'Invalid selector';
//             }
//             var nodeName = matches[0].replace('<', '').replace('>', '');
//             if (this.withNs) {
//                 this.element = document.createElementNS(this.ns, nodeName);
//                 this.element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//                 document.body.appendChild(this.element);
//             } else {
//                 this.element = document.createElement(nodeName);
//                 document.body.appendChild(this.element);
//             }
//             break;
//         }
//         case '#': {
//             this.element = document.getElementById(this.selector.substr(1));
//             break;
//         }
//         case "@": {
//             this.element = document.getElementsByTagName(this.selector.replace('@', ''));
//             if (this.element.length > 0)
//                 this.element = this.element[0];
//             else
//                 throw `Cannot find element for selector:${this.selector}`
//             break;
//         }
//         default:
//             this.element = document.querySelector(this.selector);
//     }
// }

// appendTo(parent) {
//     var element;
//     if (!(parent instanceof DomElement)) throw "Parent must be of type Ui";
//     if (!parent.element) throw "Parent element not found";
//     if (parent.element.length && parent.element.length > 0) element = parent.element[0];
//     else element = parent.element;
//     element.appendChild(this.element);
//     return this;
// }

// style(styleObj: any) {
//     if (typeof styleObj === 'string') {
//         this.element.style = styleObj;
//     } else
//         if (typeof styleObj === 'object') {
//             var styleString = '';
//             for (var p in styleObj) {
//                 styleString = styleString + p + ';'
//             }
//             this.element.style = styleString;
//         }
//     return this;
// }

// html(val: string) {
//     if (val) {
//         this.set_InnerHtml(val);
//         this.parseHtml();
//     }
//     return this.get_InnerHtml();
// }

// pareseRoutes(): Array<any> {
//     var routes = document.getElementsByTagName('route');
//     var routeCollection = [];
//     for (var i = 0; i < routes.length; i++) {
//         var attrb = routes[i].attributes;
//         var link = attrb.getNamedItem(`[link]`).value;
//         if (link) { 
//             routes[i].addEventListener('click', function () {
//                 this.navigate(link);
//             });
//         }
//         routeCollection.push({
//             link: link
//         });
//     }
//     return routeCollection;
// }

// private navigate(to) {

// }