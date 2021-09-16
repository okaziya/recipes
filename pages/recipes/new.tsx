import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import axios from 'axios';
import {debounce} from 'lodash';
import IHint from "../../interfaces/hint";
import IFood from "../../interfaces/food"
import IngredientCard from "../../components/ingredientCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type Options = { method: string, url: string, params: { ingr: string }, headers: { "x-rapidapi-host": string, "x-rapidapi-key": string } }

type ServerResponse = {
    data: ServerData
}

type ServerData = {
    text: string,
    parsed: { food: IFood }[],
    hints: IHint[],
}

export default function Ingredients() {
    const [ingredientQuery, setIngredientQuery] = useState("");
    const [hints, setHints] = useState<IHint[] | null>(null);

    useEffect(() => {
        return () => {
            debouncedChangeHandler.cancel();
        }
    }, []);

    useEffect(() => {
        if (ingredientQuery) {
            const options = {
                method: 'GET',
                url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
                params: {ingr: `${ingredientQuery}`},
                headers: {
                    'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
                    'x-rapidapi-key': '45bbcda4bamsh6ad6f8a4d4bcadcp15c868jsn147017e74101'
                }
            } as Options;

            (async () => {
                if (!options) return
                // @ts-ignore
                const {data} = await axios.request<ServerData>(options) as ServerResponse
                setHints(data.hints.filter(({food}) => food.category === "Generic foods"))
                console.log("data", data)
            })()
        } else {
            setHints(null)
        }
    }, [ingredientQuery])

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setIngredientQuery(event.target.value);
    };

    const debouncedChangeHandler = useMemo(
        () => debounce(changeHandler, 300)
        , []);
    console.log("hints", hints)
    return <div>
        <input
            onChange={debouncedChangeHandler}
            type="text"
            placeholder="Type a query..."
        />
        {ingredientQuery && <h2>{ingredientQuery}</h2>}
        {hints && <Row md={1} lg={2} className="g-4">
            {hints.map(({food, measures}, index) => <Col key={index}><IngredientCard name={food.label} imageUri={food.image}
                                                                                    measures={measures.map(el => {return {label: el.label, value: el.label}})}/>
            </Col>)}
        </Row>}
    </div>
}