const ROLES = [
  { id:'swe',    label:'Software Engineer', symbol:'⟨/⟩', tags:['Frontend','Backend','DSA'] },
  { id:'uiux',   label:'UI / UX Designer',  symbol:'◈',   tags:['Figma','Research','Prototyping'] },
  { id:'pm',     label:'Product Manager',   symbol:'◎',   tags:['Roadmap','Agile','Strategy'] },
  { id:'ds',     label:'Data Scientist',    symbol:'∑',   tags:['ML','Python','Analytics'] },
  { id:'mkt',    label:'Marketing',         symbol:'◉',   tags:['Growth','SEO','Campaigns'] },
  { id:'fin',    label:'Finance',           symbol:'$',   tags:['Analysis','Modeling','Risk'] },
  { id:'devops', label:'DevOps / Cloud',    symbol:'⬡',   tags:['AWS','CI/CD','Kubernetes'] },
  { id:'aiml',   label:'AI / ML Engineer',  symbol:'⬟',   tags:['LLMs','PyTorch','MLOps'] },
  { id:'sales',  label:'Web Developer',     symbol:'◆',   tags:['Frontend','Full-Stack','Backend'] },
];

const POPULAR_SKILLS = ['React','Python','TypeScript','Node.js','SQL','Figma','AWS','Docker','Go','Rust','JS','Express.js','C++','C','Java'];
const ALL_SKILLS = [...POPULAR_SKILLS,'Vue','Angular','GraphQL','PostgreSQL','MongoDB','Redis','Kubernetes',
  'TensorFlow','PyTorch','Pandas','Scikit-learn','HTML','Kotlin','Swift','Flutter','Next.js',
  'Tailwind CSS','Jest','Cypress','Git','Linux','Bash','Bootstrap','C#','Scala','R','Spark','Tableau'];

const LANGUAGES_LIST = ['English','Urdu','Arabic','French','German','Spanish','Mandarin','Hindi','Japanese','Portuguese','Korean','Italian','Turkish'];
const PROFICIENCY = ['Native','Fluent','Advanced','Conversational','Basic'];

const COUNTRIES = ['Pakistan','United States','United Kingdom','Canada','Australia','Germany','UAE','India','Netherlands','Singapore','France','Sweden'];
const CITIES = {
  'Pakistan':['Lahore','Karachi','Islamabad','Faisalabad','Rawalpindi'],
  'United States':['New York','San Francisco','Austin','Seattle','Chicago'],
  'United Kingdom':['London','Manchester','Birmingham','Edinburgh','Bristol'],
  'Canada':['Toronto','Vancouver','Montreal','Calgary','Ottawa'],
  'Australia':['Sydney','Melbourne','Brisbane','Perth','Adelaide'],
  'Germany':['Berlin','Munich','Hamburg','Frankfurt','Cologne'],
  'UAE':['Dubai','Abu Dhabi','Sharjah'],
  'India':['Bangalore','Mumbai','Delhi','Hyderabad','Pune'],
  'Netherlands':['Amsterdam','Rotterdam','Utrecht','Eindhoven'],
  'Singapore':['Singapore'],
  'France':['Paris','Lyon','Marseille'],
  'Sweden':['Stockholm','Gothenburg','Malmö'],
};

const STEPS = ['Define Role','Personal Info','Skills & Exp','Resume','Preview'];

const CHECKLIST = [
  { key:'role',    label:'Role selected' },
  { key:'name',    label:'Full name' },
  { key:'email',   label:'Email address' },
  { key:'headline',label:'Professional headline' },
  { key:'bio',     label:'Bio written' },
  { key:'skills',  label:'3+ skills added' },
  { key:'exp',     label:'Work experience' },
  { key:'resume',  label:'Resume ready' },
  { key:'photo',   label:'Profile photo(Optional)' },
];

const TIPS = [
  'Choose the role that best describes your primary expertise. You can refine with skills later.',
  'A professional portfolio and compelling headline increase profile views by 3×.',
  'Candidates with 5+ skills and one work experience listed get 2× more messages.',
  'Upload your latest resume or use our builder — both work with all employers.',
  'Profiles with all sections complete rank 5× higher in recruiter searches.',
];

export {ROLES, STEPS, TIPS, POPULAR_SKILLS, ALL_SKILLS, LANGUAGES_LIST, PROFICIENCY, CITIES, COUNTRIES, CHECKLIST}