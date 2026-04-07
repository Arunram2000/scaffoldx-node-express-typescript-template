import express, { Application } from "express";
import helmet from "helmet";
import router from "./routes";
import { requestLogger } from "./middlewares/requestLogger";
import { notFound, errorHandler } from "./middlewares/errorHandler";

const createApp = (): Application => {
  const app = express();

  // ── Core middleware ──────────────────────────────────────────────────────────
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      // HSTS should only be enabled on production HTTPS deployments.
      hsts: process.env.NODE_ENV === "production",
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(requestLogger);

  // ── Routes ───────────────────────────────────────────────────────────────────
  app.use("/", router);

  // ── Error handling (must be last) ────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
