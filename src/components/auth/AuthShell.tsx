import type { ReactNode } from "react";
import { Typography } from "antd";
import { Mails, Upload, Braces, Activity } from "lucide-react";

import { tokens } from "../layout/theme";

const { Title, Text } = Typography;

interface AuthShellProps {
  headline: string;
  subtext: string;
  children: ReactNode;
}

const FEATURES = [
  { icon: Upload, label: "Import audiences straight from a CSV" },
  { icon: Braces, label: "Map template variables per campaign, no code" },
  { icon: Activity, label: "Watch every send progress in real time" },
];

export default function AuthShell({
  headline,
  subtext,
  children,
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen">
      <div
        className="relative hidden w-[46%] flex-col justify-between overflow-hidden px-12 py-12 lg:flex"
        style={{ background: tokens.sidebarBg }}
      >
        {/* ambient accent glow */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: tokens.accent }}
        />

        <div className="relative flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: tokens.accent }}
          >
            <Mails size={20} className="text-white" />
          </div>
          <span
            className="text-lg text-white"
            style={{ fontFamily: tokens.fontDisplay, fontWeight: 600 }}
          >
            Bulk Mail
          </span>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <svg viewBox="0 0 360 220" className="w-full max-w-sm">
            <defs>
              <linearGradient id="fanLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor={tokens.accent} stopOpacity="0.9" />
                <stop offset="1" stopColor={tokens.accent} stopOpacity="0.15" />
              </linearGradient>
            </defs>

            <rect
              x="18"
              y="92"
              width="52"
              height="36"
              rx="6"
              fill={tokens.accent}
            />
            <path
              d="M18 96 L44 116 L70 96"
              stroke="#0B1120"
              strokeWidth="2.5"
              fill="none"
            />

            {[28, 64, 100, 136, 172].map((y, i) => (
              <path
                key={i}
                d={`M70 110 C 160 110, 200 ${y}, 300 ${y}`}
                stroke="url(#fanLine)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 5"
              />
            ))}

            {/* recipient dots */}
            {[28, 64, 100, 136, 172].map((y, i) => (
              <circle
                key={i}
                cx="304"
                cy={y}
                r="7"
                fill="#fff"
                fillOpacity={0.9 - i * 0.08}
              />
            ))}
          </svg>
        </div>

        <div className="relative space-y-4">
          <Title
            level={3}
            style={{
              color: "#fff",
              fontFamily: tokens.fontDisplay,
              marginBottom: 4,
            }}
          >
            {headline}
          </Title>
          <Text style={{ color: "#9BA3B7" }}>{subtext}</Text>

          <div className="space-y-3 pt-2">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "#141B33" }}
                >
                  <Icon size={15} color={tokens.accent} />
                </div>
                <Text style={{ color: "#C4C9D4", fontSize: 13.5 }}>
                  {label}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex w-full flex-1 items-center justify-center px-4 py-10 lg:w-[54%]"
        style={{ background: tokens.canvas }}
      >
        {children}
      </div>
    </div>
  );
}
