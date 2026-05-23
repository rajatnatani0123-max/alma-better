import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const enrollmentsTable = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  course: text("course").notNull(),
  status: text("status").notNull().default("pending"),
  baseAmount: integer("base_amount").notNull().default(75000),
  gstAmount: integer("gst_amount").notNull().default(13500),
  totalAmount: integer("total_amount").notNull().default(88500),
  utrNumber: text("utr_number"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertEnrollmentSchema = createInsertSchema(enrollmentsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollmentsTable.$inferSelect;
