import express, { Application } from "express";
import router from "./routes";
import { requestLogger } from "./middlewares/requestLogger";
import { notFound, errorHandler } from "./middlewares/errorHandler";

const createApp = (): Application => {
  const app = express();

  // ── Core middleware ──────────────────────────────────────────────────────────
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // ── Routes ───────────────────────────────────────────────────────────────────
  app.use("/", router);

  // ── Error handling (must be last) ────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
