import { useState, useEffect, useRef } from "react";

// ─── SEO META (inject into index.html for production) ─────────────────────────
// <title>Muthu Madasamy | DevOps Engineer – Kubernetes, AWS, CI/CD, Terraform</title>
// <meta name="description" content="DevOps Engineer specializing in Kubernetes, AWS, Azure, Terraform, GitOps and AIOps. 2+ years building production-grade CI/CD pipelines." />
// <meta name="keywords" content="DevOps Engineer, Kubernetes, AWS, CI/CD, Terraform, Docker, ArgoCD, GitOps, AIOps" />

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
  { cat: "Cloud", items: ["AWS", "Azure", "Terraform"] },
  { cat: "Containers", items: ["Docker", "Kubernetes"] },
  { cat: "CI/CD", items: ["GitHub Actions", "ArgoCD", "GitOps"] },
  { cat: "Monitoring", items: ["Prometheus", "Grafana", "New Relic"] },
  { cat: "Config Mgmt", items: ["Ansible", "ConfigMaps", "Secrets"] },
  { cat: "Security", items: ["Trivy", "OWASP"] },
  { cat: "Networking", items: ["DNS", "HTTP/HTTPS", "Load Balancing", "NGINX"] },
  { cat: "OS & VCS", items: ["Linux (Ubuntu)", "Git", "GitHub", "Docker Hub"] },
];

const EXPERIENCE = [
  {
    role: "Associate Cloud Engineer II",
    company: "PowerSchool",
    period: "Dec 2024 – Present",
    current: true,
    tags: ["Azure", "Ansible", "New Relic", "Linux"],
    points: [
      { text: "Orchestrated Azure & Linux VM fleet supporting Java workloads at 99.9% availability across production environments", metric: "99.9% uptime" },
      { text: "Eliminated ~60% of manual deployment effort by engineering Ansible playbooks for end-to-end configuration automation", metric: "60% faster" },
      { text: "Delivered zero-downtime upgrades via OTT tooling — protecting production SLAs through structured, gated releases", metric: "0 outages" },
      { text: "Proactively detected and resolved 15+ performance bottlenecks using New Relic dashboards before they reached users", metric: "Proactive ops" },
    ],
  },
  {
    role: "Cloud Engineer",
    company: "LTIMindtree",
    period: "Sep 2023 – Oct 2024",
    current: false,
    tags: ["Azure", "ServiceNow", "ITIL", "VM Patching"],
    points: [
      { text: "Maintained Azure cloud operations across multi-tenant environments, consistently meeting SLA targets under peak load", metric: "SLA compliant" },
      { text: "Reduced mean time to resolution by triaging, patching, and troubleshooting VMs via structured runbooks at scale", metric: "Faster MTTR" },
      { text: "Processed 100+ monthly service requests via ServiceNow following ITIL best practices — zero escalations", metric: "100+ tickets/mo" },
    ],
  },
];

const PROJECT_STACK = [
  "Kubernetes", "Docker", "Terraform", "Ansible",
  "GitHub Actions", "ArgoCD", "Prometheus", "Grafana",
  "AWS EC2", "NGINX Ingress", "MySQL", "AI Log Analysis",
];

const IMPACT_METRICS = [
  { value: "~60%", label: "Deployment Time Cut", sub: "Ansible + ArgoCD automation", icon: "⚡" },
  { value: "Zero", label: "Downtime Releases", sub: "GitOps self-healing pipelines", icon: "🛡️" },
  { value: "6-Step", label: "Full CI/CD Pipeline", sub: "Infra → Scan → Push → Deploy", icon: "🔄" },
  { value: "100%", label: "Auto Rollback", sub: "ArgoCD self-heal on any drift", icon: "🚀" },
];

const SCREENSHOTS = [
  {
    title: "Grafana Observability",
    desc: "Real-time metrics: CPU, memory, pod health & custom backend endpoints",
    color: "#f59e0b",
    icon: "📊",
    preview: [
      { label: "CPU Usage", val: "23%", color: "#22c55e" },
      { label: "Memory", val: "61%", color: "#f59e0b" },
      { label: "Pods Running", val: "6/6", color: "#22c55e" },
      { label: "Alerts Fired", val: "0", color: "#22c55e" },
    ],
  },
  {
    title: "ArgoCD GitOps",
    desc: "Auto-sync ON — manifest drift triggers instant self-heal & rollback",
    color: "#38bdf8",
    icon: "☸️",
    preview: [
      { label: "App Health", val: "Healthy", color: "#22c55e" },
      { label: "Sync Status", val: "Synced", color: "#22c55e" },
      { label: "Auto-Sync", val: "ON", color: "#38bdf8" },
      { label: "Self-Heal", val: "ON", color: "#38bdf8" },
    ],
  },
  {
    title: "GitHub Actions CI",
    desc: "Build → Trivy Scan → Docker Push → Manifest Update — all automated",
    color: "#a78bfa",
    icon: "✅",
    preview: [
      { label: "Build", val: "✓ Pass", color: "#22c55e" },
      { label: "Trivy Scan", val: "✓ Clean", color: "#22c55e" },
      { label: "Push (SHA)", val: "✓ Done", color: "#22c55e" },
      { label: "ArgoCD Deploy", val: "✓ Live", color: "#22c55e" },
    ],
  },
];

const PIPELINE = [
  { step: "Infrastructure", icon: "🏗️", desc: "Terraform provisions AWS EC2 Kubernetes cluster with modular, reusable configs" },
  { step: "Build", icon: "🔨", desc: "GitHub Actions triggers on push — builds optimized multi-stage Docker images" },
  { step: "Scan", icon: "🛡️", desc: "Trivy + OWASP scan every image for CVEs — blocks unsafe builds automatically" },
  { step: "Push", icon: "📦", desc: "Images tagged with commit SHA + latest, pushed to Docker Hub with version pinning" },
  { step: "Git Update", icon: "🔄", desc: "Kubernetes manifests updated automatically with new image tag in the repo" },
  { step: "ArgoCD Deploy", icon: "🚀", desc: "ArgoCD detects manifest change, auto-syncs and self-heals — zero manual touch" },
];

export default function App() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [copied, setCopied] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [e.target.id]: true }));
            setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  // Auto-rotate screenshots
  useEffect(() => {
    const t = setInterval(() => setActiveScreenshot((p) => (p + 1) % SCREENSHOTS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const setRef = (id) => (el) => { sectionRefs.current[id] = el; };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const fadeIn = (id) =>
    `transition-all duration-700 ${visibleSections[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Muthumadasamy42@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", background: "#050b14", color: "#e2e8f0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Syne:wght@400;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050b14; }
        ::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 2px; }

        .hero-glow { background: radial-gradient(ellipse 70% 55% at 50% -5%, rgba(56,189,248,0.22) 0%, transparent 70%); }

        .card {
          background: rgba(15,23,42,0.85);
          border: 1px solid rgba(56,189,248,0.15);
          border-radius: 12px;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          border-color: rgba(56,189,248,0.45);
          transform: translateY(-3px);
          box-shadow: 0 0 36px rgba(56,189,248,0.1);
        }

        .badge {
          background: rgba(56,189,248,0.1);
          border: 1px solid rgba(56,189,248,0.3);
          color: #38bdf8;
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s;
          display: inline-block;
        }
        .badge:hover { background: rgba(56,189,248,0.2); border-color: #38bdf8; }

        .badge-green {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          color: #22c55e;
          border-radius: 6px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 700;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0ea5e9, #3b82f6);
          border: none;
          border-radius: 8px;
          padding: 12px 26px;
          color: white;
          font-family: inherit;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(14,165,233,0.4); }
        .btn-primary:hover::after { opacity: 1; }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          background: transparent;
          border: 1px solid rgba(56,189,248,0.4);
          border-radius: 8px;
          padding: 12px 26px;
          color: #38bdf8;
          font-family: inherit;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-ghost:hover { background: rgba(56,189,248,0.1); border-color: #38bdf8; transform: translateY(-2px); }

        .btn-download {
          background: linear-gradient(135deg, #059669, #10b981);
          border: none;
          border-radius: 8px;
          padding: 12px 26px;
          color: white;
          font-family: inherit;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.5px;
        }
        .btn-download:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(16,185,129,0.35); }

        .terminal { background: #070f1e; border: 1px solid rgba(56,189,248,0.2); border-radius: 10px; }
        .terminal-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }

        .pipeline-arrow { color: #38bdf8; font-size: 20px; line-height: 1; }

        .nav-link {
          background: none;
          border: none;
          color: #94a3b8;
          font-family: inherit;
          font-size: 13px;
          cursor: pointer;
          padding: 6px 14px;
          border-radius: 6px;
          transition: all 0.2s;
          font-weight: 500;
        }
        .nav-link.active, .nav-link:hover { color: #38bdf8; background: rgba(56,189,248,0.08); }

        .section-label { font-size: 11px; font-weight: 700; letter-spacing: 3px; color: #38bdf8; text-transform: uppercase; margin-bottom: 8px; }
        .section-title { font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800; color: #f1f5f9; line-height: 1.15; }

        .ai-badge {
          background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(56,189,248,0.2));
          border: 1px solid rgba(139,92,246,0.5);
          border-radius: 20px;
          padding: 5px 16px;
          font-size: 11px;
          font-weight: 700;
          color: #c4b5fd;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .timeline-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 10px rgba(56,189,248,0.5);
          flex-shrink: 0;
          margin-top: 5px;
        }

        .glow-text {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .metric-card {
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 12px;
          padding: 24px 20px;
          text-align: center;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .metric-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #0ea5e9, #818cf8);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .metric-card:hover { border-color: rgba(56,189,248,0.4); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(56,189,248,0.1); }
        .metric-card:hover::before { opacity: 1; }

        .screenshot-tab {
          background: rgba(15,23,42,0.6);
          border: 1px solid rgba(56,189,248,0.15);
          border-radius: 8px;
          padding: 10px 16px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
        }
        .screenshot-tab.active { background: rgba(56,189,248,0.12); border-color: rgba(56,189,248,0.4); color: #38bdf8; }
        .screenshot-tab:hover { color: #38bdf8; border-color: rgba(56,189,248,0.3); }

        .exp-metric {
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 6px;
          padding: 2px 10px;
          font-size: 10px;
          font-weight: 700;
          color: #38bdf8;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .credibility-bar {
          display: inline-flex;
          align-items: center;
          gap: 0;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 100px;
          padding: 8px 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .cred-item { color: #94a3b8; font-size: 12px; font-weight: 600; padding: 0 12px; white-space: nowrap; }
        .cred-item.highlight { color: #38bdf8; }
        .cred-divider { color: #1e3a5f; font-size: 14px; }

        .contact-card {
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(56,189,248,0.15);
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.25s;
          text-decoration: none;
          cursor: pointer;
          width: 100%;
          font-family: inherit;
        }
        .contact-card:hover { border-color: rgba(56,189,248,0.4); transform: translateX(6px); background: rgba(56,189,248,0.06); }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        .pulse { animation: pulse-dot 2s ease-in-out infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .float { animation: float 3s ease-in-out infinite; }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .blink { animation: blink 1s step-end infinite; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-slide-up { animation: fadeSlideUp 0.5s ease forwards; }

        .available-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.35);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 700;
          color: #22c55e;
          margin-bottom: 20px;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(5,11,20,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(56,189,248,0.1)" : "none",
        transition: "all 0.3s", padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px"
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", color: "#38bdf8" }}>
          muthu<span style={{ color: "#f1f5f9" }}>.dev</span>
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          {NAV_LINKS.map((n) => (
            <button key={n} className={`nav-link ${active === n ? "active" : ""}`} onClick={() => scrollTo(n.toLowerCase())}>
              {n}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <a href="https://github.com/Muthu42" target="_blank" rel="noreferrer">
            <button className="btn-ghost" style={{ padding: "6px 16px", fontSize: "12px" }}>
              <span style={{ marginRight: "5px" }}>🐙</span> GitHub
            </button>
          </a>
          <a href="https://linkedin.com/in/muthu-madasamy" target="_blank" rel="noreferrer">
            <button className="btn-primary" style={{ padding: "6px 16px", fontSize: "12px" }}>
              <span style={{ marginRight: "5px" }}>🔗</span> LinkedIn
            </button>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: "80px" }}>
        <div className="hero-glow" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div style={{ textAlign: "center", maxWidth: "860px", padding: "0 24px", position: "relative", zIndex: 1 }}>

          {/* Top badges */}
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="ai-badge">⚡ AZ-900 Certified</span>
            <span className="ai-badge">🤖 AIOps</span>
            <span className="ai-badge">☸️ Kubernetes</span>
          </div>

          {/* Name */}
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(3rem,8vw,5.5rem)", fontWeight: 800, lineHeight: 1, marginBottom: "20px" }}>
            <div className="glow-text">MUTHU</div>
            <div style={{ color: "#f1f5f9" }}>MADASAMY</div>
          </div>

          {/* Role */}
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#94a3b8", marginBottom: "18px", letterSpacing: "3px", textTransform: "uppercase" }}>
            DevOps Engineer · Cloud · Kubernetes · AIOps
          </div>

          {/* Credibility bar — UPGRADED */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "22px" }}>
            <div className="credibility-bar">
              <span className="cred-item highlight">2+ Years Exp</span>
              <span className="cred-divider">|</span>
              <span className="cred-item">AWS</span>
              <span className="cred-divider">|</span>
              <span className="cred-item">Azure</span>
              <span className="cred-divider">|</span>
              <span className="cred-item highlight">Kubernetes</span>
              <span className="cred-divider">|</span>
              <span className="cred-item">CI/CD</span>
              <span className="cred-divider">|</span>
              <span className="cred-item">Terraform</span>
              <span className="cred-divider">|</span>
              <span className="cred-item highlight">AIOps</span>
            </div>
          </div>

          {/* One-liner */}
          <p style={{ fontSize: "17px", color: "#cbd5e1", maxWidth: "620px", margin: "0 auto 32px", lineHeight: 1.75 }}>
            Engineering <span style={{ color: "#38bdf8", fontWeight: 700 }}>production-grade Kubernetes systems</span> — automating every layer from infrastructure provisioning to AI-powered log monitoring.
          </p>

          {/* Terminal */}
          <div className="terminal" style={{ display: "inline-block", padding: "16px 24px", marginBottom: "36px", textAlign: "left" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
              <span className="terminal-dot" style={{ background: "#ef4444" }} />
              <span className="terminal-dot" style={{ background: "#f59e0b" }} />
              <span className="terminal-dot" style={{ background: "#22c55e" }} />
            </div>
            <code style={{ fontSize: "13px", color: "#94a3b8" }}>
              <span style={{ color: "#64748b" }}>$ </span>
              <span style={{ color: "#38bdf8" }}>kubectl get pods</span>
              {" "}--namespace=<span style={{ color: "#a78bfa" }}>production</span><br />
              <span style={{ color: "#22c55e" }}>NAME</span>
              {"          "}
              <span style={{ color: "#22c55e" }}>READY</span>
              {"   "}
              <span style={{ color: "#22c55e" }}>STATUS</span><br />
              frontend-pod{"  "}1/1{"     "}<span style={{ color: "#22c55e" }}>Running</span><br />
              backend-pod{"   "}1/1{"     "}<span style={{ color: "#22c55e" }}>Running</span><br />
              mysql-pod{"     "}1/1{"     "}<span style={{ color: "#22c55e" }}>Running</span>
              <span className="blink" style={{ color: "#38bdf8" }}>█</span>
            </code>
          </div>

          {/* CTAs — UPGRADED with Download Resume */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-download" onClick={() => alert("📄 Resume PDF — add your Google Drive / Dropbox link here!")}>
              ⬇ Download Resume
            </button>
            <button className="btn-primary" onClick={() => scrollTo("projects")}>
              View Projects →
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}>
              Get In Touch
            </button>
            <a href="https://github.com/Muthu42/3tier-app-k8s" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-ghost">GitHub Repo ↗</button>
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" ref={setRef("about")} style={{ padding: "100px 40px", maxWidth: "1000px", margin: "0 auto" }}>
        <div className={fadeIn("about")}>
          <div className="section-label">01 — About</div>
          <h2 className="section-title" style={{ marginBottom: "40px" }}>Production Mindset.<br />Automation First.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div className="card" style={{ padding: "32px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>⚙️</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "12px", fontSize: "18px" }}>What I Do</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.85, fontSize: "14px" }}>
                I design and operate cloud-native infrastructure on AWS and Azure — from Terraform-provisioned Kubernetes clusters to zero-downtime ArgoCD deployments. Every system I build is automated, observable, and resilient by design.
              </p>
            </div>
            <div className="card" style={{ padding: "32px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>🧠</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "12px", fontSize: "18px" }}>My Edge</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.85, fontSize: "14px" }}>
                I go beyond traditional DevOps — integrating <strong style={{ color: "#c4b5fd" }}>AI-based log analysis</strong> and AIOps into my monitoring stack. I combine Kubernetes expertise with real production experience to ship faster, safer.
              </p>
            </div>
          </div>
          <div className="card" style={{ padding: "28px 32px", marginTop: "24px", borderColor: "rgba(56,189,248,0.3)" }}>
            <p style={{ color: "#38bdf8", fontSize: "18px", fontWeight: 700, fontFamily: "'Syne',sans-serif", textAlign: "center" }}>
              "Automate everything. Monitor deeply. Design for failure."
            </p>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" ref={setRef("skills")} style={{ padding: "80px 40px", maxWidth: "1000px", margin: "0 auto" }}>
        <div className={fadeIn("skills")}>
          <div className="section-label">02 — Skills</div>
          <h2 className="section-title" style={{ marginBottom: "48px" }}>Full-Stack<br />DevOps Toolkit</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
            {SKILLS.map(({ cat, items }) => (
              <div key={cat} className="card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#38bdf8", marginBottom: "14px", textTransform: "uppercase" }}>{cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {items.map((item) => (
                    <span key={item} className="badge">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: "24px", padding: "20px 28px", display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "24px" }}>🏅</span>
            <div>
              <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "15px" }}>Microsoft Certified: Azure Fundamentals (AZ-900)</div>
              <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>Official Microsoft Certification · Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── UPGRADED */}
      <section id="experience" ref={setRef("experience")} style={{ padding: "80px 40px", maxWidth: "1000px", margin: "0 auto" }}>
        <div className={fadeIn("experience")}>
          <div className="section-label">03 — Experience</div>
          <h2 className="section-title" style={{ marginBottom: "48px" }}>Production<br />Track Record</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {EXPERIENCE.map((exp) => (
              <div key={exp.role} className="card" style={{ padding: "32px", position: "relative", overflow: "hidden" }}>
                {/* top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: exp.current ? "linear-gradient(90deg,#0ea5e9,#818cf8)" : "rgba(56,189,248,0.15)" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "20px", fontWeight: 800, color: "#f1f5f9" }}>{exp.role}</div>
                      {exp.current && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontWeight: 700, color: "#22c55e" }}>
                          <span className="pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div style={{ color: "#38bdf8", fontWeight: 600, fontSize: "14px" }}>{exp.company}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                    <span className="badge" style={{ fontSize: "11px" }}>{exp.period}</span>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {exp.tags.map((t) => <span key={t} className="badge-green">{t}</span>)}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {exp.points.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div className="timeline-dot" style={{ marginTop: "6px" }} />
                      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.75, flex: 1 }}>{p.text}</span>
                        <span className="exp-metric">{p.metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── UPGRADED */}
      <section id="projects" ref={setRef("projects")} style={{ padding: "80px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <div className={fadeIn("projects")}>
          <div className="section-label">04 — Projects</div>
          <h2 className="section-title" style={{ marginBottom: "12px" }}>Flagship<br />Case Study</h2>
          <div style={{ color: "#64748b", fontSize: "13px", marginBottom: "48px" }}>End-to-End DevOps · Production-Grade · AIOps Enabled</div>

          <div style={{ border: "1px solid rgba(56,189,248,0.25)", borderRadius: "16px", overflow: "hidden", background: "rgba(10,22,40,0.7)" }}>

            {/* Project Header */}
            <div style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(59,130,246,0.1))", padding: "40px", borderBottom: "1px solid rgba(56,189,248,0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "32px" }} className="float">☸️</span>
                <span className="ai-badge">🤖 AIOps Integrated</span>
                <span className="ai-badge" style={{ borderColor: "rgba(34,197,94,0.5)", color: "#86efac" }}>✅ Production-Grade</span>
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "26px", fontWeight: 800, color: "#f1f5f9", marginBottom: "10px" }}>
                End-to-End DevOps: 3-Tier Application on Kubernetes (AWS)
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.75, maxWidth: "720px", marginBottom: "24px" }}>
                Designed, built, and deployed a fully automated, production-grade 3-tier application — featuring GitOps, AI-powered log anomaly detection, full observability, and a complete 6-step Infrastructure → Deploy pipeline on AWS.
              </p>
              {/* CTA buttons */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="https://github.com/Muthu42/3tier-app-k8s" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <button className="btn-primary">🐙 View on GitHub ↗</button>
                </a>
                <button className="btn-ghost" onClick={() => alert("🚧 Live Demo coming soon — project runs on AWS EC2 Kubernetes cluster. GitHub link above has full setup guide.")} style={{ fontSize: "13px" }}>
                  🌐 Live Demo (AWS)
                </button>
              </div>
            </div>

            <div style={{ padding: "40px" }}>

              {/* ── IMPACT METRICS — NEW ── */}
              <div style={{ marginBottom: "40px" }}>
                <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "16px", marginBottom: "20px", fontFamily: "'Syne',sans-serif" }}>📈 Impact Metrics</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "16px" }}>
                  {IMPACT_METRICS.map((m) => (
                    <div key={m.label} className="metric-card">
                      <div style={{ fontSize: "22px", marginBottom: "8px" }}>{m.icon}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "26px", fontWeight: 800, color: "#38bdf8", marginBottom: "4px" }}>{m.value}</div>
                      <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>{m.label}</div>
                      <div style={{ color: "#64748b", fontSize: "11px" }}>{m.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem → Solution */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
                <div className="card" style={{ padding: "24px", borderColor: "rgba(239,68,68,0.2)" }}>
                  <div style={{ color: "#ef4444", fontWeight: 700, fontSize: "12px", letterSpacing: "2px", marginBottom: "12px" }}>⛔ PROBLEM</div>
                  <ul style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 2.1, paddingLeft: "0", listStyle: "none" }}>
                    {["Manual deployments with zero automation", "No scalability or HA guarantees", "No monitoring or alerting", "No security scanning in pipeline"].map((p) => (
                      <li key={p}>✗ {p}</li>
                    ))}
                  </ul>
                </div>
                <div className="card" style={{ padding: "24px", borderColor: "rgba(34,197,94,0.2)" }}>
                  <div style={{ color: "#22c55e", fontWeight: 700, fontSize: "12px", letterSpacing: "2px", marginBottom: "12px" }}>✅ SOLUTION</div>
                  <ul style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 2.1, paddingLeft: "0", listStyle: "none" }}>
                    {["GitOps pipeline with ArgoCD auto-sync & self-heal", "Kubernetes with HA deployments & rolling updates", "Prometheus + Grafana + AI log analysis stack", "Trivy + OWASP scans on every single CI run"].map((s) => (
                      <li key={s}>✓ {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Architecture */}
              <div style={{ marginBottom: "40px" }}>
                <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "16px", marginBottom: "20px", fontFamily: "'Syne',sans-serif" }}>🏗️ Architecture</div>
                <div className="card" style={{ padding: "28px", background: "#070f1e" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap", fontSize: "13px" }}>
                    {[
                      { label: "Frontend", sub: "React/NGINX", color: "#38bdf8" },
                      null,
                      { label: "Backend", sub: "Node.js API", color: "#818cf8" },
                      null,
                      { label: "MySQL", sub: "Database", color: "#f59e0b" },
                    ].map((item, i) =>
                      item === null ? (
                        <span key={i} className="pipeline-arrow">→</span>
                      ) : (
                        <div key={i} style={{
                          background: `rgba(${item.color === "#38bdf8" ? "56,189,248" : item.color === "#818cf8" ? "129,140,248" : "245,158,11"},0.1)`,
                          border: `1px solid ${item.color}44`,
                          borderRadius: "10px", padding: "14px 22px", textAlign: "center"
                        }}>
                          <div style={{ color: item.color, fontWeight: 700 }}>{item.label}</div>
                          <div style={{ color: "#64748b", fontSize: "11px", marginTop: "2px" }}>{item.sub}</div>
                        </div>
                      )
                    )}
                  </div>
                  <div style={{ textAlign: "center", margin: "16px 0", color: "#334155", fontSize: "13px" }}>↓ ↓ ↓</div>
                  <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                    {["Docker Build", "Kubernetes Cluster", "NGINX Ingress /api /prometheus /grafana", "ArgoCD GitOps"].map((t) => (
                      <span key={t} className="badge" style={{ fontSize: "11px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CI/CD Pipeline */}
              <div style={{ marginBottom: "40px" }}>
                <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "16px", marginBottom: "20px", fontFamily: "'Syne',sans-serif" }}>🔄 CI/CD Pipeline</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "12px" }}>
                  {PIPELINE.map((p, i) => (
                    <div key={p.step} className="card" style={{ padding: "18px", position: "relative" }}>
                      <div style={{ position: "absolute", top: "12px", right: "12px", fontSize: "10px", color: "#1e3a5f", fontWeight: 700 }}>0{i + 1}</div>
                      <div style={{ fontSize: "22px", marginBottom: "8px" }}>{p.icon}</div>
                      <div style={{ color: "#38bdf8", fontWeight: 700, fontSize: "12px", marginBottom: "6px" }}>{p.step}</div>
                      <div style={{ color: "#64748b", fontSize: "11px", lineHeight: 1.65 }}>{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SCREENSHOTS — NEW ── */}
              <div style={{ marginBottom: "40px" }}>
                <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "16px", marginBottom: "16px", fontFamily: "'Syne',sans-serif" }}>🖥️ System Previews</div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  {SCREENSHOTS.map((s, i) => (
                    <button key={s.title} className={`screenshot-tab ${activeScreenshot === i ? "active" : ""}`} onClick={() => setActiveScreenshot(i)}>
                      {s.icon} {s.title}
                    </button>
                  ))}
                </div>
                <div key={activeScreenshot} className="fade-slide-up card" style={{ padding: "28px", background: "#070f1e", borderColor: `${SCREENSHOTS[activeScreenshot].color}33` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <div style={{ color: SCREENSHOTS[activeScreenshot].color, fontWeight: 800, fontSize: "15px", fontFamily: "'Syne',sans-serif", marginBottom: "4px" }}>
                        {SCREENSHOTS[activeScreenshot].icon} {SCREENSHOTS[activeScreenshot].title}
                      </div>
                      <div style={{ color: "#64748b", fontSize: "13px" }}>{SCREENSHOTS[activeScreenshot].desc}</div>
                    </div>
                    <span style={{ fontSize: "10px", color: "#334155", fontWeight: 700, letterSpacing: "1px", border: "1px solid #1e3a5f", borderRadius: "4px", padding: "3px 8px" }}>LIVE SYSTEM</span>
                  </div>
                  {/* Mock dashboard */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px" }}>
                    {SCREENSHOTS[activeScreenshot].preview.map((row) => (
                      <div key={row.label} style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(56,189,248,0.1)", borderRadius: "8px", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "#64748b", fontSize: "12px" }}>{row.label}</span>
                        <span style={{ color: row.color, fontWeight: 800, fontSize: "14px" }}>{row.val}</span>
                      </div>
                    ))}
                  </div>
                  {/* Mini progress bars for Grafana */}
                  {activeScreenshot === 0 && (
                    <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[{ label: "CPU", val: 23, color: "#22c55e" }, { label: "Memory", val: 61, color: "#f59e0b" }, { label: "Network I/O", val: 38, color: "#38bdf8" }].map((b) => (
                        <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ color: "#64748b", fontSize: "11px", width: "70px" }}>{b.label}</span>
                          <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
                            <div style={{ width: `${b.val}%`, height: "100%", background: b.color, borderRadius: "3px", transition: "width 0.8s ease" }} />
                          </div>
                          <span style={{ color: b.color, fontSize: "11px", fontWeight: 700, width: "30px" }}>{b.val}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── AIOps Highlight — ENHANCED ── */}
              <div style={{ marginBottom: "40px", background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(56,189,248,0.07))", border: "1px solid rgba(139,92,246,0.45)", borderRadius: "14px", padding: "32px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "36px" }} className="float">🤖</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                      <div style={{ color: "#c4b5fd", fontWeight: 800, fontSize: "17px", fontFamily: "'Syne',sans-serif" }}>AI-Powered Log Analysis (AIOps)</div>
                      <span style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.5)", borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontWeight: 700, color: "#c4b5fd" }}>DIFFERENTIATOR</span>
                    </div>
                    <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.85, marginBottom: "16px" }}>
                      Integrated an <strong style={{ color: "#c4b5fd" }}>AI-based log analysis tool</strong> that automatically detects anomalies in Kubernetes pod logs — going far beyond traditional rule-based alerting. Combined with Prometheus alerting rules for pod restart spikes, backend downtime, and high CPU/memory usage, this creates a <strong style={{ color: "#c4b5fd" }}>self-aware monitoring stack</strong> that catches anomalies before they impact users.
                    </p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {["AI Anomaly Detection", "Prometheus Alerting", "AIOps Workflows", "Proactive Incident Prevention"].map((t) => (
                        <span key={t} style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", fontWeight: 600, color: "#c4b5fd" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div style={{ marginBottom: "36px" }}>
                <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "16px", marginBottom: "16px", fontFamily: "'Syne',sans-serif" }}>⚡ Tech Stack</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {PROJECT_STACK.map((t) => <span key={t} className="badge">{t}</span>)}
                </div>
              </div>

              {/* Impact cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
                {[
                  { icon: "🚀", label: "Zero-Touch Deploys", sub: "ArgoCD GitOps auto-sync" },
                  { icon: "👁️", label: "Full Observability", sub: "Metrics + AI log analysis" },
                  { icon: "🔒", label: "Security Scanned", sub: "Trivy + OWASP in every CI run" },
                ].map((m) => (
                  <div key={m.label} className="card" style={{ padding: "22px", textAlign: "center" }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>{m.icon}</div>
                    <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "14px" }}>{m.label}</div>
                    <div style={{ color: "#64748b", fontSize: "12px", marginTop: "5px" }}>{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXTRAS ── */}
      <section style={{ padding: "80px 40px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div className="card" style={{ padding: "32px" }}>
            <div style={{ color: "#38bdf8", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", marginBottom: "12px" }}>🔭 WHAT I'M BUILDING NOW</div>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.85 }}>
              Deepening my <strong style={{ color: "#f1f5f9" }}>Kubernetes + AI integration</strong> stack — exploring LLM-powered runbook automation, intelligent alerting, and self-healing infrastructure. Building toward Platform Engineering maturity.
            </p>
          </div>
          <div className="card" style={{ padding: "32px" }}>
            <div style={{ color: "#38bdf8", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", marginBottom: "16px" }}>💼 WHY HIRE ME</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "End-to-end pipeline ownership — Infra to Prod",
                "Kubernetes + GitOps + AIOps combo in one hire",
                "Production mindset with real incident experience",
                "AWS + Azure multi-cloud hands-on exposure",
              ].map((p) => (
                <div key={p} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "#22c55e", fontWeight: 700, marginTop: "1px" }}>→</span>
                  <span style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── UPGRADED */}
      <section id="contact" ref={setRef("contact")} style={{ padding: "80px 40px 120px", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <div className={fadeIn("contact")}>
          <div className="section-label" style={{ textAlign: "center" }}>05 — Contact</div>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>Let's Build<br />Something Real</h2>

          {/* Available pill */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <div className="available-pill">
              <span className="pulse" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Available for DevOps · Cloud · Platform Engineering roles
            </div>
          </div>

          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "36px", lineHeight: 1.7 }}>
            Based in Chennai, India · Open to remote and hybrid opportunities worldwide. Let's talk about how I can bring production-grade DevOps to your team.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Email — copy on click */}
            <button className="contact-card" onClick={handleCopyEmail} style={{ border: "1px solid rgba(56,189,248,0.3)" }}>
              <span style={{ fontSize: "24px" }}>📧</span>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "14px" }}>Muthumadasamy42@gmail.com</div>
                <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>Click to copy</div>
              </div>
              <span style={{ color: copied ? "#22c55e" : "#38bdf8", fontSize: "12px", fontWeight: 700 }}>{copied ? "✓ Copied!" : "Copy"}</span>
            </button>

            <a href="https://linkedin.com/in/muthu-madasamy" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div className="contact-card">
                <span style={{ fontSize: "24px" }}>🔗</span>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "14px" }}>linkedin.com/in/muthu-madasamy</div>
                  <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>Connect on LinkedIn</div>
                </div>
                <span style={{ color: "#38bdf8", fontSize: "12px" }}>↗</span>
              </div>
            </a>

            <a href="https://github.com/Muthu42" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div className="contact-card">
                <span style={{ fontSize: "24px" }}>🐙</span>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "14px" }}>github.com/Muthu42</div>
                  <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>View code & projects</div>
                </div>
                <span style={{ color: "#38bdf8", fontSize: "12px" }}>↗</span>
              </div>
            </a>

            <button className="btn-download" style={{ marginTop: "8px", width: "100%", padding: "16px" }} onClick={() => alert("📄 Resume PDF — replace this with your actual Google Drive / Dropbox link!")}>
              ⬇ Download Resume (PDF)
            </button>
          </div>

          <div style={{ marginTop: "24px", color: "#1e3a5f", fontSize: "12px" }}>
            📍 Chennai, India · +91 6383591736
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ textAlign: "center", padding: "28px 40px", borderTop: "1px solid rgba(56,189,248,0.08)", color: "#1e3a5f", fontSize: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <span>© 2025 Muthu Madasamy · DevOps Engineer</span>
        <span style={{ color: "#334155" }}>DevOps · Kubernetes · AWS · CI/CD · Terraform · AIOps</span>
        <span>Built with React ⚡</span>
      </div>
    </div>
  );
}
