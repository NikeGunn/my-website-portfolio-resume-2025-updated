import React, { Suspense, lazy } from "react";
import Thesis from "../components/Thesis";
import Footer from "../components/Footer";

const ChatComponent = lazy(() => import("../components/chat/ChatComponent"));

const LINKS = [
  { label: "GitHub", href: "https://github.com/NikeGunn" },
  { label: "Hugging Face", href: "https://huggingface.co/Haubaa" },
  { label: "ORCID", href: "https://orcid.org/0009-0008-9603-8746" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bhagatnikhil/" },
];

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Ask Hauba", href: "#ask" },
];

const EXPERIENCE = [
  {
    period: "Oct 2024 – now",
    role: "Lead Senior AI Engineer (contract)",
    org: "Kribaat, Kathmandu",
    points: [
      "Autonomous customer-service agents for real estate agencies and restaurants, in Nepali, Romanized Nepali, English and Chinese. A verification gate checks every price, listing ID and booking code against live tool results before a reply is sent.",
      "Fixed a production language-drift incident with per-user reply-language state, a three-locale message catalog and a rewrite guard that preserves figures, dates and negation.",
      "Rehearsal Lab: an offline evaluation and reinforcement-learning environment where agents replay seeded bookkeeping scenarios, are scored by a deterministic judge and must beat production before human approval.",
    ],
  },
  {
    period: "Jun 2022 – now",
    role: "Senior Backend Engineer (contract)",
    org: "CineArtLink, Hong Kong (remote)",
    points: [
      "Lead backend for a professional network of film, media and theatre talent on Django REST Framework.",
      "Docker microservices, engagement-based feed ranking, JWT auth, Redis caching and GitHub Actions CI/CD. Planning the move from Heroku to AWS and mentoring junior developers on test-driven development.",
    ],
  },
  {
    period: "Feb 2020 – Dec 2025",
    role: "Independent contract engineer",
    org: "Clients in Japan, Hong Kong, Italy, the Philippines and Nepal",
    points: [
      "Real-time GPS multiplayer game backend with PostGIS geofencing (Japan). Bilingual RAG assistant for Nepal Financial Reporting Standards (Nepal). Short-video community backend for 10k+ users (Hong Kong). WebSocket reliability fixes for a real-time Kanban board (Philippines).",
    ],
  },
];

const PROJECTS = [
  {
    name: "NyayaSathi",
    href: "https://nyaya.kribaat.com",
    what: "Offline legal research assistant for Nepali advocates over 330 Supreme Court judgments and 7 statutes.",
    proof: "0 fabricated citations on an adversarial set; Recall@5 0.968; runs on an 8 GB laptop",
  },
  {
    name: "HisabKitab",
    href: "https://hisabkitab.pro",
    what: "WhatsApp-native AI accountant for VAT-registered businesses. Reads bills from photos, applies Nepal VAT and TDS in exact integer paisa, saves only after the owner confirms.",
    proof: "TypeScript microservices; MCP tool servers; about 1,600 tests in CI",
  },
  {
    name: "AgentGuard",
    href: "https://agentguard.space",
    what: "Zero-trust security sidecar for AI coding agents. Inspects MCP and A2A tool calls for prompt injection, tool poisoning and secret leakage.",
    proof: "Go, MIT licensed; under 5 ms p99 overhead; cosign-signed releases",
  },
  {
    name: "PalikaBook",
    href: null,
    what: "Anti-corruption evidence platform for Nepal's 753 local governments. Anonymous, tamper-proof video evidence with a court-ready chain of custody.",
    proof: "Go, Flutter, Next.js; Merkle-root verification; demo on request",
  },
  {
    name: "SANU",
    href: "https://huggingface.co/Haubaa/SANU-AI-7B-v0.1-GGUF",
    what: "Nepali-English fine-tune of Qwen2.5-7B with QLoRA, released as GGUF for local inference. Its failures on legal questions led to NEPVERSA.",
    proof: "QLoRA 4-bit NF4; Ollama and llama.cpp",
  },
  {
    name: "AutoGPT contribution",
    href: "https://github.com/Significant-Gravitas/AutoGPT/pull/11618",
    what: "Merged pull request replacing a multiprocessing queue with a thread-safe queue, removing per-execution subprocess spawning.",
    proof: "Merged upstream; PR #11618",
  },
];

const SKILLS = [
  ["AI and ML", "LLM agents, tool calling, MCP, RAG, dense and BM25 retrieval, fine-tuning (QLoRA, LoRA), GRPO, evaluation and guardrails, PyTorch, Hugging Face, LangChain"],
  ["Research", "Low-resource and legal NLP, benchmark construction, evaluation design, reproducible pipelines"],
  ["Backend", "Python, Go, TypeScript, Django, FastAPI, Node.js, PostgreSQL, PostGIS, Redis, Kafka, NATS"],
  ["Infrastructure", "Docker, Kubernetes, AWS, Terraform, GitHub Actions, Linux"],
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-rule py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
        <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-panel focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 font-sans sm:px-8">
          <a href="#top" className="shrink-0 font-bold tracking-tight text-ink no-underline">
            Nikhil Bhagat
          </a>
          <ul className="flex min-w-0 gap-5 overflow-x-auto text-[0.92rem] [scrollbar-width:none]">
            {NAV.map((item) => (
              <li key={item.href} className="shrink-0">
                <a href={item.href} className="text-muted no-underline hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-8">
        <section id="top" className="pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className="mb-10 flex items-center gap-4 font-sans">
            <img
              src="https://github.com/NikeGunn/imagess/blob/main/nikhil-devops.png?raw=true"
              alt="Portrait of Nikhil Bhagat"
              width="56"
              height="56"
              className="h-14 w-14 rounded-full border border-rule object-cover"
            />
            <p className="leading-tight">
              <span className="block font-semibold text-ink">Nikhil Bhagat</span>
              <span className="text-muted">AI/ML engineer and NLP researcher, Biratnagar, Nepal</span>
            </p>
          </div>

          <Thesis />

          <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-measure text-lg text-muted">
              Six years building production backends, machine learning and
              generative AI systems for clients in Hong Kong, Japan, Italy, the
              Philippines and Nepal. My research is on retrieval, evaluation and
              guardrails that keep large language models truthful in
              low-resource languages.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-sans">
              <a
                href="/nikhil-resume.pdf"
                className="rounded-full bg-accent px-5 py-2.5 font-semibold text-[color:var(--accent-ink)] no-underline hover:brightness-110"
              >
                Download resume
              </a>
              <a href="mailto:programmer@nikhilbhagat.com.np" className="font-semibold">
                Email me
              </a>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-sans text-[0.92rem]">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Section id="work" title="Work">
          <ol className="space-y-12">
            {EXPERIENCE.map((job) => (
              <li key={job.role} className="grid gap-2 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
                <p className="font-sans text-[0.92rem] text-muted sm:pt-1">{job.period}</p>
                <div className="max-w-measure">
                  <h3 className="text-lg font-semibold leading-snug">{job.role}</h3>
                  <p className="font-sans text-muted">{job.org}</p>
                  <ul className="mt-4 space-y-3">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li className="grid gap-2 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
              <p className="font-sans text-[0.92rem] text-muted sm:pt-1">2025</p>
              <div className="max-w-measure">
                <h3 className="text-lg font-semibold leading-snug">Bachelor of Computer Application</h3>
                <p className="font-sans text-muted">Tribhuvan University, Mahendra Morang Adarsh Multiple Campus</p>
              </div>
            </li>
          </ol>
        </Section>

        <Section id="research" title="Research">
          <article className="max-w-measure">
            <h3 className="text-xl font-semibold leading-snug">
              NEPVERSA: a version-aware Nepali statutory retrieval benchmark
              derived from amendment footnotes
            </h3>
            <p className="mt-2 font-sans text-[0.92rem] text-muted">
              Bhagat, N. (2026). Preprint, Zenodo. Under review at ACM TALLIP.
              Mentor: Prof. Achut Raj Kattel, Tribhuvan University.
            </p>
            <p className="mt-5">
              Laws change, and a legal assistant that answers with last year's
              text is confidently wrong. NEPVERSA asks retrieval systems what a
              provision said on a given date: 455 provisions from 5 Acts, 99
              amendment operations and 181 point-in-time questions, of which
              61.3% expect the system to abstain. Gold answers come from the
              amendment footnotes themselves, not from an LLM judge.
            </p>
            <p className="mt-4">
              Recovering that history meant reading scanned Gazette notices and
              PDFs that extract to corrupted Unicode. I found 7 silent extraction
              defects, pinned each with mutation-tested regression tests, and
              shipped a one-command reproduction that re-verifies every
              published number by SHA-256.
            </p>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-sans">
              <a href="https://doi.org/10.5281/zenodo.22916911" target="_blank" rel="noopener noreferrer">
                Read the preprint
              </a>
              <a href="https://github.com/NikeGunn/nyasathi-reserch" target="_blank" rel="noopener noreferrer">
                Code and data
              </a>
            </p>
          </article>
        </Section>

        <Section id="projects" title="Projects">
          <ul className="divide-y divide-rule border-y border-rule">
            {PROJECTS.map((project) => (
              <li key={project.name} className="grid gap-2 py-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
                <h3 className="font-semibold leading-snug">
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <div className="max-w-measure">
                  <p>{project.what}</p>
                  <p className="mt-2 font-sans text-[0.9rem] text-muted">{project.proof}</p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-12 space-y-4 font-sans text-[0.95rem]">
            {SKILLS.map(([area, list]) => (
              <div key={area} className="grid gap-1 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
                <dt className="font-semibold">{area}</dt>
                <dd className="max-w-measure text-muted">{list}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="resume" title="Resume">
          <div className="grid gap-8 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:items-start">
            <a href="/nikhil-resume.pdf" className="block" aria-label="Open the resume PDF">
              <img
                src="/nikhil-resume-preview.png"
                alt="First page of Nikhil Bhagat's resume"
                width="798"
                height="1033"
                loading="lazy"
                className="w-full rounded border border-rule bg-panel shadow-[0_1px_0_var(--rule)]"
              />
            </a>
            <div className="max-w-measure">
              <p>
                Two pages: research, experience, projects and skills. Updated
                October 2026.
              </p>
              <p className="mt-6 font-sans">
                <a
                  href="/nikhil-resume.pdf"
                  className="rounded-full bg-accent px-5 py-2.5 font-semibold text-[color:var(--accent-ink)] no-underline hover:brightness-110"
                >
                  Download resume (PDF)
                </a>
              </p>
            </div>
          </div>
        </Section>

        <Section id="ask" title="Ask Hauba">
          <p className="mb-8 max-w-measure text-muted">
            Hauba is an assistant trained on my work. Ask it about a project,
            the stack behind it, or whether I fit your role.
          </p>
          <Suspense
            fallback={
              <p className="font-sans text-muted" role="status">
                Loading the chat…
              </p>
            }
          >
            <ChatComponent />
          </Suspense>

          <details className="group mt-12 border-t border-rule pt-6 font-sans">
            <summary className="cursor-pointer font-semibold text-ink">
              Play a small game I made: a hiring manager chasing me across a 3D city
            </summary>
            <iframe
              src="/game/index.html"
              title="Hiring Manager Catching Nikhil, a browser game"
              className="mt-6 h-[420px] w-full rounded border border-rule sm:h-[500px]"
              loading="lazy"
            />
          </details>
        </Section>
      </main>

      <Footer links={LINKS} />
    </div>
  );
}
