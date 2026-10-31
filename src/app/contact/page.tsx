"use client";

import { Mail, Phone, MapPin, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <section className="py-24 bg-yellow-50 min-h-screen text-yellow-900 font-sans selection:bg-yellow-200 selection:text-yellow-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-300/20 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Contact Header */}
        <div className="mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 border border-yellow-200 px-4 py-1.5 text-sm font-medium text-yellow-800 mb-6 backdrop-blur-sm">
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM4 18h16v-2H4v2zm0-4h16v-2H4v2zm0-4v2h16v-2H4z" />
            </svg>
            Contact HopeNest
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-yellow-950 mb-6">
            Get In <span className="text-yellow-600">Touch.</span>
          </h1>
          <p className="text-lg text-yellow-800/80 leading-relaxed max-w-2xl">
            Have questions or need support? Reach out to our team using the form
            below or find us at our physical location. We&apos;re here to help
            build the community.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-20 relative z-10">
          {/* Left: Contact Form (Warm Glassmorphism) */}
          <div className="lg:col-span-2 p-8 md:p-10 rounded-3xl bg-white/60 backdrop-blur-md border border-yellow-200/60 shadow-xl shadow-yellow-600/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-yellow-900">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/50 border border-yellow-200 rounded-xl px-4 py-3 text-yellow-950 placeholder-yellow-700/50 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-yellow-900">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/50 border border-yellow-200 rounded-xl px-4 py-3 text-yellow-950 placeholder-yellow-700/50 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-900">
                  Subject
                </label>
                <div className="relative">
                  <select className="w-full bg-white/50 border border-yellow-200 rounded-xl px-4 py-3 text-yellow-950 appearance-none focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all cursor-pointer">
                    <option
                      value="General Inquiry"
                      className="bg-white text-yellow-950"
                    >
                      General Inquiry
                    </option>
                    <option
                      value="Partnership"
                      className="bg-white text-yellow-950"
                    >
                      Partnership
                    </option>
                    <option
                      value="Volunteer"
                      className="bg-white text-yellow-950"
                    >
                      Volunteer
                    </option>
                    <option value="Press" className="bg-white text-yellow-950">
                      Press
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-yellow-700/50">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-900">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-white/50 border border-yellow-200 rounded-xl px-4 py-3 text-yellow-950 placeholder-yellow-700/50 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all resize-none"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] shadow-sm"
              >
                Send Message <ArrowRight className="size-4" />
              </button>
            </form>
          </div>

          {/* Right: Contact Details */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-yellow-200/60 h-full shadow-lg shadow-yellow-600/5">
              <h3 className="text-2xl font-bold text-yellow-950 mb-8">
                Contact Details
              </h3>

              <div className="space-y-8">
                {/* Address */}
                <div className="group flex items-start gap-4">
                  <div className="size-12 rounded-2xl bg-yellow-100 border border-yellow-200 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-yellow-300 transition-all duration-300">
                    <MapPin className="size-5 text-yellow-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-yellow-950 mb-1 block">
                      Address
                    </span>
                    <p className="text-sm text-yellow-800/80 leading-relaxed">
                      123 Community Street,
                      <br />
                      City, Country
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-start gap-4">
                  <div className="size-12 rounded-2xl bg-yellow-100 border border-yellow-200 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-yellow-300 transition-all duration-300">
                    <Phone className="size-5 text-yellow-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-yellow-950 mb-1 block">
                      Phone
                    </span>
                    <a
                      href="tel:+15551234567"
                      className="text-sm text-yellow-800/80 hover:text-yellow-600 transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="group flex items-start gap-4">
                  <div className="size-12 rounded-2xl bg-yellow-100 border border-yellow-200 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-yellow-300 transition-all duration-300">
                    <Mail className="size-5 text-yellow-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-yellow-950 mb-1 block">
                      Email
                    </span>
                    <a
                      href="mailto:info@hopenest.io"
                      className="text-sm text-yellow-800/80 hover:text-yellow-600 transition-colors"
                    >
                      info@hopenest.io
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="group flex items-start gap-4">
                  <div className="size-12 rounded-2xl bg-yellow-100 border border-yellow-200 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-yellow-300 transition-all duration-300">
                    <Globe className="size-5 text-yellow-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-yellow-950 mb-1 block">
                      Hours
                    </span>
                    <p className="text-sm text-yellow-800/80 leading-relaxed">
                      Mon-Fri: 9am - 6pm
                      <br />
                      Sat: 10am - 4pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Footer */}
        <div className="mt-16 pt-12 border-t border-yellow-200/80 relative z-10">
          <h3 className="text-lg font-semibold text-yellow-950 mb-6">
            Quick Links
          </h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {[
              { name: "Home", path: "/" },
              { name: "Upcoming Events", path: "/events" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Create Event", path: "/create-events" },
              { name: "Privacy Policy", path: "/privacy" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className="text-sm text-yellow-800/80 hover:text-yellow-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
