import type { ThemeConfig } from "antd";

export const tokens = {
  // ─────────────────────────────────────
  // Surfaces
  // ─────────────────────────────────────
  canvas: "#F6F7FB",
  surface: "#FFFFFF",
  surfaceSubtle: "#F9FAFB",
  surfaceHover: "#F5F7FA",
  surfaceSoft:  "#F8F9FC",

  // ─────────────────────────────────────
  // Borders
  // ─────────────────────────────────────
  border: "#E4E7EC",
  borderStrong: "#D0D5DD",

  // ─────────────────────────────────────
  // Typography
  // ─────────────────────────────────────
  ink: "#101828",
  inkSecondary: "#344054",
  inkMuted: "#667085",
  inkSubtle: "#98A2B3",

  // ─────────────────────────────────────
  // Sidebar
  // ─────────────────────────────────────
  sidebarBg: "#0B1120",
  sidebarSurface: "#111827",
  sidebarActive: "#17203A",
  sidebarHover: "#141C2F",
  sidebarBorder: "#1D2939",
  sidebarText: "#98A2B3",
  sidebarTextActive: "#FFFFFF",

  // ─────────────────────────────────────
  // Brand
  // ─────────────────────────────────────
  accent: "#3B5BFD",
  accentHover: "#304CE0",
  accentActive: "#2940C7",
  accentSoft: "#EEF1FF",

  // ─────────────────────────────────────
  // Semantic
  // ─────────────────────────────────────
  success: "#16A34A",
  successSoft: "#ECFDF3",

  warning: "#D97706",
  warningSoft: "#FFFAEB",

  danger: "#DC2626",
  dangerSoft: "#FEF3F2",

  info: "#3B5BFD",
  infoSoft: "#EEF1FF",

  // ─────────────────────────────────────
  // Fonts
  // ─────────────────────────────────────
  fontDisplay: "'Sora', 'Inter', sans-serif",
  fontBody: "'Inter', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
};

const appTheme: ThemeConfig = {
  token: {
    // Brand
    colorPrimary: tokens.accent,
    colorLink: tokens.accent,
    colorInfo: tokens.info,

    // Semantic
    colorSuccess: tokens.success,
    colorWarning: tokens.warning,
    colorError: tokens.danger,

    // Backgrounds
    colorBgLayout: tokens.canvas,
    colorBgContainer: tokens.surface,
    colorBgElevated: tokens.surface,

    // Typography
    colorText: tokens.ink,
    colorTextSecondary: tokens.inkMuted,
    colorTextTertiary: tokens.inkSubtle,

    // Borders
    colorBorder: tokens.border,
    colorBorderSecondary: tokens.border,

    // Typography
    fontFamily: tokens.fontBody,
    fontSize: 14,
    fontSizeLG: 16,

    // Controls
    controlHeight: 40,
    controlHeightLG: 44,
    controlHeightSM: 32,

    // Radius
    borderRadius: 8,
    borderRadiusSM: 6,
    borderRadiusLG: 12,
    borderRadiusXS: 4,

    // Shadows
    boxShadow:
      "0 1px 2px rgba(16, 24, 40, 0.04)",

    boxShadowSecondary:
      "0 4px 12px rgba(16, 24, 40, 0.08)",
  },

  components: {
    // ───────────────────────────────────
    // Layout
    // ───────────────────────────────────
    Layout: {
      headerBg: tokens.surface,
      siderBg: tokens.sidebarBg,
      headerHeight: 64,
      headerPadding: "0 24px",
      bodyBg: tokens.canvas,
      footerBg: tokens.canvas,
    },

    // ───────────────────────────────────
    // Sidebar
    // ───────────────────────────────────
    Menu: {
      darkItemBg: "transparent",
      darkItemColor: tokens.sidebarText,

      darkItemHoverBg: tokens.sidebarHover,
      darkItemHoverColor: tokens.sidebarTextActive,

      darkItemSelectedBg: tokens.sidebarActive,
      darkItemSelectedColor: tokens.sidebarTextActive,

      darkSubMenuItemBg: tokens.sidebarBg,

      itemBorderRadius: 8,
      itemMarginInline: 12,
      itemMarginBlock: 4,
      itemHeight: 42,

      iconSize: 17,
    },

    // ───────────────────────────────────
    // Buttons
    // ───────────────────────────────────
    Button: {
      controlHeight: 40,
      controlHeightLG: 44,
      controlHeightSM: 32,

      borderRadius: 8,
      fontWeight: 500,

      primaryShadow: "none",
      defaultShadow: "none",
    },

    // ───────────────────────────────────
    // Inputs
    // ───────────────────────────────────
    Input: {
      controlHeight: 40,
      borderRadius: 8,

      activeBorderColor: tokens.accent,
      hoverBorderColor: tokens.accent,

      activeShadow: `0 0 0 2px ${tokens.accentSoft}`,
    },

    // ───────────────────────────────────
    // Select
    // ───────────────────────────────────
    Select: {
      controlHeight: 40,
      borderRadius: 8,

      optionSelectedBg: tokens.accentSoft,
    },

    // ───────────────────────────────────
    // Cards
    // ───────────────────────────────────
    Card: {
      borderRadiusLG: 12,

      headerFontSize: 16,
      headerFontSizeSM: 15,

      paddingLG: 24,

      boxShadowTertiary:
        "0 1px 3px rgba(16, 24, 40, 0.05)",
    },

    // ───────────────────────────────────
    // Modal
    // ───────────────────────────────────
    Modal: {
      borderRadiusLG: 14,

      paddingContentHorizontalLG: 28,
      paddingMD: 24,

      boxShadow:
        "0 20px 40px rgba(16, 24, 40, 0.12)",
    },

    // ───────────────────────────────────
    // Table
    // ───────────────────────────────────
    Table: {
      headerBg: tokens.surfaceSubtle,
      headerColor: tokens.inkSecondary,

      borderColor: tokens.border,

      rowHoverBg: tokens.surfaceHover,

      cellPaddingBlock: 14,
      cellPaddingInline: 16,
    },

    // ───────────────────────────────────
    // Tag
    // ───────────────────────────────────
    Tag: {
      borderRadiusSM: 6,
    },

    // ───────────────────────────────────
    // Progress
    // ───────────────────────────────────
    Progress: {
      lineBorderRadius: 10,
    },

    // ───────────────────────────────────
    // Form
    // ───────────────────────────────────
    Form: {
      labelColor: tokens.inkSecondary,
      labelFontSize: 14,
    },
  },
};

export default appTheme;