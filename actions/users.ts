import {db} from "../config/firebase";
import User, {userConverter} from "../models/user";
import {doc, getDoc} from 'firebase/firestore/lite';
import user from "../interfaces/user";

export const getUserById = async (id: string) => {
    const docRef = doc(db, "users", id).withConverter(userConverter);
    const userSnap = await getDoc(docRef);
    if (!userSnap.exists) {
        return null;
    }
    return userSnap.data() ?? null;
};