"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { StaggerContainer } from "@/app/hooks/useStaggerAnimation";

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

    // Get environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          setSubmitStatus("success");
          if (form.current) {
            form.current.reset();
          }
        },
        () => {
          setSubmitStatus("error");
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-8 sm:py-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Mobile: Single column, Desktop: Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-20 items-start">
          {/* Left Side - Contact Information with Stagger */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:space-y-12 lg:pt-8 order-1 lg:order-1">
            <StaggerContainer
              options={{
                delay: 0.1,
                stagger: 0.15,
                duration: 0.8,
                from: "start",
                y: 40,
                selector: ".contact-info-item",
                setInitialStyles: false,
              }}
            >
              <div className="contact-info-item">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light text-black leading-tight mb-2">
                  Become a <span className="font-medium">Kaironiac</span>
                </h1>
              </div>

              <div className="contact-info-item space-y-4 sm:space-y-6 text-black">
                <div>
                  <p className="text-base sm:text-lg lg:text-xl font-normal">
                    Partner/EP Reece Daniels
                  </p>
                </div>
                <div>
                  <p className="text-base sm:text-lg lg:text-xl font-normal">
                    Partner/EP Aashish Joshi
                  </p>
                </div>
                <div>
                  <Link
                    href="mailto:hello@kaironpictures.com"
                    className="text-base sm:text-lg lg:text-xl font-normal hover:text-black/70 transition-colors duration-300 underline decoration-1 underline-offset-4 pointer-events-auto"
                  >
                    hello@kaironpictures.com
                  </Link>
                </div>
                <div>
                  <p className="text-base sm:text-lg lg:text-xl font-normal">
                    New York • Los Angeles
                  </p>
                </div>
              </div>
            </StaggerContainer>

            {/* Status Messages with Stagger */}
            {submitStatus === "success" && (
              <StaggerContainer
                className="text-black font-light py-2"
                options={{
                  delay: 0.1,
                  selector: ".status-message",
                  setInitialStyles: false,
                }}
              >
                <div className="status-message">
                  <p className="text-base sm:text-lg">
                    Message sent successfully!
                  </p>
                  <p className="text-sm sm:text-base opacity-70">
                    We&apos;ll get back to you soon.
                  </p>
                </div>
              </StaggerContainer>
            )}

            {submitStatus === "error" && (
              <StaggerContainer
                className="text-black font-light py-2"
                options={{
                  delay: 0.1,
                  selector: ".status-message",
                  setInitialStyles: false,
                }}
              >
                <div className="status-message">
                  <p className="text-base sm:text-lg">Error sending message.</p>
                  <p className="text-sm sm:text-base opacity-70">
                    Please try again.
                  </p>
                </div>
              </StaggerContainer>
            )}
          </div>

          {/* Right Side - Contact Form with Stagger */}
          <div className="lg:pt-16 pointer-events-auto order-2 lg:order-2">
            <StaggerContainer
              options={{
                delay: 0.4,
                stagger: 0.1,
                duration: 0.7,
                from: "start",
                y: 30,
                selector: ".form-field",
                setInitialStyles: false,
              }}
            >
              <form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-6 sm:space-y-8"
              >
                <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="group">
                    <label
                      htmlFor="first_name"
                      className="block text-xs sm:text-sm font-medium text-black/70 mb-2 sm:mb-3 tracking-wider uppercase"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      required
                      className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black px-0 py-2 sm:py-3 text-base sm:text-lg font-light text-black placeholder-black/40 focus:outline-none focus:ring-0 transition-colors duration-300"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="last_name"
                      className="block text-xs sm:text-sm font-medium text-black/70 mb-2 sm:mb-3 tracking-wider uppercase"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      required
                      className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black px-0 py-2 sm:py-3 text-base sm:text-lg font-light text-black placeholder-black/40 focus:outline-none focus:ring-0 transition-colors duration-300"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="form-field group">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-black/70 mb-2 sm:mb-3 tracking-wider uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black px-0 py-2 sm:py-3 text-base sm:text-lg font-light text-black placeholder-black/40 focus:outline-none focus:ring-0 transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-field group">
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-black/70 mb-2 sm:mb-3 tracking-wider uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black px-0 py-2 sm:py-3 text-base sm:text-lg font-light text-black placeholder-black/40 focus:outline-none focus:ring-0 resize-none transition-colors duration-300"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <div className="form-field pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative bg-black hover:bg-black/80 disabled:bg-black/40 text-white font-light tracking-widest uppercase text-xs sm:text-sm py-3 sm:py-4 px-8 sm:px-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 overflow-hidden w-full sm:w-auto"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Sending..." : "Submit"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              </form>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
