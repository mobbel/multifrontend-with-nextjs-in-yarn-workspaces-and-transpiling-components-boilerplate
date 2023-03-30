import { ReactElement } from "react";

export default ({ children }: { children: ReactElement }) => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="h-2/5 min-h-px-300 w-80 bg-white m-auto rounded-lg">
        {children}
      </div>
    </div>
  );
};
