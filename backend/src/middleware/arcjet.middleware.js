import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ messaage: "Rate limit exceeded" });
      } else if (decision.reason.isBot) {
        return res
          .status(403)
          .json({ messaage: "Bot detected and denied access" });
      } else {
        return res.status(403).json({ messaage: "Access denied" });
      }
    }
    if (decision.results.some(isSpoofedBot)) {
      return res
        .status(403)
        .json({ messaage: "Bot detected and denied access" });
    }
    next();
  } catch (error) {
    console.log("Error in arcjetProtection middleware", error);
    next();
  }
};
