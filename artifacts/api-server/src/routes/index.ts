import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import resultsRouter from "./results.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(resultsRouter);

export default router;
