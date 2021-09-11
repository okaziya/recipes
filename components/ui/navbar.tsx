import Link from "./link";
import styles from "../../styles/components/ui/navbar.module.sass";
import React from "react";

export type Item = {
    key: string;
    node: React.ReactNode;
};

type Props = {
    leftItems?: Item[];
    logo: React.ReactNode;
    pathname?: string;
    rightItems?: Item[];
};

export default function Navbar({
                                   leftItems,
                                   logo,
                                   pathname = "/",
                                   rightItems,
                               }: Props) {
    // const { isReady } = useSession();

    const itemList = (items?: Item[]) =>
        items && (
            <ul className={styles.items}>
                {items.map(({ key, node }) => (
                    <li className={styles.item} key={key}>
                        {node}
                    </li>
                ))}
            </ul>
        );

    return (
        <nav className={styles.navbar}>
            <div className={styles.row}>
                <Link className={styles.logo} href={pathname}>
                    {logo}
                </Link>

                {itemList(leftItems)}
                {itemList(rightItems)}
            </div>

            {/*{isReady && itemList(rightItems)}*/}
        </nav>
    );
}
