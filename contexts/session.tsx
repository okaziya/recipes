import {auth, provider} from "../config/firebase";
import {
    onAuthStateChanged,
    signOut,
    User,
    UserCredential,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import React, {createContext, useContext, useState, useEffect, useMemo, useCallback} from 'react';
import IUser from "../interfaces/user";
import {getUserById, setUser} from "../actions/users";
import {useRouter} from "next/router";

export type ContextProps = {
    createUserWithEmailAndPasswordCustom: (
        email: string,
        password: string,
        options: { firstName: string; lastName: string }
    ) => Promise<void>;
    currentUser: IUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    signInWithEmailAndPasswordCustom: (
        email: string,
        password: string
    ) => Promise<UserCredential>;
    signOutUser: () => Promise<void>;
    signInWidthGoogle: () => void;
};

const SessionContext = createContext({} as ContextProps)

export default SessionContext

type ProviderProps = {
    children: React.ReactNode;
}

export const SessionProvider = ({children}: ProviderProps) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const router = useRouter();

    console.log("currentUser", currentUser);

    const createUserWithEmailAndPasswordCustom = async (
        email: string,
        password: string,
        {firstName, lastName}: { firstName: string; lastName: string }
    ) => {
        const {user: userCredential} = await createUserWithEmailAndPassword(auth, email, password);
        console.log("user from FB method", userCredential)
        if (userCredential) {
            console.log("***", email, firstName, lastName);
            await setUser(userCredential.uid, {
                email,
                firstName,
                lastName,
            });
        }
    };

    const signInWithEmailAndPasswordCustom = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = useCallback(async () => {
        try {
            await signOut(auth)
            await router.replace("/auth/signIn");
            setCurrentUser(null)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const signInWidthGoogle = () => {
        signInWithPopup(auth, provider);
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user: User | null) => {
            console.log("ITS NAAAATS", user)
            if (user) {
                try {
                    const userData = await getUserById(user.uid);
                    if (userData) {
                        setCurrentUser(userData);
                    } else {
                        await setUser(user, undefined);
                    }
                } catch (error) {
                    console.error(error)
                }
            } else {
                setCurrentUser(null)
            }
        })
    }, [])

    const value = useMemo(() => ({
        currentUser,
        setCurrentUser,
        signOutUser,
        signInWithEmailAndPasswordCustom,
        createUserWithEmailAndPasswordCustom,
        signInWidthGoogle
    }), [currentUser, signOutUser]);

    return (
        <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
    );
}

export const useSession = () => {
    return useContext(SessionContext)
}