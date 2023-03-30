import type { NextApiRequest, NextApiResponse } from "next";
import userData from "../../../testData/user.json";

type Data = {
  mandatories?: {
    name: string;
    id: string;
  }[];
  error?: {
    errorText: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email } = req.query;
  const returnCode: Data = {};
  const user = userData.filter((user) => user.mail === email)[0];
  if (user) {
    returnCode.mandatories = user.mandatories;
  } else {
    returnCode.error = {
      errorText: "customer not found",
    };
  }

  if (returnCode.mandatories) res.status(200).json(returnCode);
  res.status(403).json(returnCode);
}
