import useCurrentUser from "@/hooks/useCurrentUser";
import type { Metadata, NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: user } = useCurrentUser()
  return (
    <>
      <h1>Netflix Clone</h1>
      <p>Logged in as: {user.email}</p>
      <button className=""
        onClick={() => signOut()}
      >Logout</button>
    </>
  );
}


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}