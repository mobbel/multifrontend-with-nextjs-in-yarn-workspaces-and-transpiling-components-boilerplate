import { ReactElement } from "react";
import Background from "./background";
import Header from "./header";
import Layer from "./layer";

export const Modal = ({
  title,
  children,
}: {
  title: string;
  children: ReactElement;
}) => {
  return (
    <Background>
      <Layer>
        <>
          <Header title={title} />
          <div className="p-8 grid place-items-center h-[calc(100%_-_2rem)]">
            {children}
          </div>
        </>
      </Layer>
    </Background>
  );
};
