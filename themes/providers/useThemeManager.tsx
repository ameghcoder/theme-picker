'use client';

import { extractErrorMsg } from "@/lib/extractErrorMsg";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const THEME_LINK_ID = "theme-link-9V4jmLz8h8";
const getThemeLink = (filename: string) => `/themes/colors/${filename}.css`;

export function useThemeManager() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [progressState, setProgressState] = useState<"loading" | "setting" | "applied" | null>(null);

    const loadTheme = useCallback(async (themeId: string) => {
        let linkTag = document.getElementById(THEME_LINK_ID);

        if (!linkTag) {
            linkTag = document.createElement("link");

            linkTag.setAttribute("rel", "stylesheet");
            linkTag.setAttribute("id", THEME_LINK_ID);

            document.head.appendChild(linkTag);
        }

        linkTag.setAttribute("href", getThemeLink(themeId));
    }, [])

    const setTheme = useCallback(async (themeId: string) => {
        document.documentElement.dataset.theme = themeId;
    }, [])

    const applyTheme = useCallback(async (name: string, themeId: string) => {
        try {
            setError(null);
            setLoading(true);
            setProgressState("loading");

            await loadTheme(themeId);
            setProgressState("setting");

            await setTheme(themeId);
            setProgressState("applied");

            toast.success(`${name} theme Applied`)
        } catch (err) {
            setError(extractErrorMsg(err));
            toast.error(`Failed to apply ${name} theme`)
            setTimeout(() => {
                setError(null)
            }, 4000)
        } finally {
            setLoading(false);
        }
    }, [loadTheme, setTheme])

    const resetToDefault = useCallback(async () => {
        document.getElementById(THEME_LINK_ID)?.remove();
        document.documentElement.removeAttribute("data-theme");

    }, [])

    return {
        applyTheme,
        loading,
        error,
        progressState,
        resetToDefault
    }
}