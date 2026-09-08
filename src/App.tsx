import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  FileText,
  Calculator,
  Stethoscope,
  ShoppingBag,
  Sparkles,
  Zap,
  Moon,
  Sun,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  href: string;
  status?: "live" | "dev";
};

const projects: Project[] = [
  {
    title: "Cheque Deposit",
    description: "බැංකු චෙක්පත් තැන්පතු පද්ධතිය",
    icon: CreditCard,
    color: "from-sky-500 to-cyan-400",
    href: "https://cheque-deposit.netlify.app",
    status: "live",
  },
  {
    title: "Duplicate Insurance Card",
    description: "රක්ෂණ ලිපි කළමනාකරණය",
    icon: FileText,
    color: "from-violet-500 to-fuchsia-500",
    href: "https://duplicat-insurance-letter.netlify.app",
    status: "live",
  },
  {
    title: "PD Cheque Deposit Form",
    description: "ඉදිරිදාතම චෙක් තැම්පතු පත්‍රිකාව",
    icon: CreditCard,
    color: "from-indigo-500 to-violet-500",
    href: "https://magenta-paprenjak-c068ee.netlify.app",
    status: "live",
  },
  {
    title: "Rental Calculation",
    description: "ණය වාරික ගණනය කිරීම",
    icon: Calculator,
    color: "from-blue-500 to-indigo-500",
    href: "https://loan-calculotar.netlify.app/",
    status: "live",
  },
  {
    title: "Stock Management",
    description: "කාර්යාල ලිපිද්‍රව්‍ය කළමනාකරණය",
    icon: FileText,
    color: "from-purple-500 to-indigo-500",
    href: "https://office-stationary-updet.netlify.app",
    status: "live",
  },
  {
    title: "HealthTrack",
    description: "මගේ වෛද්‍ය වාර්තා - සංවර්ධනය කරමින් පවතී",
    icon: Stethoscope,
    color: "from-teal-500 to-emerald-500",
    href: "https://healthtrack-medical.netlify.app/",
    status: "dev",
  },
  {
    title: "Blank",
    description: "ංවර්ධනය කරමින් පවතී",
    icon: ShoppingBag,
    color: "from-rose-500 to-pink-500",
    href: ".........",
    status: "dev",
  },
  {
    title: "Salary Calculator",
    description: "වැටුප් ගණනය කිරීම්",
    icon: Calculator,
    color: "from-emerald-500 to-green-500",
    href: "https://udaya-salry-cal.netlify.app",
    status: "live",
  },
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dt = now - lastMousePos.current.time;
      
      if (dt > 0) {
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;
        setVelocity(speed);
      }
      
      lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen w-full overflow-hidden relative font-sans transition-colors duration-700 flex flex-col items-center justify-center",
        isDarkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900"
      )}
    >
      {/* Ambient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute rounded-full blur-3xl transition-colors duration-700",
            isDarkMode ? "bg-indigo-600/20" : "bg-indigo-300/30"
          )}
          style={{
            width: "32rem",
            height: "32rem",
            top: "-8rem",
            left: "-8rem",
          }}
        />
        <div
          className={cn(
            "absolute rounded-full blur-3xl transition-colors duration-700",
            isDarkMode ? "bg-fuchsia-600/20" : "bg-rose-300/30"
          )}
          style={{
            width: "28rem",
            height: "28rem",
            bottom: "-6rem",
            right: "-6rem",
          }}
        />
      </div>

      {/* Mouse follower glow - brighter and more visible in dark mode */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full blur-2xl"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: Math.max(0.4, 1 - velocity * 0.05),
          opacity: Math.max(0.3, 0.6 - velocity * 0.02),
        }}
        transition={{
          x: { duration: 0.15, ease: "easeOut" },
          y: { duration: 0.15, ease: "easeOut" },
          scale: { duration: 0.15 },
          opacity: { duration: 0.15 },
        }}
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(199, 210, 254, 0.5) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)",
          width: "20rem",
          height: "20rem",
          marginLeft: "-10rem",
          marginTop: "-10rem",
        }}
      />

      {/* Theme toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDarkMode((m) => !m)}
          className={cn(
            "relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95",
            isDarkMode
              ? "bg-slate-800/80 backdrop-blur-md border border-slate-700"
              : "bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg"
          )}
          aria-label="Toggle theme"
        >
          <div className="relative w-5 h-5">
            <Sun
              className={cn(
                "absolute inset-0 w-5 h-5 transition-all duration-500",
                isDarkMode
                  ? "opacity-0 rotate-90 scale-0"
                  : "opacity-100 rotate-0 scale-100 text-amber-500"
              )}
            />
            <Moon
              className={cn(
                "absolute inset-0 w-5 h-5 transition-all duration-500",
                isDarkMode
                  ? "opacity-100 rotate-0 scale-100 text-indigo-300"
                  : "opacity-0 -rotate-90 scale-0"
              )}
            />
          </div>
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-medium tracking-wide text-indigo-300">
              Interactive Portfolio
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              Simple Web Application
            </span>
          </h1>
          <p
            className={cn(
              "text-lg md:text-xl font-light",
              isDarkMode ? "text-slate-400" : "text-slate-600"
            )}
          >
            Portfolio of Web Projects —{" "}
            <span className="font-medium text-indigo-400">Udaya Bandara</span>
          </p>
        </motion.header>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className={cn(
                "group relative block rounded-2xl p-6 border transition-all duration-300 overflow-hidden",
                isDarkMode
                  ? "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl"
              )}
            >
              {/* gradient sheen on hover */}
              <div
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                  project.color
                )}
                style={{ opacity: 0 }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                      project.color
                    )}
                  >
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  {project.status === "dev" ? (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      In Dev
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                      Live
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold mb-1.5 leading-tight">
                  {project.title}
                </h3>
                <p
                  className={cn(
                    "text-sm leading-relaxed mb-5",
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  {project.description}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  <span>Visit Project</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className={cn(
            "mt-20 pt-8 border-t text-center text-sm",
            isDarkMode
              ? "border-slate-800 text-slate-500"
              : "border-slate-200 text-slate-500"
          )}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="font-medium text-slate-400">Udaya Bandara</span>
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <p>kasubsampath@gmail.com · +94 71 6 2424 55 · Kegalle, Sri Lanka</p>
          <p className="mt-2 text-xs opacity-60">© 2025 Developed By Udaya Bandara</p>
        </motion.footer>
      </div>
    </div>
  );
}
