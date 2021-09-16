import {ChangeEvent, useState} from "react";
import styles from "../../styles/components/recipes/recipes.module.sass"
import RecipeList from "../../components/recipeList";
import MyLink from "../../components/ui/link";
import IRecipe from "../../interfaces/recipe";

export default function Recipes() {
    const [searchRecipe, setSearchRecipe] = useState("");
    const [filterList, setFilterList] = useState<IRecipe[]>([]);

    const recipesData = [
        {
            name: "Banana Bread",
            category: "deserts"
        }, {name: "oven-Roasted Asparagus", category: "main course"}
    ] as IRecipe[]

    const categories = ["deserts", "main course"]


    const handleChange = (ev) => {
        setSearchRecipe(ev.target.value);
    };

    function isMatchFilter(recipe: IRecipe) {
        return (
            recipe.name
                .toLocaleLowerCase()
                .includes(searchRecipe.toLocaleLowerCase()) &&
            (filterList.length
                ? filterList.some((el) => el === recipe.category)
                : true)
        );
    }

    const resultRecipeList =
        searchRecipe || filterList.length ? recipesData.filter(isMatchFilter) : recipesData;

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checkedCategory = e.target.name;

        setFilterList(
            e.target.checked
                ? [...filterList, ...[checkedCategory]]
                : filterList.filter((item) => item !== checkedCategory)
        );
    };

    return (
        <>
            <MyLink href={"/recipes/new"}>+</MyLink>
            {categories && (
                <>
                    <h3 className="text-center">Vybrat kategorie:</h3>
                    <ul className="filter-category mb-0">
                        {categories.map((category, index) => (
                            <li key={index} className="filter-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={handleFilterChange}
                                        name={category}
                                    />
                                    <span>
                    <p>{category}</p>
                  </span>
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
                    value={searchRecipe}
                    onChange={handleChange}
                />
            </div>
            <RecipeList recipes={resultRecipeList}/>
            {/*<canvas id='bg'> </canvas>*/}
        </>
    );
};
