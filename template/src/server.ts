import createApp from "./app";
import env from "./config/env";
import logger from "./utils/logger";

const app = createApp();

const server = app.listen(env.port, () => {
  logger.info(
    `🚀 __PROJECT_NAME__ running on http://localhost:${env.port}  [${env.nodeEnv}]`,
  );
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
const shutdown = (signal: string): void => {
  logger.info(`${signal} received — shutting down gracefully`);
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
