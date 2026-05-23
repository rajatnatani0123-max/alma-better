import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, enrollmentsTable } from "@workspace/db";
import {
  CreateEnrollmentBody,
  ConfirmPaymentBody,
  GetEnrollmentParams,
  ConfirmPaymentParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/enrollments", async (req, res): Promise<void> => {
  const parsed = CreateEnrollmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const BASE = 75000;
  const GST = Math.round(BASE * 0.18);
  const TOTAL = BASE + GST;

  const [enrollment] = await db
    .insert(enrollmentsTable)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      course: parsed.data.course,
      status: "pending",
      baseAmount: BASE,
      gstAmount: GST,
      totalAmount: TOTAL,
    })
    .returning();

  req.log.info({ enrollmentId: enrollment.id }, "Enrollment created");

  res.status(201).json({
    id: enrollment.id,
    name: enrollment.name,
    email: enrollment.email,
    phone: enrollment.phone,
    course: enrollment.course,
    status: enrollment.status,
    baseAmount: enrollment.baseAmount,
    gstAmount: enrollment.gstAmount,
    totalAmount: enrollment.totalAmount,
    utrNumber: enrollment.utrNumber ?? null,
    createdAt: enrollment.createdAt.toISOString(),
  });
});

router.get("/enrollments/:id", async (req, res): Promise<void> => {
  const params = GetEnrollmentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [enrollment] = await db
    .select()
    .from(enrollmentsTable)
    .where(eq(enrollmentsTable.id, params.data.id));

  if (!enrollment) {
    res.status(404).json({ error: "Enrollment not found" });
    return;
  }

  res.json({
    id: enrollment.id,
    name: enrollment.name,
    email: enrollment.email,
    phone: enrollment.phone,
    course: enrollment.course,
    status: enrollment.status,
    baseAmount: enrollment.baseAmount,
    gstAmount: enrollment.gstAmount,
    totalAmount: enrollment.totalAmount,
    utrNumber: enrollment.utrNumber ?? null,
    createdAt: enrollment.createdAt.toISOString(),
  });
});

router.post("/enrollments/:id/confirm-payment", async (req, res): Promise<void> => {
  const params = ConfirmPaymentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = ConfirmPaymentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db
    .select()
    .from(enrollmentsTable)
    .where(eq(enrollmentsTable.id, params.data.id));

  if (!existing) {
    res.status(404).json({ error: "Enrollment not found" });
    return;
  }

  const [enrollment] = await db
    .update(enrollmentsTable)
    .set({
      utrNumber: parsed.data.utrNumber,
      status: "payment_submitted",
    })
    .where(eq(enrollmentsTable.id, params.data.id))
    .returning();

  req.log.info({ enrollmentId: enrollment.id }, "Payment confirmed");

  res.json({
    id: enrollment.id,
    name: enrollment.name,
    email: enrollment.email,
    phone: enrollment.phone,
    course: enrollment.course,
    status: enrollment.status,
    baseAmount: enrollment.baseAmount,
    gstAmount: enrollment.gstAmount,
    totalAmount: enrollment.totalAmount,
    utrNumber: enrollment.utrNumber ?? null,
    createdAt: enrollment.createdAt.toISOString(),
  });
});

export default router;
