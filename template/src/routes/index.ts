import { Router } from "express";
import { getHealth } from "../controllers/healthController";

const router = Router();

/**
 * GET /health
 * Health check — returns server status and uptime.
 */
router.get("/health", getHealth);

export default router;
