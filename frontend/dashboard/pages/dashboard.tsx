import { GetStaticProps } from "next";
import { signOut, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  const logout = useCallback(async () => {
    signOut();
  }, []);

  useEffect(() => {
    if (!session.data) {
      router.push("/loggedOut");
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Backend Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        Dashboard
        <button
          onClick={() => {
            logout();
          }}
        >
          Ausloggen
        </button>
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "", ["common"])),
      // Will be passed to the page component as props
    },
  };
};
