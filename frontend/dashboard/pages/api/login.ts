import type { NextApiRequest, NextApiResponse } from "next";
import userData from "../../testData/user.json";

type Data = {
  name: string;
  mandatoryId: string;
  email: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;

  const user = userData.filter((user) => {
    return user.mail === data.email && user.password === data.password;
  })[0];

  console.log("User: ", user);

  if (user) {
    res.status(200).json({
      name: user.name,
      mandatoryId: data.mandatoryId,
      email: data.email,
    });
  } else {
    res.status(401);
  }
}
