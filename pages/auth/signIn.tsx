import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Button from "../../components/ui/button";
import {useSession} from "../../contexts/session";
import {useRouter} from "next/router";
import Form from '../../components/ui/form';
import Input from "../../components/ui/input";
import MyLink from "../../components/ui/link";
import i18n from "../../libs/i18n";

//TODO: add signInForm

export default function SignIn() {
    const {signInWithEmailAndPasswordCustom, currentUser, signInWidthGoogle} = useSession();

    const [email, setEmail] = useState("api.testovac@gmail.com");
    const [password, setPassword] = useState("password");
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (currentUser) router.replace("/");
    }, [currentUser, router])

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPassword(event.target.value);
    };


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage("");
        if (!email || !password) return;
        try {
            console.log("email", email, "password", password);
            await signInWithEmailAndPasswordCustom(email, password);
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    };


    return <>
        <h2>{i18n.t("authorization")}</h2>
        <Form handleSubmit={handleSubmit}>
            <Input
                type="text"
                name="email"
                onChange={handleChangeEmail}
                value={email}
                // icon={User}
            />

            <Input
                type="password"
                name="password"
                onChange={handleChangePassword}
                value={password}
                // icon={Lock}
            />
            {errorMessage && <div>{errorMessage}</div>}
            <Button onClick={signInWidthGoogle}>Sign in width Google</Button>
            <Button type="submit">Sign in</Button>
            <div> {i18n.t("beforeRegister")} <MyLink href="/auth/signUp">{i18n.t('auth.signUp')}</MyLink></div>
        </Form>
    </>
}
