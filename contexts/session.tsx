import {auth} from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {createContext, useContext, useState, useEffect, useMemo, useCallback} from 'react';
import IUser from "../interfaces/user";
import {getUserById} from "../actions/users";

export type ContextProps = {
    // createUserWithEmailAndPassword: (
    //     email: string,
    //     password: string,
    //     options: { firstName: string; lastName: string }
    // ) => Promise<void>;
    currentUser: IUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    // signInWithEmailAndPassword: (
    //     email: string,
    //     password: string
    // ) => Promise<UserCredential>;
    signOutUser: () => Promise<void>;
};

const SessionContext = createContext({} as ContextProps)

export default SessionContext

type ProviderProps = {
    children: React.ReactNode;
}

export const SessionProvider = ({children}: ProviderProps) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    const signOutUser = useCallback(async () => {
        try {
            await signOut(auth)
        }
        catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if(user) {
                try {
                    // const userData: IUser = await getUserById(user.uid);
                    setCurrentUser(user);
                    console.log(user);
                }
                catch (error) {
                    console.error(error)
                }
            }
            else {
                setCurrentUser(null)
            }
        })

    })

    const value = useMemo(() => ({
        currentUser, setCurrentUser, signOutUser
    }), [currentUser]);

    return (
        <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
    );
}

export const useSession = () => {
    return useContext(SessionContext)
}