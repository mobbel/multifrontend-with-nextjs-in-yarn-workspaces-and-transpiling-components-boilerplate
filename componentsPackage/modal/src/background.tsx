import { ReactElement } from "react";

export default ({ children }: { children: ReactElement }) => {
  return (
    <div className="absolute top-0 left-0 backdrop-blur-sm w-full h-full">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-25">
        {children}
      </div>
    </div>
  );
};
