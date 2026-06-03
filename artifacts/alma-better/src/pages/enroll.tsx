import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const COURSES = [
  "Full Stack Web Development",
  "Data Science & Machine Learning",
  "Full Stack + Data Science",
  "DevOps & Cloud Engineering",
  "React Native Mobile Development",
  "Backend Development with Node.js",
  "UI/UX Design",
];

const BASE = 75000;
const GST = Math.round(BASE * 0.18);
const TOTAL = BASE + GST;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid 10-digit phone number").max(15),
  course: z.string().min(2, "Please select a course"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Enroll() {
  const [, setLocation] = useLocation();
  const [selectedCourse, setSelectedCourse] = useState("");

  

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", course: "" },
  });

  
function onCourseSelect(course: string) {
  setSelectedCourse(course);
  form.setValue("course", course);
}

function onSubmit(values: FormValues) {

  const enrollmentData = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    course: selectedCourse,
  };

  localStorage.setItem(
    "almaEnrollment",
    JSON.stringify(enrollmentData)
  );

  setLocation("/payment/test");
}
   


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-back-home"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-xl text-secondary">Alma<span className="text-primary">Better</span></span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
              Step 1 of 2 — Enrollment Details
            </div>
            <h1 className="text-4xl font-extrabold text-secondary mb-3">Apply for a Program</h1>
            <p className="text-lg text-muted-foreground">Fill in your details and choose your course to get started.</p>
          </div>

          {/* Pricing Summary */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="bg-white border border-border rounded-2xl px-8 py-5 text-center shadow-sm">
              <div className="text-sm text-muted-foreground font-medium mb-1">Course Fee</div>
              <div className="text-2xl font-bold text-secondary">₹{BASE.toLocaleString("en-IN")}</div>
            </div>
            <div className="bg-white border border-border rounded-2xl px-8 py-5 text-center shadow-sm">
              <div className="text-sm text-muted-foreground font-medium mb-1">GST (18%)</div>
              <div className="text-2xl font-bold text-secondary">₹{GST.toLocaleString("en-IN")}</div>
            </div>
            <div className="bg-primary rounded-2xl px-8 py-5 text-center shadow-lg shadow-primary/20">
              <div className="text-sm text-white/80 font-medium mb-1">Total Payable</div>
              <div className="text-2xl font-bold text-white">₹{TOTAL.toLocaleString("en-IN")}</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Course Selection */}
            <div>
              <h2 className="text-lg font-bold text-secondary mb-4">Choose Your Program</h2>
              <div className="space-y-3">
                {COURSES.map((course) => (
                  <button
                    key={course}
                    type="button"
                    data-testid={`card-course-${course.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => onCourseSelect(course)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      selectedCourse === course
                        ? "border-primary bg-primary/5 text-secondary"
                        : "border-border bg-white hover:border-primary/40 text-muted-foreground"
                    }`}
                  >
                    <BookOpen className={`w-5 h-5 shrink-0 ${selectedCourse === course ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-medium text-sm">{course}</span>
                  </button>
                ))}
              </div>
              {form.formState.errors.course && (
                <p className="text-red-500 text-sm mt-2">{form.formState.errors.course.message}</p>
              )}
            </div>

            {/* Personal Details Form */}
            <div>
              <h2 className="text-lg font-bold text-secondary mb-4">Your Details</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Rahul Sharma" data-testid="input-name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="rahul@gmail.com" data-testid="input-email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+91 98765 43210" data-testid="input-phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  
<div className="pt-4">
  <Button
    type="submit"
    size="lg"
    data-testid="button-submit-enrollment"
    disabled={false}
    className="w-full h-14 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
  >
    <>
      Proceed to Payment
      <ArrowRight className="ml-2 w-5 h-5" />
    </>
  </Button>
</div>


                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
