import IIngredient from "../interfaces/ingredient";
import Ingredient from "../models/ingredient";

export type State = {
    name: string;
    category: string;
    description: string;
    ingredients: IIngredient[]
}

export const initialState: State = {
    name: "",
    category: "",
    description: "",
    ingredients: []
};

export type Action = {
    payload?: IIngredient | number;
    type: "CLEAR_RECIPE" | "ADD_INGREDIENT" | "DELETE_INGREDIENT";
};

export default function reducer(state: State, action: Action) {
    const {payload, type} = action
    switch (type) {
        case "ADD_INGREDIENT":
            if (!(payload instanceof Ingredient)) {
                throw new Error("Invalid payload.");
            }
            return {
                ...state,
                ingredients: [...state.ingredients, payload]
            };
        case "DELETE_INGREDIENT" :
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, index) => index !== payload)
            }
        case "CLEAR_RECIPE" :
            return initialState;
        default:
            return state;
    }
}