import {db} from "../config/firebase";
import {userConverter} from "../models/user";
import {doc, getDoc, setDoc} from 'firebase/firestore/lite';
import IUser from "../interfaces/user";
import {User} from "firebase/auth";
import {serverTimestamp} from 'firebase/firestore/lite';

export const getUserById = async (id: string) => {
    const docRef = doc(db, "users", id).withConverter(userConverter);
    const userSnap = await getDoc(docRef);
    if (!userSnap.exists) {
        return null;
    }
    return userSnap.data() ?? null;
};

export const setUser = async (
    userAuth: User | string,
    data?: Omit<IUser, "createdAt" | "deletedAt" | "doc" | "id" | "updatedAt">
) => {
    const userId = (typeof userAuth === "string") ? userAuth : userAuth.uid
    const userRef = doc(db, "users", userId);
    if (data === undefined && typeof userAuth !== "string") {
        const {displayName, email} = userAuth;
        if (displayName && email) {
            const [firstName, lastName] = displayName.split(" ");
            data = {
                firstName,
                lastName,
                email,
            }
        }
    }
    const userData = {
        ...data,
        createdAt: serverTimestamp(),
        deletedAt: null,
        updatedAt: null,
    } as IUser
    try {
        await setDoc(userRef, userData);
        const userSnap = await getDoc(userRef);
        return userSnap.data() ?? null;
    } catch (error: any) {
        console.log("error creating user", error.message)
    }
}
