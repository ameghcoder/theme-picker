export const cssVariableForTheme = () => {
  return {
    extraTouch: [
      "--color-radius",
      "--color-border",
      "--color-input",
      "--color-ring",
    ],
    default: ["--color-background", "--color-foreground"],
    card: ["--color-card", "--color-card-foreground"],
    popover: ["--color-popover", "--color-popover-foreground"],
    primary: ["--color-primary", "--color-primary-foreground"],
    secondary: ["--color-secondary", "--color-secondary-foreground"],
    muted: ["--color-muted", "--color-muted-foreground"],
    accent: ["--color-accent", "--color-accent-foreground"],
    notify: {
      error: "--color-destructive",
      success: "--color-success",
      info: "--color-info",
      warn: "--color-warn",
    },
    chart: [
      "--color-chart-1",
      "--color-chart-2",
      "--color-chart-3",
      "--color-chart-4",
      "--color-chart-5",
    ],
    sidebar: [
      "--color-sidebar",
      "--color-sidebar-foreground",
      "--color-sidebar-primary",
      "--color-sidebar-primary-foreground",
      "--color-sidebar-accent",
      "--color-sidebar-accent-foreground",
      "--color-sidebar-border",
      "--color-sidebar-ring",
    ],
  };
};
