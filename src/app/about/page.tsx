"use client";

import { Calendar, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <section className="py-24 bg-yellow-50 min-h-screen text-yellow-900 font-sans selection:bg-yellow-200 selection:text-yellow-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header/Intro Section */}
        <div className="mb-20 text-center md:text-left flex flex-col items-center md:items-start relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 border border-yellow-200 px-4 py-1.5 text-sm font-medium text-yellow-800 mb-6 backdrop-blur-sm">
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 7v6l4 2-4 2v6h-8v-6L8 5v2h4z" />
            </svg>
            About HopeNest
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-7xl font-bold tracking-tight text-yellow-950 mb-6">
            Building Communities <br className="hidden md:block" />
            Through <span className="text-yellow-600">Events.</span>
          </h1>
          <p className="text-lg text-yellow-800/80 leading-relaxed max-w-2xl">
            HopeNest is a community-driven platform designed to connect
            volunteers, organizers, and donors around meaningful social-impact
            events. From plant drives and donation collections to community
            cleanups, we make it easy to create, discover, and participate in
            events that matter.
          </p>
        </div>

        {/* Mission, Vision & Impact Cards (Warm Glassmorphism) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Mission Card */}
          <div className="group relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-md border border-yellow-200/60 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-600/10 transition-all duration-500">
            <div className="relative h-56 w-full">
              <Image
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80"
                alt="Hands nurturing a growing plant"
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-yellow-50 via-yellow-50/80 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="size-12 flex items-center justify-center rounded-2xl bg-yellow-100 border border-yellow-200 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="size-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-950 group-hover:text-yellow-700 transition-colors">
                Our Mission
              </h3>
              <p className="mt-2 text-sm text-yellow-800/80 leading-relaxed">
                Empowering volunteers and organizers to create social impact
                through accessible, transparent, and community-driven event
                management.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-md border border-yellow-200/60 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-600/10 transition-all duration-500">
            <div className="relative h-56 w-full">
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                alt="Community members collaborating"
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-50 via-yellow-50/80 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="size-12 flex items-center justify-center rounded-2xl bg-yellow-100 border border-yellow-200 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="size-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-950 group-hover:text-yellow-700 transition-colors">
                Our Vision
              </h3>
              <p className="mt-2 text-sm text-yellow-800/80 leading-relaxed">
                A world where anyone can easily find and participate in events
                that strengthen communities and create lasting positive change.
              </p>
            </div>
          </div>

          {/* Impact Card */}
          <div className="group relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-md border border-yellow-200/60 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-600/10 transition-all duration-500">
            <div className="relative h-56 w-full">
              <Image
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
                alt="Community cleanup event"
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-50 via-yellow-50/80 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="size-12 flex items-center justify-center rounded-2xl bg-yellow-100 border border-yellow-200 mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="size-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-950 group-hover:text-yellow-700 transition-colors">
                Impact
              </h3>
              <p className="mt-2 text-sm text-yellow-800/80 leading-relaxed">
                Over 500+ events organized, 10,000+ volunteers empowered, and
                growing every day. Join us in building stronger communities.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="rounded-3xl bg-white/40 border border-yellow-200/80 p-8 md:p-12 backdrop-blur-sm shadow-sm">
          <h2 className="text-3xl font-bold text-yellow-950 mb-10 text-center md:text-left">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create or Discover",
                desc: "Organizers can create events, or browse upcoming events in your area.",
              },
              {
                step: "2",
                title: "Register",
                desc: "Sign up to volunteer, donate, or support the event that fits your passion.",
              },
              {
                step: "3",
                title: "Participate",
                desc: "Show up, engage directly, and make a difference in your community.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center md:items-start md:text-left gap-4 p-6 rounded-2xl hover:bg-yellow-100/50 transition-colors border border-transparent hover:border-yellow-200/50"
              >
                <div className="size-12 rounded-full bg-yellow-200/50 border border-yellow-300 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-yellow-700">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-yellow-950 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-yellow-800/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get Involved CTA */}
        <div className="relative mt-24 rounded-3xl overflow-hidden min-h-[400px] flex items-center border border-yellow-200 shadow-lg group">
          <Image
            src="https://images.unsplash.com/photo-1578665475429-4e971e8332c4?auto=format&fit=crop&w=1600&q=80"
            alt="Community event with people gathered"
            fill
            className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/90 via-yellow-900/70 to-transparent" />

          <div className="relative w-full max-w-3xl px-8 md:px-16 py-16 md:py-24 z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Ready to Make <br className="hidden sm:block" /> a{" "}
              <span className="text-yellow-400">Difference?</span>
            </h2>
            <p className="text-yellow-50 text-lg mb-10 max-w-xl leading-relaxed">
              Whether you want to create an event, volunteer your time, or
              donate to a cause, HopeNest makes it simple. Join our growing
              community today.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/events"
                className="bg-yellow-400 text-yellow-950 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] text-center shadow-md"
              >
                Browse Events
              </Link>
              <Link
                href="/create-events"
                className="bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:bg-white/20 hover:border-white/50 text-center"
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
