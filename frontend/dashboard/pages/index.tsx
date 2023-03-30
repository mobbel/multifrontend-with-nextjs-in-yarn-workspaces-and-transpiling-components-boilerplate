import { GetStaticProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "../../../componentsPackage/modal";
import LoginStepOne from "../components/loginStepOne";
import LoginWithMandatory from "../components/loginWithMandatory";
import LoginWithoutMandatory from "../components/loginWithoutMandatory";

type loginStatus = "loginMail" | "loginWithoutMandatory" | "loginWithMandatory";

export default function Home() {
  const [loginStep, setLoginStep] = useState<loginStatus>("loginMail");
  const [loginMail, setLoginMail] = useState<string>("");
  const [mandatories, setMandatories] = useState([]);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data) {
      router.push("/dashboard");
    }
  }, [session]);

  const onSubmitStepOne = useCallback((data: any) => {
    setLoginMail(data.email);
    fetch(`/api/getMandatories/${data.email}`)
      .then((response) => response.json())
      .then((responseDate) => {
        console.log("Data: ", responseDate);
        if (responseDate.mandatories.length === 1) {
          setMandatories(responseDate.mandatories);
          setLoginStep("loginWithoutMandatory");
        } else if (responseDate.mandatories.length > 1) {
          setMandatories(responseDate.mandatories);
          setLoginStep("loginWithMandatory");
        } else {
          console.log("We got an error");
        }
      });
  }, []);

  const onSubmitFinish = useCallback(
    (data: any) => {
      console.log("Data: ", data);
      signIn("credentials", data);
    },
    [loginMail]
  );
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Backend Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal title={"Login"}>
        <div>
          {loginStep === "loginMail" && (
            <LoginStepOne onSubmit={onSubmitStepOne} />
          )}
          {loginStep === "loginWithMandatory" && (
            <LoginWithMandatory
              onSubmit={onSubmitFinish}
              email={loginMail}
              mandatories={mandatories}
            />
          )}
          {loginStep === "loginWithoutMandatory" && (
            <LoginWithoutMandatory
              onSubmit={onSubmitFinish}
              email={loginMail}
              mandatory={mandatories[0]}
            />
          )}
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
