import React from "react";
import styles from "../../styles/components/ui/form.module.sass";


type Props = {
    children?: React.ReactNode;
    title?: string
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
};

export default function Form({children, title, handleSubmit}: Props) {
    return <form className={styles.form} onSubmit={handleSubmit}>
        {title && <h2>{title}</h2>}
        {children}
    </form>
}