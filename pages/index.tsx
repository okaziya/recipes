import type {NextPage} from 'next'
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useSession} from '../contexts/session';
import {Spinner} from "react-bootstrap";

const Home: NextPage = () => {
    const router = useRouter();
    const {currentUser, isReady} = useSession()

    useEffect(() => {
        console.log("index in use Effect", currentUser)
        if (!isReady) return;
        console.log("in index use effect")
        if (currentUser) {
            router.replace("/recipes");
        } else {
            router.replace("/auth/signIn");
        }
    }, [isReady, currentUser, router]);

    return <Spinner animation="grow" variant="primary" />
}

export default Home
