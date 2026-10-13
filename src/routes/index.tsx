import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { HeroArt, InterfacePreview } from "@/components/portfolio/TechArt";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aditya Singh — Portfolio" },
      { name: "description", content: "Aditya Singh, first-year B.Tech Computer Science student at JECRC University, Jaipur. Learning, building, documenting." },
      { property: "og:title", content: "Aditya Singh — Portfolio" },
      { property: "og:description", content: "Curious by nature. Built to create. The portfolio of a first-year CSE student at JECRC University." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ——— Editable contact placeholders: replace null with your real details ——— */
const CONTACT: { label: string; value: string | null; href: (v: string) => string }[] = [
  { label: "Email", value: "adirajput987139916@gmail.com", href: (v) => `mailto:${v}` },
  { label: "GitHub", value: "https://github.com/adityasingh05x", href: (v) => v },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/aditya-singh-49178042b", href: (v) => v },
];

const NAV = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Contact", "contact"],
] as const;

function Reveal({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}

function SectionHead({ label, title }: { label: string; title: ReactNode }) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-12">
      <p className="label-mono md:col-span-3 md:pt-4">
        <span className="text-primary">■</span> {label}
      </p>
      <h2 className="font-display text-[2.6rem] uppercase leading-[1] tracking-[0.012em] sm:text-6xl md:col-span-9 lg:text-7xl xl:text-[5.5rem]">{title}</h2>
    </Reveal>
  );
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 border-t px-5 py-24 sm:px-8 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </section>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a href="#top" className="font-mono text-xs tracking-[0.2em]">
          ADITYA <span className="text-primary">/</span> PORTFOLIO
        </a>
        <nav className="hidden gap-8 md:flex" aria-label="Main">
          {NAV.map(([l, id], i) => (
            <a key={id} href={`#${id}`} className="link-line font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground">
              <span className="text-primary/70">0{i + 1}</span> {l}
            </a>
          ))}
        </nav>
        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-px w-6 bg-foreground transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-6 bg-foreground transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
      {open && (
        <nav className="border-t bg-background px-5 py-4 md:hidden" aria-label="Mobile">
          {NAV.map(([l, id], i) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b py-4 font-display text-3xl uppercase last:border-0">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-10 pt-24 sm:px-8 lg:px-14">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label-mono mb-8 flex items-center gap-3">
            <span className="hidden h-px w-8 bg-primary sm:block" /> Computer Science / Jaipur, India
          </p>
          <h1 className="font-display text-[15vw] uppercase leading-[0.98] tracking-[0.012em] sm:text-[11.5vw] lg:text-[7.4vw] xl:text-[7.25rem]">
            Curious by
            <br />
            <span className="text-outline">Nature.</span>
            <br />
            Built to
            <br />
            Create<span className="text-primary">.</span>
          </h1>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[380px] opacity-90 lg:col-span-5 lg:max-w-[440px] lg:justify-self-end">
          <HeroArt />
        </div>
      </div>
      <div className="relative mx-auto mt-10 grid w-full max-w-[1400px] gap-8 border-t pt-8 md:grid-cols-12">
        <p className="max-w-lg text-lg leading-[1.7] text-muted-foreground md:col-span-6">
          I'm <span className="text-foreground">Aditya Singh</span>, a first-year Computer Science Engineering student at JECRC University. I'm learning programming, strengthening my problem-solving skills, and exploring how ideas become useful software.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:items-start md:justify-end">
          <a href="#projects" className="inline-flex h-12 items-center justify-center bg-primary px-6 font-mono text-xs tracking-[0.15em] text-primary-foreground transition-transform hover:-translate-y-0.5">
            EXPLORE PROJECTS ↘
          </a>
          <a href="#contact" className="inline-flex h-12 items-center justify-center border border-foreground/40 px-6 font-mono text-xs tracking-[0.15em] transition-colors hover:border-primary hover:text-primary">
            LET'S CONNECT ↗
          </a>
        </div>
      </div>
      <a href="#about" aria-label="Scroll to about" className="relative mx-auto mt-10 hidden flex-col items-center gap-2 md:flex">
        <span className="relative h-9 w-px overflow-hidden bg-line">
          <span className="anim-scroll absolute left-0 top-0 h-2 w-px bg-primary" />
        </span>
        <span className="label-mono">Scroll</span>
      </a>
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <SectionHead label="01 / The Thinking" title={<>The journey starts<br /><span className="text-outline">before</span> the breakthrough.</>} />
      <div className="mt-16 grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3 md:col-start-4">
          <p className="font-display text-2xl uppercase leading-[1.15] tracking-[0.02em] text-primary">Learning in public, one fundamental at a time.</p>
        </Reveal>
        <Reveal className="max-w-prose space-y-6 text-lg leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8">
          <p>I'm at the beginning of my computer science journey — the stage where every concept is new and every small program teaches something.</p>
          <p>Right now I'm focused on programming fundamentals: how code is structured, how logic flows, and how to break a problem into steps a computer can follow.</p>
          <p>Alongside coursework, I'm exploring technology with curiosity and building practical skills slowly and honestly. This site is where I'll document that progress.</p>
        </Reveal>
      </div>
    </Section>
  );
}

const SKILLS = [
  { n: "C", level: "Beginner", note: "Fundamentals in progress" },
  { n: "Python", level: "Beginner", note: "Fundamentals in progress" },
  { n: "Problem Solving", level: "Learning area", note: "Breaking problems into logical steps" },
  { n: "Programming Fundamentals", level: "Learning area", note: "Variables, control flow, functions" },
];

function Skills() {
  return (
    <Section id="skills">
      <SectionHead label="02 / The Toolkit" title={<>Learning the<br />fundamentals.</>} />
      <ul className="mt-16 border-t">
        {SKILLS.map((s, i) => (
          <Reveal as="li" key={s.n} className="group grid grid-cols-12 items-baseline gap-4 border-b py-7 transition-colors hover:bg-surface md:py-9">
              <span className="col-span-2 font-mono text-xs text-muted-foreground md:col-span-1 md:pl-2">0{i + 1}</span>
              <span className="col-span-10 font-display text-[2rem] uppercase leading-none tracking-[0.015em] transition-colors group-hover:text-primary sm:text-4xl md:col-span-6 md:text-5xl">{s.n}</span>
              <span className="label-mono col-span-10 col-start-3 md:col-span-2 md:col-start-auto">{s.level}</span>
              <span className="col-span-10 col-start-3 text-base text-muted-foreground md:col-span-3 md:col-start-auto">{s.note}</span>
          </Reveal>
        ))}
      </ul>
      <Reveal>
        <p className="label-mono mt-8">Next on the horizon — to be explored, not yet learned: web fundamentals · data structures</p>
      </Reveal>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <SectionHead label="03 / Selected Work" title={<>Ideas deserve<br />to be <span className="text-outline">built.</span></>} />
      <Reveal className="mt-16 grid border md:grid-cols-12">
        <div className="relative border-b bg-surface p-6 md:col-span-7 md:border-b-0 md:border-r md:p-10">
          <span className="label-mono absolute left-6 top-6 md:left-10 md:top-8">Fig.02 — Interface</span>
          <div className="pt-8"><InterfacePreview /></div>
        </div>
        <div className="flex flex-col justify-between gap-10 p-6 md:col-span-5 md:p-10">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">P/001</span>
              <span className="inline-flex items-center gap-2 border border-primary px-3 py-1 font-mono text-[0.65rem] tracking-[0.15em] text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> IN PROGRESS
              </span>
            </div>
            <h3 className="mt-8 font-display text-4xl uppercase md:text-5xl">Personal Portfolio</h3>
            <p className="mt-5 leading-relaxed text-muted-foreground">My first personal website, documenting my learning journey, technical interests, and future projects.</p>
          </div>
          <p className="label-mono">You're looking at it.</p>
        </div>
      </Reveal>
      <Reveal className="mt-6 grid gap-6 border border-dashed border-line p-8 md:grid-cols-12 md:p-12">
        <span className="font-display text-7xl text-outline md:col-span-3">P/002</span>
        <div className="md:col-span-6">
          <p className="label-mono mb-3">Reserved slot</p>
          <p className="text-lg leading-relaxed text-muted-foreground">More projects will appear here as I continue learning and building. Each one will be real, finished, and documented honestly.</p>
        </div>
      </Reveal>
    </Section>
  );
}

function Education() {
  const rows = [
    ["Degree", "B.Tech — Computer Science Engineering"],
    ["Institution", "JECRC University"],
    ["Location", "Jaipur, Rajasthan, India"],
    ["Current Stage", "First Year"],
  ];
  return (
    <Section id="education">
      <SectionHead label="04 / The Journey" title={<>Building the<br />foundation.</>} />
      <div className="mt-16 grid gap-10 md:grid-cols-12">
        <Reveal className="relative md:col-span-3">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 bg-primary" />
            <span className="label-mono text-primary">Now</span>
          </div>
          <div className="ml-[5px] mt-3 hidden h-40 w-px bg-gradient-to-b from-primary to-transparent md:block" />
        </Reveal>
        <Reveal className="md:col-span-9">
          <dl className="border-t">
            {rows.map(([k, v]) => (
              <div key={k} className="grid gap-2 border-b py-6 sm:grid-cols-3">
                <dt className="label-mono pt-1">{k}</dt>
                <dd className="text-xl sm:col-span-2 md:text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications">
      <SectionHead label="— / Certifications & Achievements" title={<>The record<br /><span className="text-outline">begins here.</span></>} />
      <Reveal className="mt-16 grid gap-6 border-y py-10 md:grid-cols-12 md:py-14">
        <span className="label-mono md:col-span-3">Status — Empty by design</span>
        <p className="max-w-xl text-lg leading-[1.7] text-muted-foreground md:col-span-7">
          No certifications or achievements listed yet. Genuine ones will be added here as they're earned — nothing is shown that hasn't happened.
        </p>
      </Reveal>
    </Section>
  );
}

function LinkText({ value }: { value: string }) {
  const parts = value.split("/");
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <wbr />}
        </Fragment>
      ))}
      {" ↗"}
    </>
  );
}

function Contact() {
  return (
    <Section id="contact">
      <SectionHead label="05 / The Next Conversation" title={<>Good ideas<br />deserve to be <span className="text-primary">built.</span></>} />
      <div className="mt-16 grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-4 md:col-start-4">
          <p className="text-lg leading-relaxed text-muted-foreground">Open to conversations, study groups, and collaborating on small projects while I learn. Say hello.</p>
        </Reveal>
        <Reveal className="md:col-span-5">
          <ul className="border-t">
            {CONTACT.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-4 border-b py-6">
                <span className="label-mono">{c.label}</span>
                {c.value ? (
                  <a href={c.href(c.value)} target={c.label === "Email" ? undefined : "_blank"} rel="noreferrer" className="link-line min-w-0 break-words text-lg text-right">
                    <LinkText value={c.value} />
                  </a>
                ) : (
                  <span className="font-mono text-sm text-muted-foreground/70">Not added yet</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function Footer() {
  const socials = CONTACT.filter((c) => c.value);
  return (
    <footer className="border-t px-5 py-10 sm:px-8 lg:px-14">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <a href="#top" className="font-mono text-xs tracking-[0.2em]">ADITYA <span className="text-primary">/</span> PORTFOLIO</a>
        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
          {NAV.map(([l, id]) => (
            <a key={id} href={`#${id}`} className="link-line font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground">{l}</a>
          ))}
          {socials.map((c) => (
            <a key={c.label} href={c.href(c.value!)} target={c.label === "Email" ? undefined : "_blank"} rel="noreferrer" className="link-line font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground">{c.label}</a>
          ))}
        </nav>
        <span className="label-mono">© {new Date().getFullYear()} Aditya Singh</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
