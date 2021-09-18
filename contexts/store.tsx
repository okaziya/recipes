import React, {useReducer, createContext, useContext, useCallback, useMemo} from "react";

import recipeReducer, {
    initialState as recipeInitialState,
    Action as recipeAction,
    State as recipeState
} from "../reducers/recipe";

export type ContextProps = {
    emptyStore: () => void;
    recipe: recipeState;
    recipeDispatch: React.Dispatch<recipeAction>;
}

type ProviderProps = {
    children: React.ReactNode;
};


const StoreContext = createContext({} as ContextProps)

export default StoreContext;

export const StoreProvider = ({children}: ProviderProps) => {

    const [recipe, recipeDispatch] = useReducer(
        recipeReducer,
        recipeInitialState);

    console.log("recipe in store", recipe)

    const emptyStore = useCallback(() => {
        recipeDispatch({type: "CLEAR_RECIPE"})
    }, []);

    const value = useMemo(
        () => ({
            emptyStore,
            recipe,
            recipeDispatch
        }), [emptyStore, recipe]
    )
    return (
        <StoreContext.Provider value={value}> {children}</StoreContext.Provider>
    )
}

export const useStore = () => {
    return useContext(StoreContext);
};
