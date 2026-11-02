import Link from "next/link";
import {
  Users,
  Send,
  Code2,
  Heart,
  ArrowRight,
  Mail,
  MapPin,
  CalendarDays,
  Info,
  ShieldCheck,
  FileText,
  Cookie,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().toLocaleDateString();

  const quickLinks = [
    { name: "Home", href: "/", icon: Info },
    { name: "Upcoming Events", href: "/events", icon: CalendarDays },
    { name: "About Us", href: "/about", icon: Users },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy", icon: ShieldCheck },
    { name: "Terms of Service", href: "/terms", icon: FileText },
  ];

  const socialLinks = [
    {
      name: "Twitter / X",
      href: "https://x.com/yourusername",
      icon: Send,
    },
    {
      name: "GitHub",
      href: "https://github.com/yourusername",
      icon: Code2,
    },
  ];

  return (
    <footer className="w-full bg-[#041f17] border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 pb-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center shrink-0 gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="HopeNest Logo"
                width={250}
                height={200}
                className="w-32 h-auto"
                priority
              />
            </Link>

            <p className="text-[14px] leading-7 text-slate-300 max-w-xs">
              Connecting people and empowering communities through shared
              events, meaningful interactions, and positive change.
            </p>

            <div className="flex items-center gap-2 mt-5 text-sm text-emerald-300">
              <Heart size={15} className="fill-emerald-400 text-emerald-400" />
              <span>Making communities stronger together.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-3 text-sm text-slate-300 hover:text-emerald-400 transition-colors duration-200 group"
                    >
                      <Icon
                        size={16}
                        className="text-slate-500 group-hover:text-emerald-400 transition-colors"
                      />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base font-semibold text-white mb-6">
              Legal & Support
            </h3>

            <ul className="space-y-4">
              {legalLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-3 text-sm text-slate-300 hover:text-emerald-400 transition-colors duration-200 group"
                    >
                      <Icon
                        size={16}
                        className="text-slate-500 group-hover:text-emerald-400 transition-colors"
                      />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-semibold text-white mb-3">
              Stay Connected
            </h3>

            <p className="text-sm text-slate-300 leading-6 mb-5">
              Get updates about upcoming events, community activities, and
              opportunities to make a difference.
            </p>

            <form className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="w-full min-w-0 bg-[#082b20] border border-emerald-900 rounded-lg pl-10 pr-3 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white transition-all duration-200"
              >
                <ArrowRight size={19} />
              </button>
            </form>

            <p className="text-xs text-slate-400 mt-3">
              No spam. Just meaningful updates.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-900/60 pt-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-sm text-slate-400 text-center md:text-left">
            © {currentYear}{" "}
            <span className="text-slate-200 font-medium">HopeNest</span>. All
            rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#082b20] border border-emerald-900/70 text-slate-300 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin size={14} className="text-emerald-400" />
            <span>Built for stronger communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
