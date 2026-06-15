import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import sheetsRouter from "./sheets.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(sheetsRouter);

export default router;
