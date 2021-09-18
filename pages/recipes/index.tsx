import {ChangeEvent, useState, useMemo, useCallback} from "react";
import styles from "../../styles/components/recipes/recipes.module.sass"
import RecipeList from "../../components/recipeList";
import IRecipe from "../../interfaces/recipe";

type Category = "Breakfast"| "Lunch"| "Dinner"| "Dessert";

export default function Recipes() {
    const [textInSearchInput, setTextInSearchInput] = useState("");
    const [checkedCategories, setCheckedCategories] = useState<Category[] | null>(null);

    console.log("textInSearchInput", textInSearchInput)

    const recipesData = [
        {
            name: "Banana Bread",
            category: "Dessert"
        }, {name: "oven-Roasted Asparagus", category: "Breakfast"}
    ] as IRecipe[]

    const categories: Category[] = ["Breakfast", "Lunch", "Dinner", "Dessert"]


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTextInSearchInput(e.target.value);
    };

    const isMatchFilter = useCallback((recipe: IRecipe) => {
          console.log(recipe.name.toLocaleLowerCase().includes(textInSearchInput.toLocaleLowerCase()) &&
            (checkedCategories
                ? checkedCategories.some((el) => el === recipe.category)
                : true))
        return recipe.name.toLocaleLowerCase().includes(textInSearchInput.toLocaleLowerCase()) &&
            (checkedCategories
                ? checkedCategories.some((el) => el === recipe.category)
                : true)
    }, [checkedCategories, textInSearchInput])

    const finalFilteredRecipeList = useMemo(() => {
            return textInSearchInput || checkedCategories ? recipesData.filter(isMatchFilter) : recipesData}
        , [textInSearchInput, checkedCategories, recipesData])


    const handleCheckboxStateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const currentCheckedCategory = e.target.value as Category;
        const isChecked = e.target.checked;
        setCheckedCategories(function(prevState) {
                if (isChecked) {
                    return prevState ? [...prevState, currentCheckedCategory] :  [currentCheckedCategory]
                } else if (!isChecked && prevState) {
                    return prevState.filter((category) => category !== currentCheckedCategory)
                } else return null
            }
        );
    };

    return (
        <>
            {categories && (
                <>
                    <h3 className="text-center">Select category you are looking for or start to type in:</h3>
                    <ul className="d-flex p-0">
                        {categories.map((categoryName, index) => (
                            <li key={index} className="align-items-center d-flex">
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={handleCheckboxStateChange}
                                        value={categoryName}
                                    />
                                    <span className="mx-2">{categoryName}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <div className="d-flex align-center">
                <input
                    className="text-center el-center"
                    type="text"
                    placeholder="search"
                    value={textInSearchInput}
                    onChange={handleChange}
                />
            </div>
            <RecipeList recipes={finalFilteredRecipeList}/>
            {/*<canvas id='bg'> </canvas>*/}
        </>
    );
};
