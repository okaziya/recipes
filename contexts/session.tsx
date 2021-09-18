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
import {useStore} from './store'

export type ContextProps = {
    createUserWithEmailAndPasswordCustom: (
        email: string,
        password: string,
        options: { firstName: string; lastName: string }
    ) => Promise<void>;
    currentUser: IUser | null;
    isReady: boolean;
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
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const { emptyStore } = useStore();

    console.log("currentUser", currentUser);

    const createUserWithEmailAndPasswordCustom = async (
        email: string,
        password: string,
        {firstName, lastName}: { firstName: string; lastName: string }
    ) => {
        const {user: userCredential} = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential) {
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
            emptyStore()
        } catch (error) {
            console.error(error)
        }
    }, [emptyStore])

    const signInWidthGoogle = () => {
        signInWithPopup(auth, provider);
    }

    console.log("is ready", isReady)

    useEffect(() => {
        onAuthStateChanged(auth, async (user: User | null) => {
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
            setIsReady(true);
        })
    }, [signOutUser])

    const value = useMemo(() => ({
        currentUser,
        setCurrentUser,
        signOutUser,
        isReady,
        signInWithEmailAndPasswordCustom,
        createUserWithEmailAndPasswordCustom,
        signInWidthGoogle
    }), [currentUser, signOutUser, isReady]);

    return (
        <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
    );
}

export const useSession = () => {
    return useContext(SessionContext)
}