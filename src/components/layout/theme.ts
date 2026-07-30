import type { ThemeConfig } from "antd";

export const tokens = {
  canvas: "#F6F7FB",
  surface: "#FFFFFF",
  ink: "#12172B",
  inkMuted: "#6B7280",
  sidebarBg: "#0B1120",
  sidebarActive: "#17203A",
  sidebarBorder: "#1D2540",
  accent: "#3B5BFD",
  accentSoft: "#EEF1FF",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
  fontDisplay: "'Sora', 'Inter', sans-serif",
  fontBody: "'Inter', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
};

const appTheme: ThemeConfig = {
  token: {
    colorPrimary: tokens.accent,
    colorLink: tokens.accent,
    colorSuccess: tokens.success,
    colorWarning: tokens.warning,
    colorError: tokens.danger,
    colorBgLayout: tokens.canvas,
    colorBgContainer: tokens.surface,
    colorText: tokens.ink,
    colorTextSecondary: tokens.inkMuted,
    fontFamily: tokens.fontBody,
    borderRadius: 10,
    borderRadiusLG: 14,
    controlHeight: 38,
  },
  components: {
    Menu: {
      darkItemBg: tokens.sidebarBg,
      darkItemSelectedBg: tokens.sidebarActive,
      darkItemHoverBg: "#141B33",
      darkItemColor: "#9BA3B7",
      darkItemSelectedColor: "#FFFFFF",
      itemBorderRadius: 8,
      itemMarginInline: 12,
    },
    Layout: {
      headerBg: tokens.surface,
      siderBg: tokens.sidebarBg,
      headerHeight: 64,
      headerPadding: "0 20px",
    },
    Button: {
      controlHeight: 38,
      fontWeight: 500,
    },
  },
};

export default appTheme;