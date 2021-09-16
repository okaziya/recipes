import { SnapshotOptions, QueryDocumentSnapshot, DocumentData  } from 'firebase/firestore';

import IRecipe from "../interfaces/recipe";
import Model from "./model";

export default class Recipe extends Model implements IRecipe {
    name;
    category;
    ingredients;

    constructor(data: IRecipe) {
        super(data);

        this.name = data.name;
        this.category = data.category;
        this.ingredients = data.ingredients;
    }
}

export const userConverter = {
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions) {
        const data = snapshot.data(options);
        return new Recipe({ ...(data as IRecipe), doc: snapshot, id: snapshot.id });
    },
    toFirestore(user: Recipe) {
        return user;
    },
};