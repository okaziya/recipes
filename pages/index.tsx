import type { NextPage } from 'next'
import Layout from '../components/layout';
import { useEffect } from "react";
import { useRouter } from "next/router";
import {useSession} from '../contexts/session';

const Home: NextPage = () => {
  const router = useRouter();
  const {currentUser} = useSession()


  useEffect(() => {
    // if (!isReady) return;
    console.log("in index use effect")
    if (currentUser) {
      router.replace("/recipes");
    } else {
      router.replace("/auth/signIn");
    }
  }, [ currentUser, router]);

  return <Layout />;
}

export default Home
