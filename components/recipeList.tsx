import React from "react";
import { useRouter } from "next/router";

export default function RecipeList({ recipes }) {
    const router = useRouter();
    return (
        <ul className="recipe-list">
            {recipes.map(({ name } ,id) => (
                <li className="relative" key={id}>
                    <div onClick={() =>router.push(`/recipes/${id}`)}>
                        <span className="absolute text-center w-100">{name}</span>
                        {/*<img src={photo} width="760" height="760" alt={name} />*/}
                    </div>
                </li>
            ))}
        </ul>
    );
}
