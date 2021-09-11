import styles from "../../styles/components/ui/button.module.sass";
import React from "react";

type Props = {
    active?: boolean;
    className?: string;
    children?: React.ReactNode;
    link?: boolean;
    loading?: boolean;
    size?: "md" | "pt" | "sm";
    state?: "danger" | "default" | "none" | "primary";
    title?: string;
};

export default function Button({
                                   active,
                                   className = "",
                                   children,
                                   link,
                                   loading,
                                   size = "md",
                                   state = "primary",
                                   title,
                                   ...rest
                               }: Props &
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
        >) {
    return (
        <button
            className={`${link ? styles.link : styles.button} ${
                link || state === "none" ? "" : styles[`size-${size}`]
            } ${link ? "" : styles[`state-${state}`]} ${
                active ? styles.active : ""
            } ${loading ? styles.loading : ""} ${className}`}
            type="button"
            {...rest}
        >
            {title ?? children}
        </button>
    );
}
