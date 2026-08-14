import type { ThemeConfig } from "antd";

/**
 * ============================================================
 * BULK MAIL — DESIGN TOKENS
 * ============================================================
 *
 * This is the application's visual language.
 *
 * Components should prefer these tokens instead of introducing
 * random colors, shadows, spacing, or radii.
 */
export const tokens = {
  // ─────────────────────────────────────
  // Surfaces
  // ─────────────────────────────────────

  /**
   * Main application background.
   * Used behind cards and content sections.
   */
  canvas: "#F5F7FB",

  /**
   * Primary surface.
   * Cards, panels, header, modals, etc.
   */
  surface: "#FFFFFF",

  /**
   * Slightly darker surface for headers,
   * table headers and secondary areas.
   */
  surfaceSubtle: "#F8FAFC",

  /**
   * Hover state for surfaces.
   */
  surfaceHover: "#F3F5F9",

  /**
   * Soft elevated area.
   * Useful for previews, empty states and
   * secondary content.
   */
  surfaceSoft: "#F8F9FC",

  /**
   * Slightly stronger elevated surface.
   */
  surfaceElevated: "#FCFCFD",

  // ─────────────────────────────────────
  // Borders
  // ─────────────────────────────────────

  border: "#E5E7EB",
  borderStrong: "#D0D5DD",
  borderSubtle: "#EEF0F3",

  // ─────────────────────────────────────
  // Typography
  // ─────────────────────────────────────

  ink: "#101828",
  inkSecondary: "#344054",
  inkMuted: "#667085",
  inkSubtle: "#98A2B3",

  /**
   * Used for disabled/very low emphasis content.
   */
  inkDisabled: "#B0B8C4",

  // ─────────────────────────────────────
  // Sidebar
  // ─────────────────────────────────────

  /**
   * Deep navy rather than pure black.
   * Gives the application a premium SaaS feel.
   */
  sidebarBg: "#0B1120",

  /**
   * Slightly lighter sidebar surface.
   */
  sidebarSurface: "#111827",

  /**
   * Active navigation item.
   */
  sidebarActive: "#18233F",

  /**
   * Navigation hover state.
   */
  sidebarHover: "#131C31",

  /**
   * Sidebar divider.
   */
  sidebarBorder: "#1E293B",

  /**
   * Normal navigation text.
   */
  sidebarText: "#94A3B8",

  /**
   * Active navigation text.
   */
  sidebarTextActive: "#FFFFFF",

  /**
   * Sidebar icon emphasis.
   */
  sidebarIcon: "#64748B",

  /**
   * Active sidebar icon.
   */
  sidebarIconActive: "#8EA2FF",

  // ─────────────────────────────────────
  // Brand
  // ─────────────────────────────────────

  /**
   * Main brand color.
   */
  accent: "#4F5FFB",

  /**
   * Hover state.
   */
  accentHover: "#4352E8",

  /**
   * Pressed state.
   */
  accentActive: "#3745D1",

  /**
   * Very soft brand background.
   */
  accentSoft: "#EEF1FF",

  /**
   * Slightly stronger brand background.
   */
  accentSoftStrong: "#E3E7FF",

  /**
   * Brand text on soft backgrounds.
   */
  accentText: "#3544C7",

  // ─────────────────────────────────────
  // Semantic — Success
  // ─────────────────────────────────────

  success: "#16A34A",
  successHover: "#15803D",
  successSoft: "#ECFDF3",
  successBorder: "#BBF7D0",

  // ─────────────────────────────────────
  // Semantic — Warning
  // ─────────────────────────────────────

  warning: "#D97706",
  warningHover: "#B45309",
  warningSoft: "#FFFAEB",
  warningBorder: "#FDE68A",

  // ─────────────────────────────────────
  // Semantic — Danger
  // ─────────────────────────────────────

  danger: "#DC2626",
  dangerHover: "#B91C1C",
  dangerSoft: "#FEF3F2",
  dangerBorder: "#FECACA",

  // ─────────────────────────────────────
  // Semantic — Info
  // ─────────────────────────────────────

  info: "#4F5FFB",
  infoSoft: "#EEF1FF",
  infoBorder: "#C7D2FE",

  // ─────────────────────────────────────
  // Typography
  // ─────────────────────────────────────

  fontDisplay: "'Sora', 'Inter', sans-serif",
  fontBody: "'Inter', sans-serif",
  fontMono: "'JetBrains Mono', monospace",

  // ─────────────────────────────────────
  // Shadows
  // ─────────────────────────────────────

  /**
   * Very subtle shadow.
   * Cards and small surfaces.
   */
  shadowSm: "0 1px 2px rgba(16, 24, 40, 0.04)",

  /**
   * Normal elevated surface.
   */
  shadowMd:
    "0 4px 12px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.04)",

  /**
   * Floating elements.
   */
  shadowLg:
    "0 12px 32px rgba(16, 24, 40, 0.10), 0 2px 8px rgba(16, 24, 40, 0.04)",

  /**
   * Modal/popover elevation.
   */
  shadowXl:
    "0 24px 48px rgba(16, 24, 40, 0.14), 0 8px 16px rgba(16, 24, 40, 0.06)",

  // ─────────────────────────────────────
  // Radius
  // ─────────────────────────────────────

  radiusXS: 4,
  radiusSM: 6,
  radiusMD: 8,
  radiusLG: 12,
  radiusXL: 16,
  radiusXXL: 20,

  // ─────────────────────────────────────
  // Spacing
  // ─────────────────────────────────────

  spaceXS: 4,
  spaceSM: 8,
  spaceMD: 16,
  spaceLG: 24,
  spaceXL: 32,
  spaceXXL: 48,
  spaceXXXL: 64,
} as const;


/**
 * ============================================================
 * ANT DESIGN THEME
 * ============================================================
 */
const appTheme: ThemeConfig = {
  token: {
    // ───────────────────────────────────
    // Brand
    // ───────────────────────────────────

    colorPrimary: tokens.accent,
    colorPrimaryHover: tokens.accentHover,
    colorPrimaryActive: tokens.accentActive,

    colorLink: tokens.accent,
    colorLinkHover: tokens.accentHover,
    colorLinkActive: tokens.accentActive,

    colorInfo: tokens.info,

    // ───────────────────────────────────
    // Semantic
    // ───────────────────────────────────

    colorSuccess: tokens.success,
    colorWarning: tokens.warning,
    colorError: tokens.danger,

    // ───────────────────────────────────
    // Backgrounds
    // ───────────────────────────────────

    colorBgBase: tokens.canvas,
    colorBgLayout: tokens.canvas,

    colorBgContainer: tokens.surface,
    colorBgElevated: tokens.surface,

    colorFillAlter: tokens.surfaceSubtle,

    // ───────────────────────────────────
    // Typography
    // ───────────────────────────────────

    colorTextBase: tokens.ink,
    colorText: tokens.ink,
    colorTextSecondary: tokens.inkMuted,
    colorTextTertiary: tokens.inkSubtle,
    colorTextQuaternary: tokens.inkDisabled,

    fontFamily: tokens.fontBody,
    fontSize: 14,
    fontSizeSM: 13,
    fontSizeLG: 16,
    fontSizeXL: 20,

    fontWeightStrong: 600,

    // ───────────────────────────────────
    // Borders
    // ───────────────────────────────────

    colorBorder: tokens.border,
    colorBorderSecondary: tokens.borderSubtle,

    // ───────────────────────────────────
    // Controls
    // ───────────────────────────────────

    controlHeight: 40,
    controlHeightLG: 44,
    controlHeightSM: 32,

    controlOutline: tokens.accentSoft,

    // ───────────────────────────────────
    // Radius
    // ───────────────────────────────────

    borderRadius: tokens.radiusMD,
    borderRadiusSM: tokens.radiusSM,
    borderRadiusLG: tokens.radiusLG,
    borderRadiusXS: tokens.radiusXS,

    // ───────────────────────────────────
    // Shadows
    // ───────────────────────────────────

    boxShadow: tokens.shadowSm,
    boxShadowSecondary: tokens.shadowMd,
  },

  components: {
    // ========================================================
    // Layout
    // ========================================================

    Layout: {
      headerBg: tokens.surface,

      siderBg: tokens.sidebarBg,

      headerHeight: 64,

      headerPadding: "0 24px",

      bodyBg: tokens.canvas,

      footerBg: tokens.canvas,
    },


    // ========================================================
    // Menu / Sidebar
    // ========================================================

    Menu: {
      darkItemBg: "transparent",

      darkItemColor: tokens.sidebarText,

      darkItemHoverBg: tokens.sidebarHover,

      darkItemHoverColor: tokens.sidebarTextActive,

      darkItemSelectedBg: tokens.sidebarActive,

      darkItemSelectedColor: tokens.sidebarTextActive,

      darkSubMenuItemBg: tokens.sidebarBg,

      darkPopupBg: tokens.sidebarSurface,

      itemBorderRadius: tokens.radiusMD,

      itemMarginInline: 12,

      itemMarginBlock: 4,

      itemHeight: 42,

      iconSize: 17,
    },


    // ========================================================
    // Buttons
    // ========================================================

    Button: {
      controlHeight: 40,

      controlHeightLG: 44,

      controlHeightSM: 32,

      borderRadius: tokens.radiusMD,

      fontWeight: 500,

      primaryShadow: "none",

      defaultShadow: "none",

      dangerShadow: "none",
    },


    // ========================================================
    // Input
    // ========================================================

    Input: {
      controlHeight: 40,

      borderRadius: tokens.radiusMD,

      colorBgContainer: tokens.surface,

      activeBorderColor: tokens.accent,

      hoverBorderColor: tokens.accent,

      activeShadow: `0 0 0 3px ${tokens.accentSoft}`,
    },


    // ========================================================
    // Input Number
    // ========================================================

    InputNumber: {
      controlHeight: 40,

      borderRadius: tokens.radiusMD,

      activeBorderColor: tokens.accent,

      hoverBorderColor: tokens.accent,

      activeShadow: `0 0 0 3px ${tokens.accentSoft}`,
    },


    // ========================================================
    // Select
    // ========================================================

    Select: {
      controlHeight: 40,

      borderRadius: tokens.radiusMD,

      optionSelectedBg: tokens.accentSoft,

      optionActiveBg: tokens.surfaceHover,
    },


    // ========================================================
    // Dropdown
    // ========================================================

    Dropdown: {
      borderRadiusLG: tokens.radiusLG,

      paddingBlock: 6,

      boxShadowSecondary: tokens.shadowLg,
    },


    // ========================================================
    // Cards
    // ========================================================

    Card: {
      borderRadiusLG: tokens.radiusLG,

      headerFontSize: 16,

      headerFontSizeSM: 15,

      headerFontWeight: 600,

      paddingLG: tokens.spaceLG,

      paddingSM: tokens.spaceMD,

      colorBgContainer: tokens.surface,

      actionsBg: tokens.surfaceSubtle,

      boxShadowTertiary: tokens.shadowSm,
    },


    // ========================================================
    // Modal
    // ========================================================

    Modal: {
      borderRadiusLG: tokens.radiusXL,

      paddingContentHorizontalLG: 28,

      paddingMD: 24,

      boxShadow: tokens.shadowXl,
    },


    // ========================================================
    // Drawer
    // ========================================================

    Drawer: {
      colorBgElevated: tokens.surface,

      paddingLG: tokens.spaceLG,

      boxShadow: tokens.shadowXl,
    },


    // ========================================================
    // Table
    // ========================================================

    Table: {
      headerBg: tokens.surfaceSubtle,

      headerColor: tokens.inkSecondary,

      headerBorderRadius: tokens.radiusMD,

      borderColor: tokens.border,

      rowHoverBg: tokens.surfaceHover,

      rowSelectedBg: tokens.accentSoft,

      cellPaddingBlock: 14,

      cellPaddingInline: 16,
    },


    // ========================================================
    // Tag
    // ========================================================

    Tag: {
      borderRadiusSM: tokens.radiusSM,

      fontSize: 12,

      lineHeight: "20px",
    },


    // ========================================================
    // Badge
    // ========================================================

    Badge: {
      colorPrimary: tokens.accent,

      colorSuccess: tokens.success,

      colorWarning: tokens.warning,

      colorError: tokens.danger,
    },


    // ========================================================
    // Progress
    // ========================================================

    Progress: {
      lineBorderRadius: 10,

      defaultColor: tokens.accent,
    },


    // ========================================================
    // Alert
    // ========================================================

    Alert: {
      borderRadiusLG: tokens.radiusLG,

      withDescriptionPadding: "14px 16px",
    },


    // ========================================================
    // Form
    // ========================================================

    Form: {
      labelColor: tokens.inkSecondary,

      labelFontSize: 14,

      labelFontWeight: 500,

      itemMarginBottom: 20,
    },


    // ========================================================
    // Tooltip
    // ========================================================

    Tooltip: {
      borderRadius: tokens.radiusSM,
    },


    // ========================================================
    // Popover
    // ========================================================

    Popover: {
      borderRadiusLG: tokens.radiusLG,

      boxShadowSecondary: tokens.shadowLg,
    },


    // ========================================================
    // Empty
    // ========================================================

    Empty: {
      colorText: tokens.inkMuted,
    },


    // ========================================================
    // Spin
    // ========================================================

    Spin: {
      colorPrimary: tokens.accent,
    },


    // ========================================================
    // Avatar
    // ========================================================

    Avatar: {
      colorPrimary: tokens.accent,

      containerSize: 36,

      containerSizeLG: 44,

      containerSizeSM: 28,
    },
  },
};

export default appTheme;