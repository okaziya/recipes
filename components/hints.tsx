import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import IHint from "../interfaces/hint";
import {debounce} from "lodash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IngredientCard from "./ingredientCard";
import {getHints} from "../actions/hints";
import Button from 'react-bootstrap/Button';
import Image from 'next/image'
import ChevronDown from "../public/images/chevronDown.svg";
import ChevronUp from "../public/images/chevronUp.svg";
import styles from "../styles/components/hints.module.sass";
import i18n from "../libs/i18n";

export default function Hints() {
    const [hintQuery, setHintQuery] = useState("");
    const [hints, setHints] = useState<IHint[] | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        if (hintQuery) {
            (async () => {
                const hintsFromAPI = await getHints(hintQuery);
                if (hintsFromAPI !== undefined && hintsFromAPI.length > 0) {
                    setHints(hintsFromAPI)
                }
            })();
        } else {
            setHints(null)
        }
        return () => {
            debouncedChangeHandler.cancel();
        }
    }, [hintQuery])

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setHintQuery(event.target.value);
    };

    const debouncedChangeHandler = useMemo(
        () => debounce(changeHandler, 300)
        , []);

    const NUMBER_OF_ITEMS_TO_SHOW = 4;
    let hintsToShow;
    if (hints) {
        hintsToShow = isCollapsed ? hints.slice(0, NUMBER_OF_ITEMS_TO_SHOW) : hints
    }

    return <div className="align-items-center bg-white d-flex flex-column mt-3 px-5 py-3 shadow w-100">
        <h3 className="text-center">Choose ingredients</h3>
        <p className="text-center">start to type the name of ingredient are you looking for</p>
        <input
            onChange={debouncedChangeHandler}
            type="search"
            placeholder="Search..."
            className="form-control m-auto w-25"
        />
        {hints && <>
            <br/>
            <p>Click to choose</p>
            <Row md={1} lg={2} className="g-4">
                {hintsToShow !== undefined && hintsToShow.map(({food, measures}, index) => <Col key={index}><IngredientCard name={food.label}
                                                                                               imageUri={food.image}
                                                                                               measures={measures.map(el => {
                                                                                                   return {
                                                                                                       label: el.label,
                                                                                                       value: el.label
                                                                                                   }
                                                                                               })}/>
                </Col>)}
            </Row>
            <br/>
            <br/>
            {hints.length > NUMBER_OF_ITEMS_TO_SHOW && <Button variant="secondary"
                                                               size="sm"
                                                               onClick={() => setIsCollapsed(!isCollapsed)}
                                                               className="m-auto">{isCollapsed ?
                <><h5 className="mb-0"> {i18n.t("showMore")}
                </h5><Image src={ChevronDown} alt="show more" width="21"/></> :
                <>
                    <h5 className="mb-0"> {i18n.t("showLess")}</h5>
                    <Image src={ChevronUp} alt="show less" width="21"/>
                </>} </Button>}
        </>}
    </div>
}