import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Modal } from "../../../componentsPackage/modal";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation("common");

  const toLogin = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Backend Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal title={"Logout"}>
        <div>
          <h2 className="text-lg font-bold text-center mb-7">
            1. {t("logoutSuccess")}:
          </h2>
          <button
            className="w-full mt-3 bg-lime-500 rounded font-semibold h-8 leading-8"
            onClick={() => {
              toLogin();
            }}
          >
            Zum Login
          </button>
        </div>
      </Modal>
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
