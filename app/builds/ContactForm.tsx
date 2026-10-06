"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/builds/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn’t submit your inquiry. Please try again.");
      setStatus("error");
    }
  }

  return <form className="builds-form" onSubmit={submit} aria-label="Project inquiry" aria-busy={status === "sending"}>
    <div className="builds-form-row"><label htmlFor="builds-name">Your name<input id="builds-name" name="name" autoComplete="name" placeholder="Alex Taylor" required maxLength={100} /></label><label htmlFor="builds-email">Email address<input id="builds-email" name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} /></label></div>
    <label htmlFor="builds-service">Project type<select id="builds-service" name="service" defaultValue="" required><option value="" disabled>Select a project type</option><option value="website">A website or redesign</option><option value="application">A web app or product</option><option value="automation">Automation or integrations</option><option value="other">Something else</option></select></label>
    <label htmlFor="builds-message">Project details<textarea id="builds-message" name="message" rows={4} placeholder="What would you like to build?" required minLength={10} maxLength={5000} /></label>
    <div className="builds-form-bottom"><button className="builds-button" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending…" : "Send inquiry"}</button></div>
    <div className="builds-form-status" aria-live="polite" aria-atomic="true">{status === "success" && <p>Your inquiry was submitted successfully. This preview form doesn’t send an email yet.</p>}{status === "error" && <p role="alert">{error}</p>}</div>
  </form>;
}
