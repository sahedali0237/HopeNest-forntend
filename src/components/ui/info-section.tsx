import { CalendarPlus, HeartHandshake, Users, HandHeart } from "lucide-react";

const items = [
  {
    icon: CalendarPlus,
    title: "Create Events",
    text: "Organize your own social-impact activities.",
  },
  {
    icon: HeartHandshake,
    title: "Join a Volunteer",
    text: "Be a part of meaningful initiatives.",
  },
  {
    icon: Users,
    title: "Build Community",
    text: "Meet like-minded people in your area.",
  },
  {
    icon: HandHeart,
    title: "Create Change",
    text: "Small actions lead to big impacts.",
  },
];

const InfoSection = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-y-12 lg:gap-0 lg:divide-x lg:divide-emerald-100">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center lg:px-8"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-200/70">
                <Icon size={22} strokeWidth={2} className="text-emerald-800" />
              </div>

              <h3 className="mt-4 text-base font-bold text-[#0b3b2e]">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed max-w-[16rem]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
