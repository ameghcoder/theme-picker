"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { useThemeManager } from "@/themes/providers/useThemeManager";
import { Copy, Palette, Loader2, Check, Code2 } from "lucide-react";
import { ThemeRegistryTypes } from "@/themes/lib/themeRegistry";
import { toast } from "sonner";

const ThemePreviewCard = ({
    id,
    title,
    creator,
    previewColor,
}: ThemeRegistryTypes) => {
    const { applyTheme } = useThemeManager();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [themeColors, setThemeColors] = useState<{
        light: Record<string, string>;
        dark: Record<string, string>;
    } | null>(null);
    const [copiedVersion, setCopiedVersion] = useState<string | null>(null);

    const loadThemeColors = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/themes/colors/${id}.css`);
            if (!response.ok) throw new Error("Failed to load theme colors, Theme not found.");
            const cssText = await response.text();

            const parseColors = (mode: "light" | "dark") => {
                const regex = new RegExp(
                    `\\[data-theme="${id}"\\]\\[data-mode="${mode}"\\]\\s*{([^}]*)}`,
                    "s"
                );
                const match = cssText.match(regex);
                if (!match) return {};

                const block = match[1];
                const colors: Record<string, string> = {};
                block.split(";").forEach((line) => {
                    const [key, value] = line.split(":");
                    if (key && value) {
                        const cleanKey = key.trim();
                        if (cleanKey.startsWith("--color-")) {
                            const name = cleanKey.replace("--color-", "");
                            colors[name] = value.trim();
                        }
                    }
                });
                return colors;
            };

            const lightColors = parseColors("light");
            const darkColors = parseColors("dark");

            setThemeColors({ light: lightColors, dark: darkColors });
            setIsDialogOpen(true);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load theme colors.");
        } finally {
            setIsLoading(false);
        }
    };

    const formatForTailwindV3 = (colors: {
        light: Record<string, string>;
        dark: Record<string, string>;
    }) => {
        return `// Tailwind CSS v3 Configuration
module.exports = {
  theme: {
    extend: {
      colors: {
        ${Object.entries(colors.light)
                .map(([key, value]) => `'${key}': '${value}'`)
                .join(",\n        ")}
      }
    }
  },
  plugins: []
}`;
    };

    const formatForTailwindV4 = (colors: {
        light: Record<string, string>;
        dark: Record<string, string>;
    }) => {
        const lightVars = Object.entries(colors.light)
            .map(([key, value]) => `  --color-${key}: ${value};`)
            .join("\n");

        const darkVars = Object.entries(colors.dark)
            .map(([key, value]) => `  --color-${key}: ${value};`)
            .join("\n");

        return `/* Tailwind CSS v4 Configuration */
@theme {
  /* Light Mode */
  :root {
${lightVars}
  }

  /* Dark Mode */
  @media (prefers-color-scheme: dark) {
    :root {
${darkVars}
    }
  }
}`;
    };

    const handleCopy = async (version: "v3" | "v4") => {
        if (!themeColors) return;

        try {
            const formattedCode =
                version === "v3"
                    ? formatForTailwindV3(themeColors)
                    : formatForTailwindV4(themeColors);

            await navigator.clipboard.writeText(formattedCode);
            setCopiedVersion(version);
            toast.success(`Tailwind ${version.toUpperCase()} colors copied!`);

            setTimeout(() => setCopiedVersion(null), 2000);
        } catch (error) {
            console.error(error);
            toast.error("Failed to copy colors.");
        }
    };

    // Extract key colors for the preview
    const background =
        previewColor?.find((c) => c.name === "background")?.value || "transparent";
    const primary =
        previewColor?.find((c) => c.name === "primary")?.value || "currentColor";
    const accent =
        previewColor?.find((c) => c.name === "accent")?.value || "currentColor";
    const secondary =
        previewColor?.find((c) => c.name === "secondary")?.value || "currentColor";

    return (
        <>
            <Card className="group relative overflow-hidden rounded-3xl border border-border/40 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-medium tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
                            {title}
                        </CardTitle>
                        {creator && (
                            <p className="text-xs text-muted-foreground font-medium">
                                by <span className="text-foreground/80">{creator}</span>
                            </p>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={loadThemeColors}
                        disabled={isLoading}
                        className="h-8 w-8 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        title="Export Theme Colors"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Code2 className="h-4 w-4" />
                        )}
                    </Button>
                </CardHeader>

                <CardContent className="pt-4">
                    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/10 transition-all duration-500 group-hover:shadow-md">
                        {/* Background Base */}
                        <div
                            className="absolute inset-0 transition-colors duration-500 opacity-50"
                            style={{ backgroundColor: background }}
                        />

                        {/* Abstract Shapes Composition */}
                        <div className="absolute inset-0 p-6 flex items-center justify-center gap-4">
                            {/* Primary Circle */}
                            <div
                                className="h-16 w-16 rounded-full shadow-lg ring-2 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                                style={{ backgroundColor: primary }}
                            />
                            {/* Secondary Card */}
                            <div
                                className="h-24 w-16 rounded-xl shadow-lg ring-1 ring-black/5 -rotate-6 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-1"
                                style={{ backgroundColor: secondary }}
                            />
                            {/* Accent Dot */}
                            <div
                                className="absolute bottom-4 right-4 h-8 w-8 rounded-lg shadow-md rotate-12 transition-transform duration-500 group-hover:rotate-45"
                                style={{ backgroundColor: accent }}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-2">
                    <Button
                        onClick={() => applyTheme(title, id)}
                        className="w-full rounded-xl bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Palette className="mr-2 h-4 w-4" />
                        Apply Theme
                    </Button>
                </CardFooter>
            </Card>

            {/* Export Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold">
                            Export {title} Theme
                        </DialogTitle>
                        <DialogDescription>
                            Choose your Tailwind CSS version and copy the theme colors
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="v4" className="flex-1 overflow-hidden flex flex-col">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="v3" className="text-sm font-medium">
                                Tailwind v3
                            </TabsTrigger>
                            <TabsTrigger value="v4" className="text-sm font-medium">
                                Tailwind v4
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent
                            value="v3"
                            className="flex-1 overflow-auto mt-4 space-y-4"
                        >
                            <div className="relative">
                                <pre className="bg-muted/50 border border-border/50 rounded-xl p-4 overflow-x-auto text-xs font-mono leading-relaxed">
                                    <code>
                                        {themeColors && formatForTailwindV3(themeColors)}
                                    </code>
                                </pre>
                            </div>
                            <Button
                                onClick={() => handleCopy("v3")}
                                className="w-full rounded-lg"
                                variant={copiedVersion === "v3" ? "default" : "secondary"}
                            >
                                {copiedVersion === "v3" ? (
                                    <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copy Tailwind v3 Config
                                    </>
                                )}
                            </Button>
                        </TabsContent>

                        <TabsContent
                            value="v4"
                            className="flex-1 overflow-auto mt-4 space-y-4"
                        >
                            <div className="relative">
                                <pre className="bg-muted/50 border border-border/50 rounded-xl p-4 overflow-x-auto text-xs font-mono leading-relaxed">
                                    <code>
                                        {themeColors && formatForTailwindV4(themeColors)}
                                    </code>
                                </pre>
                            </div>
                            <Button
                                onClick={() => handleCopy("v4")}
                                className="w-full rounded-lg"
                                variant={copiedVersion === "v4" ? "default" : "secondary"}
                            >
                                {copiedVersion === "v4" ? (
                                    <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copy Tailwind v4 Config
                                    </>
                                )}
                            </Button>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ThemePreviewCard;
