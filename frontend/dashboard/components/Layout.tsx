import { ReactElement } from "react";
import Header from "./header";

export default ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
