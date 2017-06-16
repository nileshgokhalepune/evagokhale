export class member {
    id?: number;
    name: string;
    dateOfBirth?: Date;
    relation: string;
    parents?: Array<member>;
    spouse?: member;
    friends?: Array<member>;
    children?: Array<member>;
    siblings?: Array<member>;
    placeInHirerchy?: number;
    cousins?: Array<member>;
}

export enum MemberRelation {
    Mother = 0,
    Father = 1,
    Sister = 2,
    Brother = 3,
    Child = 4,
    Spouse = 5,
    Friend = 6
}