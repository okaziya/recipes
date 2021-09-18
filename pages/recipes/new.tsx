import React from "react";
import Hints from "../../components/hints";
import {useStore} from "../../contexts/store";
import Image from "next/image";
import Trash from '../../public/images/trash.svg';
import Button from 'react-bootstrap/Button';
import {useRouter} from "next/router";

export default function NewRecipe() {
    const {recipe, recipeDispatch} = useStore();
    const {ingredients} = recipe;
    const router = useRouter()
    console.log("restart", recipe)

    function handleDeleteSelectedIngredient(index: number) {
        recipeDispatch({payload: index, type: 'DELETE_INGREDIENT'})
    }

    const handleBack = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        router.back();
    }

    return <>
        <Button className="bg-black border-white me-auto text-uppercase" size="sm" variant="link"
                onClick={handleBack}>Back</Button>
        <Hints/>
        {ingredients.length > 0 && <div className="bg-primary mt-5 p-4 text-black w-100">
            <h3>Selected ingredients: </h3>
            <ul>
                {ingredients.map(({name, measure, amount}, index) => <li
                    className="align-items-baseline d-flex justify-content-between mb-2" key={index}><h5>{`${name}:   ${
                    amount} ${measure}`}</h5><Button variant="danger"
                                                     onClick={() => handleDeleteSelectedIngredient(index)}><Image
                    src={Trash} alt="trash" width={20}
                    height={20}/></Button>
                </li>)}
            </ul>
        </div>}
    </>
}