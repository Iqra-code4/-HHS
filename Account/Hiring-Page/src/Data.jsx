import React from 'react'

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const JOBS_DATA = [
  {
    id: 1, logo: "FE", dept: "Engineering", type: "Full-Time",
    title: "Senior Frontend Engineer",
    loc: "San Francisco, CA", remote: true, salary: "$140K – $180K",
    posted: "2d ago", applicants: 84, urgent: true,
    desc: `We are looking for a Senior Frontend Engineer to join our core product team and help build world-class interfaces used by millions of users.

You will lead complex UI initiatives, mentor junior engineers, and collaborate directly with product and design to ship features that genuinely matter. This is a high-ownership role with real influence over the architecture and quality bar of our frontend.`,
    reqs: [
      "5+ years of React and TypeScript experience",
      "Deep understanding of CSS architecture and design systems",
      "Proven experience with performance optimisation and testing",
      "Strong eye for detail and UX sensibility",
      "Excellent async communication skills",
    ],
    nice: ["GraphQL / REST API design", "Storybook / component library ownership", "Experience at a Series B+ startup"],
  },
  {
    id: 2, logo: "PM", dept: "Product", type: "Full-Time",
    title: "Product Manager – Growth",
    loc: "New York, NY", remote: false, salary: "$120K – $155K",
    posted: "3d ago", applicants: 126, urgent: false,
    desc: `Drive the growth roadmap for our flagship SaaS product. You will define strategy, partner with data scientists on experimentation, and coordinate cross-functional teams to execute on aggressive growth targets.

This is a high-impact role at the intersection of data, design, and engineering. You will have direct input into how we acquire, activate, and retain our users at scale.`,
    reqs: [
      "4+ years in product management at a B2B SaaS company",
      "Growth and experimentation background (A/B, multi-variate)",
      "Strong SQL and analytics skills",
      "Excellent stakeholder management at all levels",
      "Track record of 0→1 product launches",
    ],
    nice: ["Background in HR Tech or marketplace products", "Experience with Amplitude, Mixpanel, or similar", "MBA from a top program"],
  },
  {
    id: 3, logo: "ML", dept: "AI & Data", type: "Full-Time",
    title: "Machine Learning Engineer",
    loc: "Remote", remote: true, salary: "$160K – $210K",
    posted: "1d ago", applicants: 47, urgent: true,
    desc: `Join our AI team to build cutting-edge ML systems that power our candidate matching and job recommendation engines. You will work on large-scale ranking, NLP, and recommendation systems deployed across our global platform.

Our ML stack processes hundreds of millions of signals daily. You will have access to exceptional compute resources, a world-class team, and meaningful autonomy to drive innovation.`,
    reqs: [
      "MS or PhD in Machine Learning or related field",
      "Proficiency in Python with PyTorch or TensorFlow",
      "Experience shipping production ML systems at scale",
      "Background in NLP or recommendation systems preferred",
      "Strong software engineering fundamentals",
    ],
    nice: ["Publications at top-tier ML conferences", "Experience with LLM fine-tuning", "Background in HR or talent intelligence"],
  },
  {
    id: 4, logo: "BD", dept: "Design", type: "Full-Time",
    title: "Brand & Visual Designer",
    loc: "Austin, TX", remote: true, salary: "$95K – $125K",
    posted: "5d ago", applicants: 203, urgent: false,
    desc: `Shape the visual identity of TalentBridge across all touchpoints — web, mobile, social, and print. You will work alongside our product designers to ensure consistency and help evolve our brand as we scale internationally.

Your work will be seen by millions of job seekers and companies worldwide. This is a rare opportunity to own a brand from the inside of a high-growth startup.`,
    reqs: [
      "Strong portfolio demonstrating brand system work",
      "Mastery of Figma and Adobe Illustrator",
      "Solid understanding of typography and grid systems",
      "Experience working within fast-paced startup environments",
      "Ability to present and defend design decisions",
    ],
    nice: ["Motion design and After Effects", "Experience with 3D tools (Spline, Blender)", "Print production knowledge"],
  },
  {
    id: 5, logo: "ES", dept: "Sales", type: "Full-Time",
    title: "Head of Enterprise Sales",
    loc: "Chicago, IL", remote: false, salary: "$130K – $175K + OTE",
    posted: "7d ago", applicants: 58, urgent: false,
    desc: `Lead and grow our enterprise sales division targeting Fortune 500 companies. You will build and manage a team of AEs, define sales strategy, and personally close seven-figure contracts with some of the world's largest employers.

This is a senior leadership role with a path to VP. You will have full quota responsibility and the resources to build the enterprise function from the ground up.`,
    reqs: [
      "8+ years in B2B enterprise sales with a proven track record",
      "Experience closing contracts valued at $500K+",
      "Team leadership and coaching experience",
      "HR Tech or enterprise SaaS background preferred",
      "CRM proficiency — Salesforce is our system of record",
    ],
    nice: ["Experience building outbound BDR teams", "Network in HR/People Ops/TA communities", "Experience at a PLG-to-Enterprise transition"],
  },
  {
    id: 6, logo: "DO", dept: "Engineering", type: "Full-Time",
    title: "Platform / DevOps Engineer",
    loc: "Remote", remote: true, salary: "$130K – $165K",
    posted: "4d ago", applicants: 39, urgent: false,
    desc: `Own and evolve our cloud infrastructure on AWS. You will improve reliability, scalability, and developer experience for a team of 40+ engineers shipping changes multiple times per day.

You will have significant autonomy in tooling decisions, infrastructure design, and on-call rotation design. We are a team that takes ops seriously and invests heavily in platform quality.`,
    reqs: [
      "Deep expertise in AWS — EKS, RDS, Lambda, CloudFront",
      "Terraform and infrastructure-as-code proficiency",
      "Experience managing Kubernetes clusters in production",
      "Strong security and compliance knowledge",
      "Experience designing on-call rotations and runbooks",
    ],
    nice: ["Experience with FinOps / AWS cost optimisation", "Familiarity with GDPR/SOC2 compliance", "Prior startup to scale-up infrastructure journey"],
  },
];

const CANDIDATES_DATA = [
  { id:1, initials:"ZA", name:"Zara Ahmed",    role:"Senior Frontend Engineer", exp:"5 yrs", loc:"New York",       skills:["React","TypeScript","CSS","Figma"],         salary:"$145K", avail:"Immediately", match:97, rating:5 },
  { id:2, initials:"KM", name:"Kai Morrison",  role:"Product Manager",          exp:"7 yrs", loc:"San Francisco",  skills:["Roadmapping","SQL","Analytics","A/B Tests"],  salary:"$130K", avail:"2 weeks",     match:94, rating:5 },
  { id:3, initials:"OS", name:"Omar Shaikh",   role:"ML Engineer",              exp:"6 yrs", loc:"Remote",         skills:["Python","PyTorch","NLP","MLOps"],             salary:"$155K", avail:"1 month",     match:98, rating:5 },
  { id:4, initials:"PL", name:"Priya Lamba",   role:"Brand Designer",           exp:"4 yrs", loc:"Austin",         skills:["Figma","Illustrator","Motion","Typography"],  salary:"$105K", avail:"Immediately", match:91, rating:4 },
  { id:5, initials:"LF", name:"Lena Fischer",  role:"Data Analyst",             exp:"3 yrs", loc:"Remote",         skills:["SQL","Tableau","Python","dbt"],               salary:"$95K",  avail:"2 weeks",     match:88, rating:4 },
  { id:6, initials:"AK", name:"Aryan Kapoor",  role:"DevOps Engineer",          exp:"5 yrs", loc:"Remote",         skills:["AWS","Kubernetes","Terraform","CI/CD"],       salary:"$140K", avail:"1 month",     match:96, rating:5 },
  { id:7, initials:"MR", name:"Maya Rodriguez",role:"Backend Engineer",         exp:"4 yrs", loc:"Chicago",        skills:["Go","Postgres","gRPC","Kubernetes"],          salary:"$135K", avail:"Immediately", match:89, rating:4 },
  { id:8, initials:"TN", name:"Theo Nakamura", role:"Head of Sales",            exp:"9 yrs", loc:"Boston",         skills:["Enterprise","Salesforce","Forecasting","CRM"],salary:"$160K", avail:"1 month",     match:93, rating:5 },
];

const DEPTS = ["All", "Engineering", "Product", "AI & Data", "Design", "Sales"];

export { JOBS_DATA, CANDIDATES_DATA, DEPTS };