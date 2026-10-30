import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Send, Copy, Check, Mail, Download, AlertCircle, ExternalLink, ArrowRight } from "lucide-react";
import type { PortfolioConfig, ContactFormData, ContactFormErrors } from "@/types";
import { isValidEmail, copyToClipboard, prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";

interface ContactProps {
  data: PortfolioConfig;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function Contact({ data }: ContactProps) {
  const reduced = prefersReducedMotion();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (submitState === "submitting") return;
      if (!validate()) return;

      if (data.formServiceUrl) {
        setSubmitState("submitting");
        setStatusMessage("");
        try {
          const res = await fetch(data.formServiceUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(formData),
          });
          if (res.ok) {
            setSubmitState("success");
            setStatusMessage("Thank you! Your message has been sent successfully.");
            setFormData({ name: "", email: "", subject: "", message: "" });
          } else {
            setSubmitState("error");
            setStatusMessage("Failed to send message. Please reach out via email directly.");
          }
        } catch {
          setSubmitState("error");
          setStatusMessage("Connection error. Please try again or email directly.");
        }
      } else {
        const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
        const body = encodeURIComponent(
          `Hi Mahesh,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
        );
        window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
        setSubmitState("success");
        setStatusMessage("Preparing your inquiry in your default email client...");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }

      setTimeout(() => {
        setSubmitState("idle");
      }, 7000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData, data.formServiceUrl, data.email, submitState]
  );

  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(data.email);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputClasses =
    "w-full rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-4 py-3.5 text-base sm:text-sm text-[#f5f5f7] placeholder-[#86868b] transition-all focus:border-[#2997ff] focus:outline-none focus:ring-1 focus:ring-[#2997ff]";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#111111] px-6 py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(41,151,255,0.06)_0%,transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Contact"
          title="Let's build together."
          description="Have an opportunity, project, or question? Send an inquiry or reach out directly."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-14">
          {/* Left Column: Direct Inquiries (col-span-2) */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="space-y-6 lg:col-span-2"
          >
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-[#f5f5f7]">
                Direct Communication
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#a1a1a6]">
                I welcome conversations regarding full-time roles, contract engineering, and architecture consulting.
              </p>
            </div>

            {/* Email Card */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-5 transition-all hover:border-[rgba(255,255,255,0.22)]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]">
                <Mail size={13} className="text-[#2997ff]" />
                <span>Email Address</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <a
                  href={`mailto:${data.email}`}
                  className="text-sm font-semibold text-[#f5f5f7] hover:text-[#2997ff] transition-colors break-all"
                >
                  {data.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] px-3 py-1.5 text-xs font-medium text-[#f5f5f7] hover:border-[rgba(255,255,255,0.24)] transition-all cursor-pointer"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-[#2997ff]" />
                      <span className="text-[#2997ff]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Resume Request Card */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-5 transition-all hover:border-[rgba(255,255,255,0.22)]">
              {data.resumeUrl ? (
                <a
                  href={data.resumeUrl}
                  download
                  className="flex items-center justify-between text-sm font-medium text-[#f5f5f7] group"
                >
                  <div className="flex items-center gap-2.5">
                    <Download size={15} className="text-[#2997ff]" />
                    <span>Download Curriculum Vitae</span>
                  </div>
                  <span className="text-xs font-mono text-[#86868b]">PDF</span>
                </a>
              ) : (
                <a
                  href={`mailto:${data.email}?subject=${encodeURIComponent("Curriculum Vitae Request — Mahesh Kumar Mahato")}`}
                  className="flex items-center justify-between text-sm font-medium text-[#f5f5f7] group"
                >
                  <div className="flex items-center gap-2.5">
                    <Download size={15} className="text-[#2997ff]" />
                    <span>Curriculum Vitae</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[#2997ff] font-medium group-hover:underline">
                    Request via Email <ArrowRight size={12} />
                  </span>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]">
                Connect
              </p>
              <div className="flex gap-3">
                {data.social.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#161616] text-[#a1a1a6] transition-all hover:border-[rgba(255,255,255,0.24)] hover:text-[#f5f5f7]"
                    aria-label={`Visit my ${link.platform} profile`}
                  >
                    {link.icon === "github" ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Minimalist Form (col-span-3) */}
          <motion.form
            initial={{ opacity: 0, y: reduced ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[#161616] p-6 sm:p-8 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]"
                >
                  Name <span className="text-[#2997ff]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Appleseed"
                  className={inputClasses}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]"
                >
                  Email <span className="text-[#2997ff]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className={inputClasses}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]"
              >
                Subject <span className="text-[#2997ff]">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry or opportunity"
                className={inputClasses}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1.5 text-xs text-red-400" role="alert">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]"
              >
                Message <span className="text-[#2997ff]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Details about your goals, timeline, or engineering needs..."
                className={`${inputClasses} resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Status Message */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-4 text-xs font-medium leading-relaxed ${
                  submitState === "success"
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : submitState === "error"
                    ? "border border-red-500/30 bg-red-500/10 text-red-300"
                    : "border border-[rgba(255,255,255,0.12)] bg-[#1c1c1e] text-[#f5f5f7]"
                }`}
                role="status"
              >
                {statusMessage}
              </motion.div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2997ff] hover:bg-[#5eaeff] px-8 py-3.5 text-xs font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto cursor-pointer"
            >
              {submitState === "submitting" ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Processing...</span>
                </>
              ) : submitState === "success" ? (
                <>
                  <Check size={14} />
                  <span>Message Sent</span>
                </>
              ) : submitState === "error" ? (
                <>
                  <AlertCircle size={14} />
                  <span>Retry Send</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>{data.formServiceUrl ? "Send Message" : "Send Inquiry"}</span>
                  {!data.formServiceUrl && <ExternalLink size={12} className="opacity-70" />}
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
