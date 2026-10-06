import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import SubmitForm from "./Form/SubmitForm";
import MySubmissions from "./Form/MySubmissions";
import ProjectCard from "./ProjectDetails/ProjectCard";
import DetailModel from "./ProjectDetails/detailModel";
import Hero from "./ProjectDetails/Hero";
import PostProjectModal from "./ProjectDetails/PostProjectModal";
import Nav from "./Nav";
import Leaderboard from "./Leaderboard";
import BoardView from "./ProjectDetails/BoardView";

export const SEED_PROJECTS = [
  {
    id: 1,
    title: "AI-Powered Resume Screener",
    company: "TalentBridge",
    companyInitials: "TB",
    category: "AI / ML",
    difficulty: "Advanced",
    status: "open",
    featured: true,
    prize: 2500,
    currency: "$",
    deadline: "2026-04-15",
    postedDate: "2026-03-01",
    slots: 3,
    applicants: 47,
    description: "Build an AI system that automatically screens resumes against job descriptions. The system should use NLP techniques to extract skills, experience, and qualifications, then rank candidates with a match score and reasoning explanation.",
    longDescription: "We are looking for talented engineers to build a production-ready AI resume screener. The system must handle PDF and DOCX uploads, extract structured data (skills, experience, education), compare against a job description using semantic similarity, and return a ranked list of candidates with scores and explanations. Bonus points for a clean API design and a simple React frontend.\n\nThis project will be integrated into TalentBridge's core recruitment product, so quality, accuracy, and performance are critical.",
    requirements: [
      "PDF/DOCX parsing with structured extraction",
      "NLP-based semantic matching (cosine similarity or LLM)",
      "REST API with FastAPI or Node.js",
      "Match score (0–100) with reasoning",
      "Handles 100+ resumes per batch",
    ],
    deliverables: [
      "GitHub repository with README",
      "Live demo or video walkthrough",
      "API documentation",
      "Test suite with ≥80% coverage",
    ],
    prizes: [
      { rank: "1st Place", amount: 2500, label: "Gold" },
      { rank: "2nd Place", amount: 1200, label: "Silver" },
      { rank: "3rd Place", amount: 600,  label: "Bronze" },
    ],
    tags: ["Python","NLP","FastAPI","React","OpenAI"],
    submissionCount: 8,
  },
  {
    id: 2,
    title: "Real-Time Job Match Dashboard",
    company: "HireFlow Inc.",
    companyInitials: "HF",
    category: "Full-Stack",
    difficulty: "Intermediate",
    status: "open",
    featured: true,
    prize: 1500,
    currency: "$",
    deadline: "2026-04-22",
    postedDate: "2026-03-05",
    slots: 5,
    applicants: 32,
    description: "Design and build a real-time dashboard that shows live job matches for candidates based on their skill profile. Include WebSocket updates, filtering, and a visual match score breakdown.",
    longDescription: "HireFlow needs a beautiful, performant dashboard that helps candidates see their best job matches in real time. The dashboard should pull from a mock job API, calculate match percentages based on skill overlap, and update live via WebSocket simulation. Think Bloomberg terminal meets Dribbble — sleek, information-dense, and fast.",
    requirements: [
      "React frontend with TypeScript",
      "Real-time updates (WebSocket or polling)",
      "Filter by role, salary, location, remote",
      "Match score visualization (chart or progress ring)",
      "Mobile responsive design",
    ],
    deliverables: [
      "GitHub repository",
      "Live deployment (Vercel/Netlify)",
      "Loom walkthrough video",
    ],
    prizes: [
      { rank: "1st Place", amount: 1500, label: "Gold" },
      { rank: "2nd Place", amount: 700,  label: "Silver" },
    ],
    tags: ["React","TypeScript","WebSocket","Charts","Tailwind"],
    submissionCount: 5,
  },
  {
    id: 3,
    title: "Candidate Video Interview Analyzer",
    company: "RecruiterAI",
    companyInitials: "RA",
    category: "AI / ML",
    difficulty: "Expert",
    status: "open",
    featured: false,
    prize: 4000,
    currency: "$",
    deadline: "2026-05-01",
    postedDate: "2026-03-08",
    slots: 2,
    applicants: 19,
    description: "Build a video interview analysis tool that uses AI to evaluate candidate responses — detecting sentiment, keywords, filler words, speaking pace, and generating a structured feedback report.",
    longDescription: "RecruiterAI is building the next generation of interview intelligence. We need a pipeline that accepts a video URL, transcribes it, analyzes the transcript for communication quality metrics (filler words, pace, clarity, confidence signals), and generates a hiring manager report with scoring. Accuracy and real interview insight matter most.",
    requirements: [
      "Video transcription (Whisper API or equivalent)",
      "NLP analysis: sentiment, filler words, pace estimation",
      "Structured JSON output + PDF report generation",
      "Web interface to upload video and view results",
      "Works on interviews 5–30 minutes long",
    ],
    deliverables: [
      "Full source code on GitHub",
      "Working demo with sample interview",
      "Technical writeup (500–1000 words)",
      "API reference docs",
    ],
    prizes: [
      { rank: "1st Place", amount: 4000, label: "Gold" },
      { rank: "2nd Place", amount: 2000, label: "Silver" },
      { rank: "3rd Place", amount: 800,  label: "Bronze" },
    ],
    tags: ["Python","Whisper","NLP","FFmpeg","React"],
    submissionCount: 3,
  },
  {
    id: 4,
    title: "Design System for Hiring Platform",
    company: "DesignCore",
    companyInitials: "DC",
    category: "UI / UX",
    difficulty: "Intermediate",
    status: "open",
    featured: false,
    prize: 1200,
    currency: "$",
    deadline: "2026-04-10",
    postedDate: "2026-03-10",
    slots: 4,
    applicants: 61,
    description: "Create a comprehensive, accessible design system for a B2B hiring platform. Deliver a Figma component library + coded React component library with dark/light mode support.",
    longDescription: "DesignCore is building design infrastructure for hiring platforms across 12 companies. We need a scalable, beautiful design system with at minimum: typography scale, color tokens (dark/light), 30+ Figma components, and matching React/Tailwind implementation. Accessibility (WCAG AA) is non-negotiable. Document everything clearly.",
    requirements: [
      "Figma library with auto-layout components",
      "React component library (Storybook)",
      "Dark/Light mode token system",
      "WCAG AA accessibility compliance",
      "30+ unique components",
    ],
    deliverables: [
      "Figma file link",
      "GitHub repo with Storybook",
      "Component documentation",
      "Design tokens (JSON)",
    ],
    prizes: [
      { rank: "1st Place", amount: 1200, label: "Gold" },
      { rank: "2nd Place", amount: 500,  label: "Silver" },
    ],
    tags: ["Figma","React","Storybook","Tailwind","A11y"],
    submissionCount: 14,
  },
  {
    id: 5,
    title: "Salary Prediction ML Model",
    company: "DataHire Labs",
    companyInitials: "DH",
    category: "Data Science",
    difficulty: "Intermediate",
    status: "closed",
    featured: false,
    prize: 900,
    currency: "$",
    deadline: "2026-03-10",
    postedDate: "2026-02-01",
    slots: 3,
    applicants: 88,
    description: "Train and deploy a salary prediction model using publicly available job posting data. The model should predict salary ranges based on role, skills, location, and experience.",
    longDescription: "Using real-world job posting datasets, build a salary prediction pipeline. Clean the data, engineer meaningful features, train multiple model candidates, evaluate thoroughly, and deploy as a simple REST endpoint. A Streamlit or Gradio UI for quick demo is a big plus.",
    requirements: [
      "Data cleaning & feature engineering pipeline",
      "3+ ML models benchmarked (MAE, RMSE)",
      "Final model deployed as REST API",
      "Jupyter notebook with full analysis",
    ],
    deliverables: [
      "GitHub repo",
      "Live API endpoint",
      "Analysis notebook",
      "Model card documentation",
    ],
    prizes: [
      { rank: "1st Place", amount: 900, label: "Gold" },
      { rank: "2nd Place", amount: 350, label: "Silver" },
    ],
    tags: ["Python","Scikit-learn","XGBoost","FastAPI","Streamlit"],
    submissionCount: 22,
  },
  {
    id: 6,
    title: "Candidate Referral Network Graph",
    company: "NetworkIO",
    companyInitials: "NI",
    category: "Full-Stack",
    difficulty: "Advanced",
    status: "open",
    featured: false,
    prize: 1800,
    currency: "$",
    deadline: "2026-04-30",
    postedDate: "2026-03-12",
    slots: 3,
    applicants: 24,
    description: "Build an interactive network graph visualization showing referral relationships between candidates and companies. Include node clustering, force-directed layout, and drill-down analytics.",
    longDescription: "NetworkIO wants to visualize how candidates move through referral chains across companies. Build a force-directed graph with D3 or Cytoscape that renders 500+ nodes smoothly, supports click-to-inspect, filters by industry and time, and exports as SVG/PNG. Performance and visual quality are judged equally.",
    requirements: [
      "Force-directed graph with 500+ nodes at 60fps",
      "Node/edge click inspection panel",
      "Filter by company, role, time range",
      "SVG/PNG export",
      "REST API feeding mock referral data",
    ],
    deliverables: [
      "GitHub repository",
      "Live deployment",
      "Performance benchmark report",
    ],
    prizes: [
      { rank: "1st Place", amount: 1800, label: "Gold" },
      { rank: "2nd Place", amount: 750,  label: "Silver" },
    ],
    tags: ["D3.js","React","GraphQL","Node.js","Canvas"],
    submissionCount: 6,
  },
];

export const CATEGORIES = ["All","AI / ML","Full-Stack","UI / UX","Data Science","Mobile","DevOps"];
export const DIFFICULTIES = ["All","Beginner","Intermediate","Advanced","Expert"];
export const SORT_OPTIONS = ["Newest","Prize: High to Low","Prize: Low to High","Deadline: Soonest","Most Applicants"];

export function daysLeft(deadline) {
  const d = Math.ceil((new Date(deadline) - new Date()) / 86400000);
  return d < 0 ? "Closed" : d === 0 ? "Last day!" : `${d}d left`;
}
export function formatPrize(n) {
  return n >= 1000 ? `$${(n/1000).toFixed(1)}k` : `$${n}`;
}
export function relativeDate(dateStr) {
  const d = Math.floor((new Date() - new Date(dateStr)) / 86400000);
  return d === 0 ? "Today" : d === 1 ? "Yesterday" : `${d}d ago`;
}

export const diffColor = { Beginner:"#3ddc84", Intermediate:"#f5c542", Advanced:"#ff8c42", Expert:"#ff4545" };
export const catColor  = { "AI / ML":"#4da6ff","Full-Stack":"#3ddc84","UI / UX":"#d084ff","Data Science":"#f5c542","Mobile":"#ff8c42","DevOps":"#ff6b6b" };

/* ════════════════════════════════════════
   TOAST
════════════════════════════════════════ */
function Toast({ message, icon, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t); }, []);
  return (
    <div className="toast">
      <span style={{ fontSize:20 }}>{icon}</span>
      <span style={{ fontSize:13, color:'#ccc', fontWeight:500 }}>{message}</span>
    </div>
  );
}

function App() {
  const [view,        setView]        = useState('board');
  const [projects,    setProjects]    = useState(SEED_PROJECTS);
  const [activeProj,  setActiveProj]  = useState(null);
  const [showPost,    setShowPost]    = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [toast,       setToast]       = useState(null);

  const showToast = (message, icon) => {
    setToast({ message, icon });
  };

  const handleSubmit = useCallback((sub) => {
    setSubmissions(s => [...s, sub]);
    setActiveProj(null);
    setView('my-submissions');
    showToast(`Submission for "${sub.projectTitle}" received!`, '✅');
  }, []);

  const handlePost = useCallback((proj) => {
    setProjects(p => [proj, ...p]);
    setShowPost(false);
    showToast(`"${proj.title}" posted successfully!`, '🚀');
  }, []);

  return (
    <>
      <style>{`
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 0 rgba(245,197,66,0)}50%{box-shadow:0 0 20px rgba(245,197,66,.15)}}
      `}</style>

      <Nav view={view} setView={setView} onPostProject={() => setShowPost(true)}/>

      {view === 'board' && (
        <>
          <Hero projects={projects}/>
          <BoardView projects={projects} onViewProject={setActiveProj}/>
        </>
      )}
      {view === 'my-submissions' && (
        <MySubmissions submissions={submissions} projects={projects} onViewProject={p=>{setActiveProj(p);setView('board');}}/>
      )}
      {view === 'leaderboard' && <Leaderboard projects={projects}/>}

      {activeProj && (
        <DetailModel
          project={activeProj}
          onClose={() => setActiveProj(null)}
          onSubmit={handleSubmit}
          submissions={submissions}
        />
      )}
      {showPost && (
        <PostProjectModal onClose={() => setShowPost(false)} onPost={handlePost}/>
      )}
      {toast && (
        <Toast message={toast.message} icon={toast.icon} onDone={() => setToast(null)}/>
      )}
    </>
  );
}

export default App;