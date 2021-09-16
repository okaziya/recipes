import Form from "../../components/ui/form";
import {useSession} from "../../contexts/session";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import MyLink from "../../components/ui/link";
import i18n from "../../libs/i18n";

export default function SignUp() {
    const {createUserWithEmailAndPasswordCustom, currentUser} = useSession();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
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

    const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setConfirmPassword(event.target.value);
    };

    const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFirstName(event.target.value);
    }

    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setLastName(event.target.value);
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage("");
        console.log('1')
        if (!email || !password) return;
        if (password !== confirmPassword) {
            setErrorMessage("passwords don't match");
            return;
        }
        try {
            console.log("2", email, password, firstName, lastName);
            await createUserWithEmailAndPasswordCustom(email, password, {firstName, lastName});
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        router.back();
    };

    // <form onSubmit={handleSubmit(onSubmit)}>
    //     <label>First Name</label>
    //     <input
    //         {...register("firstName", {
    //             required: true,
    //             maxLength: 20,
    //             pattern: /^[A-Za-z]+$/i
    //         })}
    //     />
    //     {errors?.firstName?.type === "required" && <p>This field is required</p>}
    //     {errors?.firstName?.type === "maxLength" && (
    //         <p>First name cannot exceed 20 characters</p>
    //     )}
    //     {errors?.firstName?.type === "pattern" && (
    //         <p>Alphabetical characters only</p>
    //     )}
    //     <label>Last Name</label>
    //     <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
    //     {errors?.lastName?.type === "pattern" && (
    //         <p>Alphabetical characters only</p>
    //     )}
    //
    //     <input type="submit" />
    // </form>

    return (
        <>
            <h2>{i18n.t("create")}</h2>
            <MyLink href={"#"} onClick={handleClick}>{i18n.t("lessThan")}</MyLink>
            <Form handleSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="firstName"
                    onChange={handleChangeFirstName}
                    value={firstName}
                />
                <Input
                    type="text"
                    name="lastName"
                    onChange={handleChangeLastName}
                    value={lastName}
                />
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
                <Input
                    type="password"
                    onChange={handleConfirmPassword}
                    value={confirmPassword}
                    name="confirm-password"
                />
                {errorMessage && <div>{errorMessage}</div>}
                <Button type="submit">{i18n.t("create")}</Button>
            </Form>
        </>)
}