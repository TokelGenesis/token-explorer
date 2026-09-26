import { NextApiRequest, NextApiResponse } from "next";
import { createHash, timingSafeEqual } from "crypto";

const digest = (value: string) => createHash("sha256").update(value).digest();

/**
 * Rejects the request unless it carries `Authorization: Bearer <ADMIN_API_KEY>`.
 * If ADMIN_API_KEY is not configured, admin endpoints are disabled entirely.
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse, next: any) => {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    return res.status(403).end();
  }

  const header = req.headers.authorization || "";
  const match = /^Bearer (.+)$/.exec(header);
  // Compare fixed-length digests so the check does not leak the key length.
  if (!match || !timingSafeEqual(digest(match[1]), digest(adminKey))) {
    return res.status(401).end();
  }

  next();
};
