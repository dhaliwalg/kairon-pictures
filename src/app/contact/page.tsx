"use client";

import React, { useState, useRef } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import Link from "next/link";
import SubtleTextAnimation from "../components/SubtleTextAnimation";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "">(
    "",
  );

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    if (!form.current) return;

    //Gurjit's EmailJS Credentials, contact if anything needed
    emailjs
      .sendForm(
        "service_vtxdbhl",
        "template_tsy98u9", // Replace with your EmailJS template ID
        form.current,
        "h4qDCoPJfRSKwf4Sd", // Replace with your EmailJS public key
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          setSubmitStatus("success");
          if (form.current) {
            form.current.reset();
          }
        },
        (error: EmailJSResponseStatus) => {
          console.log(error.text);
          setSubmitStatus("error");
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Contact Information */}
          <div className="space-y-10 lg:space-y-12 lg:pt-8">
            <SubtleTextAnimation intensity="subtle">
              <div>
                <h1 className="text-4xl lg:text-6xl font-light text-black leading-tight mb-2">
                  Become a <span className="italic">Kaironiac</span>
                </h1>
              </div>
            </SubtleTextAnimation>

            <SubtleTextAnimation intensity="minimal">
              <div className="space-y-6 text-black">
                <div>
                  <p className="text-lg lg:text-xl font-normal">
                    Partner/EP Reece Daniels
                  </p>
                </div>
                <div>
                  <p className="text-lg lg:text-xl font-normal">
                    Partner/EP Aashish Joshi
                  </p>
                </div>
                <div>
                  <Link
                    href="mailto:hello@kaironpictures.com"
                    className="text-lg lg:text-xl font-normal hover:text-black/70 transition-colors duration-300 underline decoration-1 underline-offset-4 pointer-events-auto"
                  >
                    hello@kaironpictures.com
                  </Link>
                </div>
                <div>
                  <p className="text-lg lg:text-xl font-normal">
                    New York • Los Angeles
                  </p>
                </div>
              </div>
            </SubtleTextAnimation>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <SubtleTextAnimation intensity="subtle">
                <div className="text-black font-light py-2">
                  <p className="text-lg">Message sent successfully!</p>
                  <p className="text-base opacity-70">
                    We&apos;ll get back to you soon.
                  </p>
                </div>
              </SubtleTextAnimation>
            )}

            {submitStatus === "error" && (
              <SubtleTextAnimation intensity="subtle">
                <div className="text-black font-light py-2">
                  <p className="text-lg">Error sending message.</p>
                  <p className="text-base opacity-70">Please try again.</p>
                </div>
              </SubtleTextAnimation>
            )}
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:pt-16 pointer-events-auto">
            <form ref={form} onSubmit={sendEmail} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-black/70 mb-3 tracking-wider uppercase"
                    >
                      First Name
                    </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    required
                    className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black px-0 py-3 text-lg font-light text-black placeholder-black/40 focus:outline-none focus:ring-0 transition-colors duration-300"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="group">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-black/70 mb-3 tracking-wider uppercase"
                    >
                      Last Name
                    </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    required
                    className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black px-0 py-3 text-lg font-light text-black placeholder-black/40 focus:outline-none focus:ring-0 transition-colors duration-300"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black/70 mb-3 tracking-wider uppercase"
                  >
                    Email Address
                  </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black px-0 py-3 text-lg font-light text-black placeholder-black/40 focus:outline-none focus:ring-0 transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-black/70 mb-3 tracking-wider uppercase"
                  >
                    Message
                  </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black px-0 py-3 text-lg font-light text-black placeholder-black/40 focus:outline-none focus:ring-0 resize-none transition-colors duration-300"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <div className="pt-4">
                <SubtleTextAnimation intensity="subtle">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative bg-black hover:bg-black/80 disabled:bg-black/40 text-white font-light tracking-widest uppercase text-sm py-4 px-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 overflow-hidden"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Sending..." : "Submit"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </SubtleTextAnimation>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}