import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import React, {CSSProperties} from "react";
import styles from "../styles/components/ingredientCard.module.sass"
import ImagePlaceholder from "../public/images/image.svg"
import Image from "next/image"
import Plus from '../public/images/plus.svg'
import ReactSelect, {StylesConfig} from 'react-select'
import {useForm, Controller} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import i18n from "../libs/i18n";
import {CSSObject} from "@emotion/serialize";

const schema = z.object({
    measure: z.object({
        label: z.string(),
        value: z.string()
    }),
    amount: z.number().min(1).max(99999)
});

type FormSchema = z.infer<typeof schema>

interface IMeasure {
    label: string,
    value: string
}


type Props = {
    name: string,
    measures: IMeasure[],
    imageUri: string | undefined
}

export default function IngredientCard({name, measures, imageUri}: Props) {
    const defaultValues = {
        amount: 1,
        measure: {label: `${measures[0].label}`, value: `${measures[0].value}`}
    }

    const {register, handleSubmit, formState: {errors}, reset, control} = useForm<FormSchema>({
        defaultValues,
        resolver: zodResolver(schema)
    });


    const customControlStyles: CSSProperties = {
        borderColor: '#47B7FC', width: "13rem"
    };

    const customOptionStyles: CSSProperties = {
        backgroundColor: '#47B7FC'
    }

    type IsMulti = false;

    const measureSelectStyle: StylesConfig<IMeasure, IsMulti> = {
        option: (provided: CSSObject) => ({...provided, ...customOptionStyles}),
        control: (provided: CSSObject) => ({...provided, ...customControlStyles})
    }


    const onSubmit = async (data: FormSchema) => {
        console.log("=========== data", data);
        reset();
    };

    return (
        <Card className={styles.card}>
            <div className={styles.imageContainer}>{imageUri === undefined ?
                <div className={styles.imageContainerEmpty}><Image src={ImagePlaceholder} alt="empty image" width={30}
                                                                   height={30}/></div> :
                <Card.Img src={imageUri}/>
            }</div>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>{name}</Card.Title>
                <Card.Text>
                    <form onSubmit={handleSubmit(onSubmit)} className={`d-flex align-items-center ${styles.measure}`}>
                        <Controller name="measure"
                                    control={control}
                                    render={({field}) => (
                                        <ReactSelect {...field}
                                                     options={measures}
                                                     styles={measureSelectStyle}
                                        />
                                    )}
                        />
                        {errors.measure !== undefined && <span role="alert">{errors.measure.label?.message}</span>}
                        <input className={`${styles.amount} mx-2`} type="number" step={1} min={1}
                               placeholder="amount" {...register("amount", {
                            setValueAs: value => Math.max(1, parseInt(value)),
                        })} />
                        {errors.amount && <span role="alert">{errors.amount.message}</span>}
                        <Button className="h-100" variant="primary" type='submit'>
                            <Image src={Plus} alt="plus" width={20} height={20}/>
                        </Button>
                    </form>
                </Card.Text>
            </Card.Body>
        </Card>)
}

