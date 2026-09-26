// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  editToken,
  getToken,
  tokenIdSchema,
  tokenUpdateSchema,
} from "utils/tokens";

import nc from "next-connect";
import requireAdmin from "utils/middlewares/requireAdmin";
import validate from "utils/middlewares/validate";

export default nc({
  onError: (err, _, res: NextApiResponse, __) => {
    console.error(err.stack);
    res.status(500).end();
  },
  onNoMatch: (_, res: NextApiResponse) => {
    res.status(404).end();
  },
})
  .get(
    validate({ query: tokenIdSchema }),
    async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        const doc = await getToken(String(req.query.id));
        return res.status(200).json(doc);
      } catch (e) {
        console.error(e);
        return res.status(404).json({ error: "Token not found" });
      }
    }
  )
  .put(
    requireAdmin,
    validate({ query: tokenIdSchema, body: tokenUpdateSchema }),
    async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        await editToken(String(req.query.id), req.body);
        return res.status(200).end();
      } catch (e) {
        console.error(e);
        return res.status(400).json({ error: "Update failed" });
      }
    }
  );
