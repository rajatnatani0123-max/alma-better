import { Router, type IRouter } from "express";
import healthRouter from "./health";
import enrollmentsRouter from "./enrollments";

const router: IRouter = Router();

router.use(healthRouter);
router.use(enrollmentsRouter);

export default router;
