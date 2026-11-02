import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Share2,
  Cookie,
  UserCheck,
  Mail,
  Calendar,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | HopeNest",
  description:
    "Learn how HopeNest collects, uses, and protects your personal information and event data.",
};

const policySections = [
  {
    id: "information-we-collect",
    icon: Database,
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Account & Authentication Data",
        text: "When you register or sign in to HopeNest (including via third-party OAuth providers like Google or GitHub), we collect your name, email address, profile picture, and authentication tokens managed securely through our authentication system.",
      },
      {
        subtitle: "Event & Booking Information",
        text: "When you create, host, or RSVP to an event, we collect event details, ticket selections, attendee lists, and organizational preferences necessary to facilitate your experience.",
      },
      {
        subtitle: "Technical & Usage Data",
        text: "We automatically collect device metadata, IP addresses, browser type, and session logs to maintain platform security, prevent automated abuse, and optimize performance.",
      },
    ],
  },
  {
    id: "how-we-use-data",
    icon: Eye,
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "Platform Operations",
        text: "To authenticate your sessions, process event registrations, issue digital tickets, and allow event organizers to manage guest lists.",
      },
      {
        subtitle: "Communications",
        text: "To send transactional emails, booking confirmations, event reminders, schedule updates, and critical security alerts.",
      },
      {
        subtitle: "Platform Improvement",
        text: "To analyze aggregate usage trends, debug technical issues, and enhance user interface responsiveness.",
      },
    ],
  },
  {
    id: "data-sharing",
    icon: Share2,
    title: "3. Information Sharing & Disclosure",
    content: [
      {
        subtitle: "With Event Organizers",
        text: "When you register for an event on HopeNest, your name, email address, and ticket status are shared with the designated host or organizer of that specific event.",
      },
      {
        subtitle: "Service Providers",
        text: "We work with trusted third-party infrastructure providers (such as database hosting, authentication services, and email delivery networks) strictly to operate the platform. We never sell your personal data to advertisers.",
      },
    ],
  },
  {
    id: "cookies-sessions",
    icon: Cookie,
    title: "4. Cookies & Session Management",
    content: [
      {
        subtitle: "Essential Authentication Cookies",
        text: "HopeNest uses secure, HTTP-only session cookies and JSON Web Tokens (JWT) to keep you signed in and protect your account against Cross-Site Request Forgery (CSRF).",
      },
      {
        subtitle: "Preference Storage",
        text: "We use local storage and cookies to remember your UI preferences and filter states across sessions.",
      },
    ],
  },
  {
    id: "data-security",
    icon: Lock,
    title: "5. Data Security",
    content: [
      {
        subtitle: "Protection Measures",
        text: "We implement industry-standard encryption in transit (HTTPS/TLS), hashed credentials, role-based route authorization, and strict database access controls to safeguard your personal information.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "6. Your Rights & Choices",
    content: [
      {
        subtitle: "Access, Update & Deletion",
        text: "You can review and update your profile details directly from your dashboard at any time. You may also request complete deletion of your account and associated personal data by contacting our support team.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="h-4 w-4 text-amber-700" />
              Trust & Transparency
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="max-w-2xl text-base text-zinc-600 sm:text-lg">
              At HopeNest, we respect your privacy and are committed to
              protecting the personal data you share when discovering, creating,
              and managing events.
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
                {policySections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-amber-700"
                  >
                    {section.title}
                  </a>
                ))}
                <a
                  href="#contact-us"
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-amber-700"
                >
                  7. Contact Us
                </a>
              </nav>
            </div>
          </aside>

          {/* Policy Sections */}
          <div className="space-y-6 lg:col-span-8">
            {policySections.map((section) => {
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
              id="contact-us"
              className="scroll-mt-24 rounded-2xl border border-amber-300 bg-linear-to-br from-yellow-100/90 via-amber-50 to-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-amber-700">
                    <Mail className="h-5 w-5" />
                    <h2 className="text-lg font-bold text-zinc-900">
                      7. Questions or Data Requests?
                    </h2>
                  </div>
                  <p className="max-w-xl text-sm text-zinc-600">
                    If you have any questions about this Privacy Policy, want to
                    exercise your data rights, or need to report a security
                    concern on HopeNest, reach out to our team.
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
