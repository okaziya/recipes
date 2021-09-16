import Button from "./ui/button";
import MyLink from "./ui/link";
import Navbar from "./ui/navbar";
import {linkActive} from "./ui/link";
import {useRouter} from "next/router";
import {useSession} from "../contexts/session";
import Head from "next/head";
import i18n from "../libs/i18n";
import styles from "../styles/components/layout.module.css";
import React from "react";
import Image from "next/image";
import User from "../public/images/user.svg"
import Container from "react-bootstrap/Container"

type Props = {
    children?: React.ReactNode;
};

export default function Layout({children}: Props) {
    const {currentUser, signOutUser} = useSession();
    const router = useRouter();


    return (
        <Container>
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
                                    <MyLink
                                        active={linkActive("/favoriteRecipes", router.asPath)}
                                        href="/favoriteRecipes"
                                    >
                                        {i18n.t("favoriteRecipes.title")}
                                    </MyLink>
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
                            node: <MyLink href="/auth/signIn"><Image alt="user" src={User} width={20} height={20}/></MyLink>,
                        }
                ]}
            />

            <main className={styles.main}>
                {children}
            </main>
        </Container>
    );
}