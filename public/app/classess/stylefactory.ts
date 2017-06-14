interface IStyle {
    style(): any;
}

export class DefaultStyle implements IStyle {
    style(): any {
        return {

        }
    }
}

export class SelfStyle implements IStyle {
    public style(): any {
        return {
            'bottom': '10px!important',
            'postion': 'relative',
            'color': 'white'
        }
    }
}

export class StyleFactory {
    getStyle(relation: string): IStyle {
        if (relation === "Self") {
            return new SelfStyle();
        } else {
            return new DefaultStyle();
        }
    }
}
