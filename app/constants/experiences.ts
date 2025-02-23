import {
  SiTypescript,
  SiReact,
  SiGoogleappsscript,
  SiNextdotjs,
  SiTailwindcss,
  SiLooker,
  SiAuth0,
  SiGooglesheets,
  SiGooglechrome,
  SiAmazondynamodb,
  SiAmazons3,
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiGooglecloud,
  SiPython,
  SiTensorflow,
  SiPytorch,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FaFileContract, FaFileCode, FaGoogleDrive } from "react-icons/fa";
import { BiCodeBlock } from "react-icons/bi";
import { BRAND_COLORS } from "./colors";

export interface Experience {
  company: string;
  type: "internship" | "freelance" | "volunteer" | "member";
  role: string;
  period: string;
  highlights: string[];
  skills: {
    icon: React.ComponentType;
    name: keyof typeof BRAND_COLORS;
  }[];
}

export const experiences: Experience[] = [
  {
    company: "RemNote",
    type: "internship",
    role: "Software Engineering Intern",
    period: "June 2023 - September 2023",
    highlights: [
      "Built RemNote Web Clipper Chrome Extension, reached 12,000+ downloads after successful launch",
      "Extension was developed with React & Typescript, allowed users to take notes on any webpage via Chrome Side Panel API",
      "Independently implemented functionality and first design. Collaborated with senior designer for final version",
    ],
    skills: [
      { icon: SiReact, name: "React" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiGooglechrome, name: "Chrome Extension" },
      { icon: TbApi, name: "Chrome API" },
    ],
  },
  {
    company: "Changing Lives Productions",
    type: "freelance",
    role: "Automation Engineer",
    period: "July 2024 - August 2024",
    highlights: [
      "Automated script extraction process from days to seconds for processing 10s of scripts",
      "Implemented data pipeline using Google Apps Script to extract and format script details in Google Sheets",
      "Redesigned workflows for multiple teams with auto-populating sub-sheets",
      "Built React frontend for easy script extraction and data routing",
    ],
    skills: [
      { icon: SiReact, name: "React" },
      { icon: SiGoogleappsscript, name: "Google Apps Script" },
      { icon: SiGooglesheets, name: "Google Sheets" },
      { icon: SiGooglecloud, name: "Google Cloud" },
    ],
  },
  {
    company: "Law Offices of John M. Shari, Esq.",
    type: "freelance",
    role: "Software Engineer",
    period: "May 2024 - June 2024",
    highlights: [
      "Created internal templating system to streamline contract creation, reducing time to <5s",
      "Implemented caching system for combined templates, cutting creation time by 90%",
      "Integrated Google Drive APIs for template management and PDF generation",
      "Developed frontend with HTML, CSS, Javascript for document selection and template filling",
    ],
    skills: [
      { icon: SiReact, name: "React" },
      { icon: FaGoogleDrive, name: "Google Drive API" },
      { icon: FaFileContract, name: "Template System" },
      { icon: BiCodeBlock, name: "Cache System" },
      { icon: FaFileCode, name: "Document Processing" },
    ],
  },
  {
    company: "Values Market",
    type: "freelance",
    role: "Software Engineer",
    period: "June 2024 - July 2024",
    highlights: [
      "Developed AI-powered paralegal assistant using Next.js, Tailwind, S3, DynamoDB, Textract and Auth0",
      "Integrated multiple LLM models (ChatGPT, Gemini, Claude) for document analysis",
      "Implemented comprehensive system for file storage, text extraction, and user data management",
    ],
    skills: [
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiTailwindcss, name: "Tailwind" },
      { icon: SiAmazondynamodb, name: "DynamoDB" },
      { icon: SiAmazons3, name: "AWS S3" },
      { icon: SiAuth0, name: "Auth0" },
      { icon: SiOpenai, name: "OpenAI" },
      { icon: SiAnthropic, name: "Anthropic" },
      { icon: SiGooglegemini, name: "Gemini" },
    ],
  },
  {
    company: "Upper Dublin Public Library",
    type: "volunteer",
    role: "Volunteer Software Engineer",
    period: "June 2024 - August 2024",
    highlights: [
      "Built community-facing site to promote book and author reading lists",
      "Implemented Google Sheets API backend for easy content management",
      "Designed responsive frontend with Next.js for web and mobile",
      "Integrated PolarisLibrary API for direct links and book covers",
    ],
    skills: [
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiGooglesheets, name: "Google Sheets" },
      { icon: TbApi, name: "PolarisLibrary API" },
      { icon: SiTailwindcss, name: "Tailwind" },
      { icon: SiLooker, name: "Looker Studio" },
    ],
  },
  {
    company: "UM CLAWS",
    type: "member",
    role: "AI Team Member",
    period: "September 2024 - Present",
    highlights: [
      "Design and implement AI agent with function calling reaching speeds 2x of langchain",
      "Finetune and compare Qwen2.5 0.5b, SmolLM2-360M, and FlanT5-large for quick, local agent output",
    ],
    skills: [
      { icon: SiPython, name: "Python" },
      { icon: SiTensorflow, name: "TensorFlow" },
      { icon: SiPytorch, name: "PyTorch" },
      { icon: SiOpenai, name: "OpenAI" },
    ],
  },
];
