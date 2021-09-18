import Link, { LinkProps } from "next/link";
import styles from "../../styles/components/ui/link.module.sass";
import React from "react";

type Props = {
    active?: boolean;
    className?: string;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function MyLink(props: LinkProps & Props) {
    const { active, className = "", children, onClick } = props;

    return (
        <Link {...props}>
            <a
                className={`${styles.link} ${active ? styles.active : ""} ${className}`}
                onClick={onClick}
            >
                {children}
            </a>
        </Link>
    );
}
