import React from "react";
import Link from "next/link";
import {
  Scale,
  UserCog,
  Ticket,
  CalendarCheck,
  ShieldAlert,
  Copyright,
  AlertTriangle,
  Mail,
  Calendar,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "Terms of Service | HopeNest",
  description:
    "Read the Terms of Service governing your use of the HopeNest event management platform.",
};

const termsSections = [
  {
    id: "acceptance-of-terms",
    icon: Scale,
    title: "1. Acceptance of Terms",
    content: [
      {
        subtitle: "Binding Agreement",
        text: "By accessing, browsing, or registering an account on HopeNest, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the platform.",
      },
      {
        subtitle: "Updates to Terms",
        text: "We may revise these terms periodically to reflect new features, legal requirements, or operational changes. Continued use of HopeNest after updates constitutes acceptance of the revised terms.",
      },
    ],
  },
  {
    id: "accounts-security",
    icon: UserCog,
    title: "2. User Accounts & Authentication",
    content: [
      {
        subtitle: "Account Accuracy",
        text: "You must provide accurate, complete, and current information when creating an account or signing in via OAuth providers (such as Google or GitHub).",
      },
      {
        subtitle: "Session & Credential Security",
        text: "You are responsible for safeguarding your account credentials and active sessions. Notify us immediately if you suspect any unauthorized access or security breach on your account.",
      },
    ],
  },
  {
    id: "event-organizers",
    icon: CalendarCheck,
    title: "3. Event Creation & Organizer Responsibilities",
    content: [
      {
        subtitle: "Accurate Event Listings",
        text: "Organizers must provide truthful and complete event details, including date, time, venue/online link, ticket pricing, and capacity limits.",
      },
      {
        subtitle: "Event Fulfillment & Cancellations",
        text: "Organizers are solely responsible for hosting their listed events, communicating schedule changes to attendees, and honoring stated cancellation or refund policies.",
      },
    ],
  },
  {
    id: "tickets-bookings",
    icon: Ticket,
    title: "4. Registrations, Tickets & Bookings",
    content: [
      {
        subtitle: "Valid Reservations",
        text: "Ticket bookings and RSVPs made through HopeNest are issued for personal or authorized attendee use. Misuse, unauthorized resale, or fraudulent booking activity may result in ticket cancellation.",
      },
      {
        subtitle: "Organizer Rules",
        text: "Attendees must comply with all venue safety protocols, age restrictions, and specific guidelines established by the event organizer.",
      },
    ],
  },
  {
    id: "prohibited-conduct",
    icon: ShieldAlert,
    title: "5. Prohibited Activities",
    content: [
      {
        subtitle: "Platform Integrity",
        text: "You agree not to post fraudulent or illegal events, spam attendees, scrape platform data, bypass authentication or route authorization checks, or interfere with HopeNest's servers and APIs.",
      },
      {
        subtitle: "Account Suspension",
        text: "We reserve the right to remove prohibited event listings and suspend or terminate accounts that violate these guidelines without prior notice.",
      },
    ],
  },
  {
    id: "intellectual-property",
    icon: Copyright,
    title: "6. Content & Intellectual Property",
    content: [
      {
        subtitle: "Platform Ownership",
        text: "HopeNest's branding, user interface design, code architecture, and original graphics are protected by copyright and intellectual property laws.",
      },
      {
        subtitle: "Organizer Content License",
        text: "You retain ownership of the text, banners, and media you upload for your events, but grant HopeNest a non-exclusive license to display and promote that content on the platform.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    icon: AlertTriangle,
    title: "7. Disclaimers & Limitation of Liability",
    content: [
      {
        subtitle: "Platform Role",
        text: "HopeNest provides the technical infrastructure for discovering and managing events. We are not the organizer or owner of third-party events listed on the platform and are not liable for event cancellations, venue incidents, or disputes between hosts and attendees.",
      },
    ],
  },
];

export default function TermsOfServicePage() {
  const lastUpdated = "November 2, 2026";

  return (
    <main className="min-h-screen bg-yellow-50 text-zinc-800 selection:bg-amber-200 selection:text-zinc-900">
      {/* Header Banner */}
      <div className="relative border-b border-yellow-200/80 bg-yellow-100/50 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-amber-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to HopeNest
          </Link>

          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/80 bg-amber-100/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-amber-900 uppercase">
              <Scale className="h-4 w-4 text-amber-700" />
              Platform Rules & Guidelines
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Terms of Service
            </h1>
            <p className="max-w-2xl text-base text-zinc-600 sm:text-lg">
              Please read these terms carefully before creating events, booking
              tickets, or managing your account on HopeNest.
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Sticky Quick Navigation (Desktop) */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 rounded-2xl border border-yellow-200/90 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <h2 className="mb-4 text-xs font-bold tracking-wider text-zinc-500 uppercase">
                On this page
              </h2>
              <nav className="flex flex-col space-y-2.5">
                {termsSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-amber-700"
                  >
                    {section.title}
                  </a>
                ))}
                <a
                  href="#contact-legal"
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-amber-700"
                >
                  8. Contact & Support
                </a>
              </nav>

              <div className="mt-6 border-t border-yellow-200/80 pt-4">
                <p className="text-xs text-zinc-500">
                  Looking for how we handle your data?{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-amber-700 underline underline-offset-2 hover:text-amber-800"
                  >
                    Read our Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </aside>

          {/* Terms Sections */}
          <div className="space-y-6 lg:col-span-8">
            {termsSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 rounded-2xl border border-yellow-200/90 bg-white p-6 shadow-sm transition-all hover:border-amber-300 hover:shadow-md sm:p-8"
                >
                  <div className="mb-6 flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-yellow-100/80 text-amber-700">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {section.content.map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <h3 className="text-sm font-semibold text-zinc-900">
                          {item.subtitle}
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-600">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Contact Card */}
            <section
              id="contact-legal"
              className="scroll-mt-24 rounded-2xl border border-amber-300 bg-linear-to-br from-yellow-100/90 via-amber-50 to-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-amber-700">
                    <Mail className="h-5 w-5" />
                    <h2 className="text-lg font-bold text-zinc-900">
                      8. Questions About These Terms?
                    </h2>
                  </div>
                  <p className="max-w-xl text-sm text-zinc-600">
                    If you need clarification on organizer responsibilities,
                    ticketing rules, or account policies on HopeNest, get in
                    touch with our team.
                  </p>
                </div>

                <a
                  href="mailto:support@hopenest.com"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-yellow-50 shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.98]"
                >
                  Contact Support
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
