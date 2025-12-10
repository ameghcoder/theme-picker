"use client";
import React, { useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvider = ({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
    useEffect(() => {
        const colorSchemeHandler = window.matchMedia('(prefers-color-scheme: dark)');
        // listen for color scheme changes
        const handler = (e: MediaQueryListEvent) => {
            const newMode = e.matches ? "dark" : "light";
            document.documentElement.dataset.mode = newMode;
        };
        colorSchemeHandler.addEventListener('change', handler);

        return () => colorSchemeHandler.removeEventListener('change', handler);
    }, [])

    return (
        <NextThemesProvider {...props}>
            {children}
        </NextThemesProvider>
    )
}

export default ThemeProvider
