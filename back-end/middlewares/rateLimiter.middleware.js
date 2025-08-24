import rateLimit from "express-rate-limit";

const allowlist = ["192.168.1.10"];

function getClientIp(req) {
  let ip = req.ip || "";
  ip = ip.replace(/^::ffff:/, "");
  if (ip === "::1") ip = "127.0.0.1";
  return ip;
}

export const limiter = (limit) =>
  rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    limit: limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    skip: (req, res) =>
      process.env.NODE_ENV !== "production" ||
      allowlist.includes(getClientIp(req)),
    message: {
      message:
        "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
    },
  });
