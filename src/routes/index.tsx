import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/contact-schema";
import { submitContactMessage } from "@/lib/contact.functions";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/HelpingHands4u", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shahindeveloper78/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/shahin_tech78/",
    icon: Instagram,
  },
];

const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    number: "01",
    title: "UniLibrary",
    type: "University library platform",
    description:
      "A library and learning-resource management project with student and librarian workflows for catalog search, reservations, borrowing, renewals, returns, wishlists, and reviews.",
    stack: ["TypeScript", "TanStack Start", "Firebase"],
    href: "https://github.com/HelpingHands4u/unilibrary",
    status: "In progress",
  },
  {
    number: "02",
    title: "Academic Management System",
    type: "Academic workflow prototype",
    description:
      "A university management prototype organized around student, faculty, and administrator portals, with modules for courses, attendance, timetables, examinations, and academic resources.",
    stack: ["Python", "HTML", "JavaScript"],
    href: "https://github.com/HelpingHands4u/Academic-Management-System",
    status: "Prototype",
  },
  {
    number: "03",
    title: "Campus Integration Bot",
    type: "Campus website concept",
    description:
      "A campus-site integration project exploring a responsive interface, frontend–backend connection, and a floating chatbot concept. Its repository describes some chatbot work as planned.",
    stack: ["HTML", "Frontend", "Chatbot concept"],
    href: "https://github.com/HelpingHands4u/BWU-ACAD",
    status: "Exploration",
  },
];

const skillGroups = [
  { title: "Programming", skills: ["C", "Python · basics"] },
  {
    title: "Areas of interest",
    skills: ["Cybersecurity fundamentals", "Data science", "AI"],
  },
  { title: "Tools & development", skills: ["Firebase", "Frontend development"] },
];

const education = [
  {
    period: "In progress · 2nd year",
    degree: "B.Tech — Computer Science and Engineering",
    focus: "Cyber Security specialization",
    school: "Brainware University · West Bengal",
  },
  {
    period: "In progress",
    degree: "B.Sc. (Honours) — Data Science and AI",
    focus: "Online programme",
    school: "IIT Guwahati",
  },
  {
    period: "2025 · A Grade",
    degree: "Intermediate · Class XII",
    focus: "Board of Intermediate Education",
    school: "Andhra Pradesh",
  },
  {
    period: "96.1%",
    degree: "SSC · Class X",
    focus: "Board of Secondary Education",
    school: "Andhra Pradesh",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammad Shahinuddin Molla — Cybersecurity & Data Science Developer" },
      {
        name: "description",
        content:
          "Meet Mohammad Shahinuddin Molla, a computer science student exploring cybersecurity, data science, and AI through practical projects.",
      },
      {
        property: "og:title",
        content: "Mohammad Shahinuddin Molla — Cybersecurity & Data Science Developer",
      },
      {
        property: "og:description",
        content:
          "Computer science student building practical projects across cybersecurity, data science, and AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const sendContactMessage = useServerFn(submitContactMessage);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("shahin-portfolio-theme");
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("light", initialTheme === "light");

    const revealItems = document.querySelectorAll<HTMLElement>(".portfolio-reveal");
    document.documentElement.classList.add("portfolio-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
    window.localStorage.setItem("shahin-portfolio-theme", nextTheme);
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("sending");
    setFormMessage("");
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const input = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
    };
    const parsed = contactSchema.safeParse(input);

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string" && !errors[field]) errors[field] = issue.message;
      });
      setFieldErrors(errors);
      setFormMessage("Please check the highlighted fields.");
      setFormStatus("idle");
      return;
    }

    try {
      const result = await sendContactMessage({ data: parsed.data });
      if (!result.success) {
        setFormMessage(result.error);
        setFormStatus("idle");
        return;
      }

      form.reset();
      setFormMessage("Thanks — I'll get back to you soon!");
      setFormStatus("success");
    } catch {
      setFormMessage("Your message could not be sent. Please try again or email me directly.");
      setFormStatus("idle");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="portfolio-header">
        <div className="portfolio-shell flex min-h-[4.4rem] items-center justify-between gap-4">
          <a
            className="inline-flex items-center gap-3 text-sm font-semibold text-foreground"
            href="#home"
            aria-label="Shahin home"
          >
            <span className="flex size-9 items-center justify-center rounded-sm border border-border font-mono text-sm text-primary">
              SM
            </span>
            <span className="hidden sm:inline">Shahin Molla</span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile navigation" className="portfolio-shell flex flex-col pb-4 md:hidden">
            {navigation.map((item) => (
              <a
                key={item.href}
                className="border-t border-border py-3 text-sm text-muted-foreground"
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative isolate overflow-hidden">
          <div aria-hidden="true" className="portfolio-hero-grid pointer-events-none absolute inset-0 -z-10" />
          <div className="portfolio-shell grid min-h-[calc(100svh-4.4rem)] items-center gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
            <div className="portfolio-reveal is-visible max-w-3xl">
              <p className="mb-7 flex items-center gap-2 font-mono text-xs text-portfolio-accent">
                <span className="size-2 rounded-full bg-primary" />
                AVAILABLE FOR LEARNING & COLLABORATION
              </p>
              <p className="mb-5 font-mono text-sm text-muted-foreground">Hello, I’m</p>
              <h1 className="max-w-[12ch] text-5xl font-semibold leading-[1.04] text-foreground sm:text-6xl lg:text-7xl">
                Mohammad Shahinuddin Molla
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Computer Science Student <span className="text-primary">|</span> Cyber Security{" "}
                <span className="text-primary">|</span> Data Science &amp; AI
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-secondary-foreground">
                Building practical tech solutions across cybersecurity, data science, and AI.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#projects">
                    View Projects <ArrowDownRight aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#contact">Get in Touch</a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <a href="/resume.pdf" download>
                    <Download aria-hidden="true" /> Download Resume
                  </a>
                </Button>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    className="portfolio-social-link text-sm"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon aria-hidden="true" size={17} />
                    {label}
                  </a>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <a className="portfolio-social-link" href="mailto:shahindeveloper78@gmail.com">
                  <Mail aria-hidden="true" size={16} /> shahindeveloper78@gmail.com
                </a>
                <span className="inline-flex items-center gap-2">
                  <MapPin aria-hidden="true" size={16} /> Vijayawada, India
                </span>
              </div>
            </div>

            <div className="portfolio-reveal mx-auto w-full max-w-xl lg:ml-auto">
              <div className="portfolio-terminal overflow-hidden rounded-md font-mono text-[0.8rem] shadow-2xl">
                <div className="portfolio-terminal-bar flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-2" aria-label="Code window">
                    <span className="size-2.5 rounded-full bg-muted-foreground/50" />
                    <span className="size-2.5 rounded-full bg-primary/60" />
                    <span className="size-2.5 rounded-full bg-accent/50" />
                  </div>
                  <span className="text-xs text-muted-foreground">about.shahin</span>
                  <Code2 aria-hidden="true" className="size-4 text-muted-foreground" />
                </div>
                <div className="space-y-4 px-5 py-6 sm:px-7 sm:py-8">
                  <p className="text-muted-foreground">
                    <span className="text-primary">const</span> developer = &#123;
                  </p>
                  <p className="pl-5 text-foreground">
                    focus: <span className="text-primary">["security", "data", "AI"]</span>,
                  </p>
                  <p className="pl-5 text-foreground">
                    learning: <span className="text-accent">true</span>,
                  </p>
                  <p className="pl-5 text-foreground">
                    building: <span className="text-accent">"useful things"</span>,
                  </p>
                  <p className="text-muted-foreground">&#125;;</p>
                  <div className="!my-6 border-t border-border" />
                  <p className="text-muted-foreground">
                    <span className="text-primary">&gt;</span> developer.location
                  </p>
                  <p className="pl-5 text-foreground">"Vijayawada, India"</p>
                  <p className="mt-7 inline-flex items-center gap-2 text-primary">
                    <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                    open_to_opportunities
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <span>Curious by nature. Building by learning.</span>
                <span className="font-mono">01 / 06</span>
              </div>
            </div>
          </div>
          <a
            href="#about"
            className="portfolio-shell hidden items-center gap-2 pb-8 font-mono text-xs text-muted-foreground lg:flex"
          >
            <ArrowDown aria-hidden="true" size={14} /> Scroll to explore
          </a>
        </section>

        <section id="about" className="portfolio-section">
          <div className="portfolio-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading number="01" label="About" title="A student first. A builder always." />
            <div className="portfolio-reveal space-y-7">
              <p className="max-w-3xl text-xl leading-9 text-foreground sm:text-2xl sm:leading-10">
                I’m a computer science student interested in how technology can solve real problems —
                and how it can be built more thoughtfully and securely.
              </p>
              <p className="max-w-3xl leading-8 text-muted-foreground">
                I’m pursuing a B.Tech in Computer Science and Engineering with a Cyber Security
                specialization at Brainware University, alongside a B.Sc. (Honours) in Data Science
                and AI through IIT Guwahati. I learn by building, documenting what works, and being
                honest about what is still in progress.
              </p>
              <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                <div className="flex gap-3">
                  <GraduationCap aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={19} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Currently studying</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Cyber Security · Data Science &amp; AI
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={18} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Based in</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Vijayawada, Andhra Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="portfolio-section">
          <div className="portfolio-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading number="02" label="Education" title="Learning in progress." />
            <div className="portfolio-reveal relative border-l border-border">
              {education.map((item, index) => (
                <article
                  key={item.degree}
                  className="relative pb-9 pl-7 last:pb-0 sm:pl-9"
                >
                  <span className="absolute -left-[0.3rem] top-1 size-[0.58rem] rounded-full border-2 border-primary bg-background" />
                  <p className="font-mono text-xs text-primary">{item.period}</p>
                  <h3 className="mt-2 text-base font-semibold text-foreground sm:text-lg">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.school}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.focus}</p>
                  {index === 0 && (
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[0.68rem] text-primary">
                      CURRENT
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="portfolio-section">
          <div className="portfolio-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading number="03" label="Experience" title="Growing through people." />
            <article className="portfolio-reveal flex gap-5 border-b border-border pb-7">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-border bg-card text-primary">
                <BriefcaseBusiness aria-hidden="true" size={19} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs text-primary">17 AUG 2026 — 17 SEP 2026</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  Campus Ambassador / Campus Relations
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">MyCaptain</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Supported student outreach as part of a campus ambassador role focused on
                  marketing and business development.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="portfolio-section">
          <div className="portfolio-shell">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <SectionHeading number="04" label="Selected projects" title="Work in progress. Built to learn." />
              <a
                className="portfolio-link-underline portfolio-reveal mb-1 inline-flex items-center gap-2 text-sm text-muted-foreground underline"
                href="https://github.com/HelpingHands4u"
                target="_blank"
                rel="noreferrer"
              >
                More on GitHub <ArrowRight aria-hidden="true" size={16} />
              </a>
            </div>
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.number}
                  className="portfolio-reveal group flex min-h-72 flex-col bg-background p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-primary">PROJECT / {project.number}</span>
                    <span className="rounded-sm border border-border px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-8 font-mono text-xs text-muted-foreground">{project.type}</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span key={tag} className="portfolio-skill-tag px-2.5 py-1 font-mono text-[0.68rem] text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    className="portfolio-social-link mt-auto w-fit pt-7 text-sm text-foreground"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub <ExternalLink aria-hidden="true" size={15} />
                  </a>
                </article>
              ))}
              <a
                className="portfolio-reveal group flex min-h-72 flex-col justify-between bg-card p-6 transition-colors hover:bg-secondary/50 sm:p-8"
                href="https://github.com/HelpingHands4u"
                target="_blank"
                rel="noreferrer"
              >
                <span className="font-mono text-xs text-muted-foreground">NEXT / ON GITHUB</span>
                <span>
                  <span className="mb-3 flex size-11 items-center justify-center rounded-sm border border-border text-primary">
                    <Github aria-hidden="true" size={20} />
                  </span>
                  <span className="block text-xl font-semibold text-foreground">
                    More projects &amp; experiments
                  </span>
                  <span className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    Explore my GitHub <ArrowRight aria-hidden="true" size={15} />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="portfolio-section">
          <div className="portfolio-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading number="05" label="Skills" title="Foundations & interests." />
            <div className="portfolio-reveal grid gap-8 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-4 text-sm font-medium text-foreground">{group.title}</h3>
                  <ul className="space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <ChevronRight aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={16} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="sm:col-span-2">
                <h3 className="mb-4 text-sm font-medium text-foreground">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["Telugu", "English", "Hindi", "Bengali"].map((language) => (
                    <span key={language} className="portfolio-skill-tag px-3 py-1.5 text-sm text-secondary-foreground">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="achievements" className="portfolio-section">
          <div className="portfolio-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionHeading number="06" label="Achievement" title="A moment worth remembering." />
            <div className="portfolio-reveal flex items-center gap-5 border-y border-border py-7">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-primary/25 bg-primary/10 text-primary">
                <Award aria-hidden="true" size={22} />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Hackathon Winner</h3>
                <p className="mt-1 text-sm text-muted-foreground">Simu Code Pro</p>
              </div>
              <Check aria-hidden="true" className="ml-auto text-primary" size={19} />
            </div>
          </div>
        </section>

        <section id="contact" className="portfolio-section pb-24">
          <div className="portfolio-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="portfolio-reveal">
              <SectionHeading number="07" label="Contact" title="Let’s talk about what’s next." />
              <p className="mt-6 max-w-md leading-7 text-muted-foreground">
                Open to conversations about student opportunities, thoughtful projects, and learning
                from people building useful technology.
              </p>
              <a
                className="portfolio-link-underline mt-7 inline-flex max-w-full items-center gap-2 break-all text-sm text-foreground underline"
                href="mailto:shahindeveloper78@gmail.com"
              >
                <Mail aria-hidden="true" className="shrink-0 text-primary" size={17} />
                shahindeveloper78@gmail.com
              </a>
              <SocialLinks className="mt-6" />
            </div>

            <form
              className="portfolio-reveal space-y-5"
              onSubmit={handleContactSubmit}
              noValidate
              aria-label="Send a message"
            >
              <div className="portfolio-hidden-field" aria-hidden="true">
                <Label htmlFor="contact-company">Company</Label>
                <Input
                  id="contact-company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="portfolio-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className="portfolio-input min-h-11"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                  disabled={formStatus === "sending"}
                />
                {fieldErrors.name && (
                  <p id="contact-name-error" className="text-sm text-destructive">{fieldErrors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  className="portfolio-input min-h-11"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                  disabled={formStatus === "sending"}
                />
                {fieldErrors.email && (
                  <p id="contact-email-error" className="text-sm text-destructive">{fieldErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  minLength={10}
                  maxLength={3000}
                  required
                  className="portfolio-input min-h-36 resize-y"
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                  disabled={formStatus === "sending"}
                />
                <div className="flex justify-between gap-3 text-xs text-muted-foreground">
                  {fieldErrors.message ? (
                    <p id="contact-message-error" className="text-sm text-destructive">{fieldErrors.message}</p>
                  ) : (
                    <span>At least 10 characters</span>
                  )}
                  <span>Up to 3,000 characters</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Button type="submit" size="lg" disabled={formStatus === "sending"}>
                  {formStatus === "sending" ? "Sending…" : "Send Message"}
                  {formStatus === "sending" ? (
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                  ) : (
                    <Send aria-hidden="true" />
                  )}
                </Button>
                <p
                  aria-live="polite"
                  className={`text-sm ${formStatus === "success" ? "text-primary" : "text-muted-foreground"}`}
                >
                  {formMessage}
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="portfolio-shell flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Mohammad Shahinuddin Molla</p>
          <SocialLinks />
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top <ArrowDownRight aria-hidden="true" className="-rotate-90" size={15} />
          </a>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) {
  return (
    <div className="portfolio-reveal">
      <p className="portfolio-section-label">
        <span>{number}</span> {label}
      </p>
      <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          className="portfolio-social-link text-sm"
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
        >
          <Icon aria-hidden="true" size={17} />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}