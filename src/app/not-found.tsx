import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="fixed inset-0 z-9999 min-h-screen w-full overflow-x-hidden overflow-y-auto bg-[#fdf5c9] text-[#26231f] selection:bg-[#ed7045] selection:text-white">
      {/* Bottom-Left Decorative Blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 z-0 h-52 w-80 rounded-[100%] bg-[#f7e396]/75 sm:h-64 sm:w-105"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 -left-12 z-0 h-36 w-36 rounded-full bg-[#f7e396]/75"
      />

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-360 items-center justify-between px-6 py-7 sm:px-12 lg:px-20">
        <Link href="/" aria-label="HopeNest Home" className="inline-block">
          <Image
            src="/logo.png"
            alt="HopeNest Logo"
            width={300}
            height={200}
            priority
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        <Link
          href="/"
          className="group flex items-center gap-1.5 border-b-[3px] border-[#ed794b] pb-1 text-base font-bold transition-colors hover:text-[#e66b3c] sm:text-xl"
        >
          Go home
          <ArrowUpRight
            size={22}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </header>

      {/* Main Content */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-115px)] w-full max-w-360 items-center gap-10 px-6 pb-14 sm:px-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-4 lg:px-20 lg:pb-20">
        {/* Left Content */}
        <div className="flex flex-col items-start pt-4 lg:pt-0">
          {/* Custom 404 Typography with Built-in Compass Zero */}
          <div className="relative inline-flex items-center select-none">
            {/* Splash Marks Above the Second 4 (Added 'absolute' here) */}
            <svg
              viewBox="0 0 60 55"
              className="pointer-events-none absolute -top-7 right-[13%] h-10 w-12 sm:-top-10 sm:h-14 sm:w-16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 42C16.5 30 15 18 15 9"
                stroke="#ed7045"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M33 46C38 35 44 25 50 17"
                stroke="#ed7045"
                strokeWidth="9"
                strokeLinecap="round"
              />
            </svg>

            <h1
              aria-label="404"
              className="flex items-center text-[110px] font-black leading-[0.88] tracking-[-0.06em] sm:text-[165px] lg:text-[195px]"
            >
              <span>4</span>

              {/* Custom 0 with Two-Tone Compass Needle */}
              <span className="relative mx-1 inline-flex items-center justify-center sm:mx-2">
                <svg
                  viewBox="0 0 150 164"
                  className="h-23 w-21 sm:h-34.5 sm:w-31.5 lg:h-40.5 lg:w-37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Thick Outer 0 Ring */}
                  <ellipse
                    cx="75"
                    cy="82"
                    rx="54"
                    ry="60"
                    stroke="#26231f"
                    strokeWidth="36"
                  />
                  {/* Top-Right Needle Half (Deep Orange) */}
                  <path
                    d="M103 54L63 70L87 94L103 54Z"
                    fill="#ed7045"
                    stroke="#ed7045"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* Bottom-Left Needle Half (Warm Gold) */}
                  <path
                    d="M47 110L63 70L87 94L47 110Z"
                    fill="#f3a867"
                    stroke="#f3a867"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span>4</span>
            </h1>
          </div>

          {/* Heading */}
          <h2 className="mt-5 max-w-135 text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-[56px]">
            Oops! This page
            <br />
            wandered off.
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-130 text-lg font-medium leading-relaxed text-[#4a4640] sm:text-[21px] sm:leading-normal">
            Looks like this page couldn&apos;t be found.
            <br className="hidden sm:block" />
            Let&apos;s get you back to making a difference.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-6 sm:gap-9">
            {/* Back to Home Button */}
            <Link
              href="/"
              className="group inline-flex items-center gap-3.5 rounded-full bg-[#26231f] px-7 py-4 text-base font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3a352e] hover:shadow-xl sm:px-8 sm:py-4.5 sm:text-lg"
            >
              {/* Solid White House Icon with Cutout Door */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3 2.3C11.7 1.9 12.3 1.9 12.7 2.3L21.7 10.7C22.2 11.2 21.8 12 21.1 12H19V20C19 20.6 18.6 21 18 21H14.5V15.5C14.5 14.9 14.1 14.5 13.5 14.5H10.5C9.9 14.5 9.5 14.9 9.5 15.5V21H6C5.4 21 5 20.6 5 20V12H2.9C2.2 12 1.8 11.2 2.3 10.7L11.3 2.3Z"
                  fill="white"
                />
              </svg>
              <span>Back to Home</span>
              <ArrowRight
                size={20}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            {/* Explore Events Link */}
            <Link
              href="/events"
              className="group inline-flex items-center gap-2.5 border-b-[3px] border-[#ed794b] pb-1 text-base font-extrabold transition-colors hover:text-[#e66b3c] sm:text-lg"
            >
              <span>Explore Events</span>
              <ArrowRight
                size={20}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative flex w-full items-center justify-center lg:justify-end">
          <Image
            src="/not-found.png"
            alt="A little explorer searching for the way home beside a signpost"
            width={900}
            height={730}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="h-auto w-full max-w-195 object-contain mix-blend-multiply lg:scale-105"
          />
        </div>
      </section>
    </main>
  );
}
