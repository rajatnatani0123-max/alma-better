import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChevronRight, Star, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Users, Target, BookOpen, Briefcase, Zap, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const CoursesList = [
  { title: "Full Stack Web Development", duration: "6-12 months", icon: <BookOpen className="w-6 h-6 text-primary" /> },
  { title: "Data Science & Machine Learning", duration: "6-12 months", icon: <TrendingUp className="w-6 h-6 text-primary" /> },
  { title: "Full Stack + Data Science", duration: "12 months", icon: <Zap className="w-6 h-6 text-primary" /> },
  { title: "DevOps & Cloud Engineering", duration: "6 months", icon: <Target className="w-6 h-6 text-primary" /> },
  { title: "React Native Mobile Dev", duration: "4 months", icon: <BookOpen className="w-6 h-6 text-primary" /> },
  { title: "Backend Dev with Node.js", duration: "5 months", icon: <Target className="w-6 h-6 text-primary" /> },
  { title: "UI/UX Design", duration: "4 months", icon: <BookOpen className="w-6 h-6 text-primary" /> },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="font-bold text-2xl tracking-tight text-secondary">Alma<span className="text-primary">Better</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#courses" className="hover:text-primary transition-colors">Courses</a>
            <a href="#guarantee" className="hover:text-primary transition-colors">Job Guarantee</a>
            <a href="#highlights" className="hover:text-primary transition-colors">Why Us</a>
            <a href="#alumni" className="hover:text-primary transition-colors">Alumni</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-lg shadow-primary/20">
              Apply Now
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="max-w-2xl"
              >
                <motion.div variants={fadeInUp}>
                  <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-0 mb-6 px-4 py-1.5 rounded-full text-sm font-medium">
                    #1 Tech Bootcamp in India 🇮🇳
                  </Badge>
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold text-secondary leading-[1.1] tracking-tight mb-6">
                  Learn to code. <br/>
                  <span className="text-primary relative inline-block">
                    Get a job guarantee.
                    <svg className="absolute w-full h-4 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent"/></svg>
                  </span>
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-10 leading-relaxed">
                  Break into the tech industry with confidence. Pay absolutely nothing if you don't land a job offering at least ₹6 LPA. We win when you win.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25">
                    Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 border-secondary/20 text-secondary hover:bg-secondary/5">
                    Take a Free Trial
                  </Button>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-1">4.2K+</div>
                    <div className="text-sm text-muted-foreground font-medium">Students Placed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-1">₹8.4L</div>
                    <div className="text-sm text-muted-foreground font-medium">Avg. Package</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-1">94%</div>
                    <div className="text-sm text-muted-foreground font-medium">Placement Rate</div>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/10 rounded-[3rem] blur-3xl -z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Students collaborating" 
                  className="rounded-[2.5rem] shadow-2xl border-8 border-white/50 object-cover h-[600px] w-full"
                />
                
                {/* Floating Cards */}
                <div className="absolute -left-12 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-border/50 animate-in slide-in-from-left-8 duration-1000 delay-500">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-secondary">Offer Received!</div>
                      <div className="text-xs text-muted-foreground">Amazon • ₹18 LPA</div>
                    </div>
                  </div>
                </div>
                
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- COURSES SECTION --- */}
        <section id="courses" className="py-24 bg-secondary text-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4">Programs built for the real world</h2>
              <p className="text-secondary-foreground/70 text-lg">
                Industry-vetted curriculum designed to make you hireable from day one.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CoursesList.map((course, i) => (
                <motion.div 
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } }
                  }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer h-full backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                        {course.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
                      <div className="flex items-center text-secondary-foreground/60 text-sm mb-6 font-medium">
                        <BookOpen className="w-4 h-4 mr-2" /> {course.duration}
                      </div>
                      <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-semibold">
                        View Curriculum <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- JOB GUARANTEE SECTION --- */}
        <section id="guarantee" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                  <ShieldCheck className="w-5 h-5" /> The AlmaBetter Promise
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6 leading-tight">
                  100% Refund if you don't land a high-paying job.
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We are incredibly confident in our curriculum. That's why we take the risk, not you. If you put in the work, we guarantee the outcome.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-red-50 border border-red-100">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="font-bold text-red-600 text-lg">&lt;</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-secondary mb-1">Salary less than ₹6 LPA</h4>
                      <p className="text-red-700/80 font-medium">You get a FULL MONEY-BACK REFUND. No questions asked.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-green-50 border border-green-100">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="font-bold text-green-600 text-lg">&gt;</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-secondary mb-1">Salary more than ₹6 LPA</h4>
                      <p className="text-green-700/80 font-medium">No refund (You got a great job! Celebrate! 🎉)</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-secondary p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <h3 className="text-2xl font-bold text-white mb-6">Refund Eligibility Conditions</h3>
                <p className="text-secondary-foreground/70 mb-8">All 4 conditions must be met to be eligible for the guarantee:</p>
                
                <ul className="space-y-6">
                  {[
                    "Minimum 75% attendance throughout the program",
                    "Must be present in ALL scheduled interviews arranged by Alma Better",
                    "All assignments must be completed and submitted on time",
                    "Minimum 60% marks in both internal tests (held 2 times per year)"
                  ].map((condition, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-lg text-white font-medium">{condition}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-10 pt-8 border-t border-white/10">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg rounded-xl">
                    View Detailed Policy
                  </Button>
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* --- ELIGIBILITY SECTION --- */}
        <section className="py-24 bg-muted/50 border-y border-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-secondary mb-12">Who can apply?</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-8">
                  <Target className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-secondary">Academic Criteria</h3>
                  <ul className="space-y-3 text-muted-foreground font-medium">
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Minimum 50% marks in Class 10</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Minimum 50% marks in Class 12</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md bg-white">
                <CardContent className="p-8">
                  <Users className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-secondary">Profile</h3>
                  <ul className="space-y-3 text-muted-foreground font-medium">
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Open to graduates & final-year students</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> No coding experience required</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* --- HIGHLIGHTS SECTION --- */}
        <section id="highlights" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-secondary mb-4">Why choose AlmaBetter?</h2>
              <p className="text-lg text-muted-foreground">More than just courses. A complete ecosystem for your career transition.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Live Interactive Classes", desc: "Learn from top tech professionals in real-time. No boring pre-recorded lectures.", icon: <BookOpen /> },
                { title: "1-on-1 Mentorship", desc: "Get paired with industry veterans from MAANG companies to guide your journey.", icon: <Users /> },
                { title: "Real-world Projects", desc: "Build a portfolio of scalable applications that employers actually want to see.", icon: <Briefcase /> },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    {React.cloneElement(feature.icon, { className: "w-7 h-7" })}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Everything you need to know about the program.</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "What if I have zero coding experience?", a: "That's perfectly fine! Our entry-level programs start from absolute scratch. All you need is dedication and 50% in your 10th and 12th standards." },
                { q: "How does the job guarantee work?", a: "If you complete the course, maintain 75% attendance, clear internal tests with 60%, and attend all arranged interviews, but still don't secure a job of ₹6 LPA or more, we refund your entire fee." },
                { q: "Are the classes live or recorded?", a: "We believe in interactive learning. All core conceptual classes are conducted live by industry experts." },
                { q: "Can I do this while working a full-time job?", a: "Yes, our programs require about 15-20 hours of commitment per week. Many of our students are working professionals who transition into tech." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-bold text-secondary hover:text-primary py-6 text-lg">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-32 relative overflow-hidden bg-secondary">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-secondary to-secondary pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl font-bold text-white mb-6">Your tech career starts here.</h2>
            <p className="text-xl text-secondary-foreground/80 mb-10">
              Join thousands of students who have transformed their careers with AlmaBetter.
            </p>
            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30">
              Start Your Application
            </Button>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-secondary pt-20 pb-10 border-t border-white/10 text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">A</div>
                <span className="font-bold text-xl text-white">Alma<span className="text-primary">Better</span></span>
              </div>
              <p className="text-secondary-foreground/60 max-w-sm mb-6 leading-relaxed">
                Building the largest outcome-driven community of tech professionals in India.
              </p>
              <div className="text-white font-medium">contact@almabetter.com</div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Programs</h4>
              <ul className="space-y-4 text-secondary-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cloud Engineering</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-secondary-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Hire From Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center md:text-left text-secondary-foreground/40 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} AlmaBetter. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Inspired by true tech education</p>
          </div>
        </div>
      </footer>
    </div>
  );
}