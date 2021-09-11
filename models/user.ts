import { QueryDocumentSnapshot, SnapshotOptions } from "../config/firebase";

import IUser from "../interfaces/user";
import Model from "./model";

export default class User extends Model implements IUser {
    firstName;
    lastName;
    email;

    constructor(data: IUser) {
        super(data);

        this.email = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
    }

    get fullName() {
        return `${this.firstName ?? ""} ${this.lastName ?? ""}`;
    }

}

export const userConverter = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
        const data = snapshot.data(options);
        return new User({ ...(data as IUser), doc: snapshot, id: snapshot.id });
    },
    toFirestore(user: User) {
        return user;
    },
};