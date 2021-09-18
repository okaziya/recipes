import IIngredient from "../interfaces/ingredient";

export default class Ingredient implements IIngredient {
    name;
    measure;
    amount;
    constructor(data: IIngredient) {
        this.name = data.name;
        this.measure = data.measure;
        this.amount = data.amount;
    }
}