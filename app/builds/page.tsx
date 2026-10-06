import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import ContactForm from "./ContactForm";
import ProjectPreview from "./ProjectPreview";
import "./builds.css";

const geist = localFont({ src: "../fonts/GeistVF.woff", display: "swap" });

export const metadata: Metadata = {
  title: "Builds by Sam - Freelance web development",
  description: "Websites, custom software, and workflow automation by independent developer Sam Schneider.",
};

const services = [
  { title: "Websites", description: "Business websites, landing pages, and redesigns. I handle the design and development, with attention to speed, accessibility, and mobile use." },
  { title: "Custom software", description: "Web applications, browser extensions, and internal tools. Bring an idea or a problem your existing software doesn't solve." },
  { title: "Automation", description: "Connect your tools and cut down on repetitive work. I've built systems for document generation, script processing, and data management." },
];

export default function BuildsPage() {
  return (
    <div className={`builds ${geist.className}`}>
      <a className="builds-skip" href="#main">Skip to content</a>
      <div className="builds-shell">
        <header className="builds-header">
          <Link href="/builds" className="builds-wordmark">builds by sam</Link>
          <nav aria-label="Main navigation">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>
        <main id="main">
          <section className="builds-hero" aria-labelledby="hero-title">
            <h1 id="hero-title"><span className="builds-title-line"><span>Websites & software,</span></span><span className="builds-title-line"><span>built by Sam.</span></span></h1>
            <div className="builds-hero-description">
              <p>I'm Sam Schneider, a freelance developer. I build websites, custom applications, and automations for businesses and organizations.</p>
              <a className="builds-button" href="#contact">Tell me about your project</a>
            </div>
          </section>
          <section id="work" className="builds-section builds-work" aria-labelledby="work-title">
            <div className="builds-work-heading">
              <h2 id="work-title">Selected work</h2>
              <Link className="builds-text-link" href="/#projects">All projects</Link>
            </div>
            <div className="builds-projects">
              <a className="builds-project" href="https://www.udplbooks.org/" target="_blank" rel="noopener noreferrer">
                <ProjectPreview tone="library"><Image src="/projects/udpl.png" alt="Upper Dublin Public Library book discovery website" width={1100} height={700} sizes="(max-width: 760px) 90vw, 45vw" priority /></ProjectPreview>
                <h3>Upper Dublin Public Library</h3>
                <p>A book discovery website with reading lists managed through Google Sheets and links to the library's catalog.</p>
              </a>
              <a className="builds-project" href="https://github.com/Beasleydog/customTab" target="_blank" rel="noopener noreferrer">
                <ProjectPreview tone="tab"><Image src="/projects/customtab.png" alt="CustomTab browser extension with a personalized new tab dashboard" width={1100} height={700} sizes="(max-width: 760px) 90vw, 45vw" /></ProjectPreview>
                <h3>CustomTab</h3>
                <p>A browser extension for personalizing your new tab page.</p>
              </a>
            </div>
          </section>
          <section id="services" className="builds-section builds-services-section" aria-labelledby="services-title">
            <h2 id="services-title">What I can help with</h2>
            <div className="builds-services">
              {services.map(service => <article className="builds-service" key={service.title}><h3>{service.title}</h3><p>{service.description}</p></article>)}
            </div>
          </section>
          <section id="contact" className="builds-contact" aria-labelledby="contact-title">
            <div className="builds-contact-copy">
              <h2 id="contact-title">Have a project<br />in mind?</h2>
              <p>Tell me what you need, any deadlines, and a budget if you have one. We can work out the details together.</p>
              <Link href="/" className="builds-text-link">More about me</Link>
            </div>
            <ContactForm />
          </section>
        </main>
        <footer className="builds-footer"><p>&copy; {new Date().getFullYear()} Sam Schneider</p><Link href="/">Personal website</Link></footer>
      </div>
    </div>
  );
}
