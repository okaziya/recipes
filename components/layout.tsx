import Button from "./ui/button";
import Link from "./ui/link";
import Navbar from "./ui/navbar";
import {linkActive} from "./ui/link";
import {useRouter} from "next/router";
import { useSession } from "../contexts/session";
import Head from "next/head";
import i18n from "../libs/i18n";
import styles from "../styles/components/layout.module.css";
import React from "react";

type Props = {
    children?: React.ReactNode;
};

export default function Layout({children}: Props) {
    const { currentUser, signOutUser } = useSession();
    const router = useRouter();


    return (
        <>
            <Head>
                <title>{i18n.t("appName")}</title>
                <meta name="description" content={i18n.t("appName")}/>
                <link rel="icon" href="/favicon.ico"/>
                {/*<script type="module" src="/javascript/animation.js"/>*/}
            </Head>

            <Navbar
                leftItems={
                    currentUser
                        ? [
                            {
                                key: "favoriteRecipes",
                                node: (
                                    <Link
                                        active={linkActive("/favoriteRecipes", router.asPath)}
                                        href="/favoriteRecipes"
                                    >
                                        {i18n.t("favoriteRecipes.title")}
                                    </Link>
                                ),
                            }
                        ]
                        : []
                }
                logo={i18n.t("appName")}
                rightItems={[
                    currentUser
                        ? {
                            key: "signOut",
                            node: (
                                <Button link onClick={signOutUser}>
                                    {i18n.t("auth.signOut")}
                                </Button>
                            ),
                        }
                        : {
                            key: "signIn",
                            node: <Link href="/auth/signIn">{i18n.t("auth.signIn")}</Link>,
                        },
                ]}
            />

            <main className={styles.main}>
                {children}
            </main>
        </>
    );
}