export class member {
    id?: number;
    name: string;
    dateOfBirth?: Date;
    relation: string;
    parents?: Array<member>;
    spouse?: member;
    friends?:Array<member>;
    children?:Array<member>;
    siblings?:Array<member>;
}