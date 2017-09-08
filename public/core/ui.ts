class DomElement {
    selector: any;
    element: any;
    withNs: boolean;
    svgOrXhtml: string;
    ns: string;
    bit: any;
    children: Array<object>;
    constructor(selector: string, bit: any, withNs: boolean, svgOrXHtml: string) {
        this.selector = selector || null;
        this.element = null;
        this.withNs = withNs || false;
        this.svgOrXhtml = svgOrXHtml;
        this.ns = this.svgOrXhtml === 'svg' ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1999/xhtml';
        this.bit = bit;
    }

    private get_InnerHtml() {
        return this.element.innerHTML;
    }

    private set_InnerHtml(val: string) {
        this.element.innerHTML = val;
    }

    private parseHtml(): void {
        var dHtml = document.createElement('html');
        dHtml.innerHTML = this.get_InnerHtml();
        var templateChildren = dHtml.children[1].children;
        for (var i = 0; i < templateChildren.length; i++) {
            var outer: any = templateChildren[i].outerHTML;
            var matches = outer.match(/\[[a-zA-Z0-9]+\]=[\'|\"][a-zA-Z0-9]+\(.*\)[\'|\"]/mg);//(/\[.*[a-zA-Z]\]=[\"|\'].*[a-zA-Z]\([\"|\'].*[a-zA-Z0-9][\"|\']\)[\"|\']/)
            if (matches) {
                for (var match of matches) {
                    //Try to parse the even and get the method to bind
                    var splits = match.split('=');
                    if (splits && splits.length == 2) {
                        var eventToBind = splits[0].replace('[', '').replace(']', '');
                        var methodToBind = splits[1].replace('"', '');
                        var startBracePos = methodToBind.indexOf('(') + 1;
                        var endBracePos = methodToBind.indexOf(')') - 1;
                        //var parmsToBind = methodToBind.substr(startBracePos, endBracePos - startBracePos).split(',');
                        var methodOnObject = this.bit[methodToBind.substr(0, methodToBind.indexOf('('))];
                        if (!methodOnObject) methodOnObject = this.wrapMethod(methodToBind);
                        //methodOnObject.bind(null, parmsToBind);
                        templateChildren[i].addEventListener(eventToBind, methodOnObject);
                    }
                }
                console.log(templateChildren[i]);
            }
            if (!this.children) this.children = [];
            this.children.push(templateChildren[i]);

        }
    }
    private wrapMethod(what) {
        var wrapper = new Function(what.replace('"', ''));
        return wrapper;
    }

    addHtml(html: string) {
        this.set_InnerHtml(html);
        this.parseHtml();
        if (this.children) {
            this.children.forEach(child => {
                this.element.appendChild(child);
            });
        }
        return this;
    }

    appendToBody(overwrite: boolean) {
        var body = document.getElementsByTagName('body');
        var existing = this.get_InnerHtml();
        if (!overwrite) {
            existing = body.item(0).innerHTML + this.get_InnerHtml();
        }
        body.item(0).innerHTML = existing;
    }
    init() {
        switch (this.selector[0]) {
            case '<': {
                var matches = this.selector.match(/<([\w-]*)>/);
                if (matches === null || matches === undefined) {
                    throw 'Invalid selector';
                }
                var nodeName = matches[0].replace('<', '').replace('>', '');
                if (this.withNs) {
                    this.element = document.createElementNS(this.ns, nodeName);
                    this.element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                } else
                    this.element = document.createElement(nodeName);
                break;
            }
            case '#': {
                this.element = document.getElementById(this.selector.substr(1));
                break;
            }
            case "@": {
                this.element = document.getElementsByTagName(this.selector.replace('@', ''));
                if (this.element.length > 0)
                    this.element = this.element[0];
                else
                    throw `Cannot find element for selector:${this.selector}`
                break;
            }
            default:
                this.element = document.querySelector(this.selector);
        }
    }

    appendTo(parent) {
        var element;
        if (!(parent instanceof DomElement)) throw "Parent must be of type Ui";
        if (!parent.element) throw "Parent element not found";
        if (parent.element.length && parent.element.length > 0) element = parent.element[0];
        element.appendChild(this.element);
        return this;
    }

    style(styleObj: any) {
        if (typeof styleObj === 'string') {
            this.element.style = styleObj;
        } else
            if (typeof styleObj === 'object') {
                var styleString = '';
                for (var p in styleObj) {
                    styleString = styleString + p + ';'
                }
                this.element.style = styleString;
            }
        return this;
    }

    html(val: string) {
        if (val) {
            this.set_InnerHtml(val);
        }
        return this.get_InnerHtml();
    }
}

export const ui = function (selector, bit?, withNs?: any, svgOrXHtml?: any) {
    var ele;
    if (selector instanceof DomElement) {
        ele = selector;
    } else {
        ele = new DomElement(selector, bit, withNs, svgOrXHtml);
        ele.init();
    }
    return ele;
}