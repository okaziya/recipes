import NavbarCom from "./ui/navbar";
import {useSession} from "../contexts/session";
import Head from "next/head";
import i18n from "../libs/i18n";
import styles from "../styles/components/layout.module.css";
import React from "react";
import Image from "next/image";
import User from "../public/images/user.svg"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

type Props = {
    children?: React.ReactNode;
};


export default function Layout({children}: Props) {
    const {currentUser, signOutUser} = useSession();

    return (<>
            <Head>
                <title>{i18n.t("appName")}</title>
                <meta name="description" content={i18n.t("appName")}/>
                <link rel="icon" href="/favicon.ico"/>
                {/*<script type="module" src="/javascript/animation.js"/>*/}
            </Head>
            <NavbarCom
                leftItems={
                    currentUser
                        ? [
                            {
                                key: "favoriteRecipes",
                                href: "/favoriteRecipes",
                                node: i18n.t("favoriteRecipes.title")
                            },
                            {
                                key: "newRecipe",
                                href: "/recipes/new",
                                node: "Create your own recipe"
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
                                <Button size="sm" variant="outline-primary" onClick={signOutUser}>
                                    {i18n.t("auth.signOut")}
                                </Button>
                            ),
                        }
                        : {
                            key: "signIn",
                            href: "/auth/signIn",
                            node: <Image alt="user" src={User} width={40} height={40}/>,
                        }
                ]}
            />
            <Container>

                <main className={styles.main}>
                    {children}
                </main>
            </Container>
        </>
    );
}