import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useSession} from "../../contexts/session";
import {useRouter} from "next/router";
import MyLink from "../../components/ui/link";
import i18n from "../../libs/i18n";
import {useForm} from "react-hook-form";

//TODO: add signInForm

export default function SignIn() {
    const {signInWithEmailAndPasswordCustom, currentUser, signInWidthGoogle} = useSession();
    const router = useRouter();
    const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const onSubmit = async ({email, password}) => {
        console.log("data", email, password);
        try {
            console.log("email", email, "password", password);
            await signInWithEmailAndPasswordCustom(email, password);
        } catch (error: any) {
            const authError = i18n.t(`auth.errors.auth/wrong-password`);
            setFirebaseErrorMessage(authError);
            console.log(error.message, error.code)
        }
        reset();
    };

    useEffect(() => {
        if (currentUser) router.replace("/");
    }, [currentUser, router])

    return <>
        <h2>{i18n.t("authorization")}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">email</label>
            <input
                id="email"
                {...register("email", {
                    required: "required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                })}
                type="email"
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}
            <label htmlFor="password">password</label>
            <input
                id="password"
                {...register("password", {
                    required: "required",
                    minLength: {
                        value: 5,
                        message: "min length is 5"
                    }
                })}
                type="password"
            />
            {errors.password && <span role="alert">{errors.password.message}</span>}
            <button type="submit">SIGN IN</button>
            <button onClick={signInWidthGoogle}>Sign in width Google</button>
            <span role="alert">{firebaseErrorMessage}</span>
        </form>
        <div> {i18n.t("beforeRegister")} <MyLink href="/auth/signUp">{i18n.t('auth.signUp')}</MyLink></div>
    </>
}
