"use client";
import React from 'react'
import { ModeToggle } from '../mode-toggle-btn'
import { Button } from '../ui/button'
import { useThemeManager } from '@/themes/providers/useThemeManager'
import Logo from '../logo';

const Header = () => {
    const { resetToDefault } = useThemeManager();
    return (
        <header className="w-full flex justify-between items-center px-6 py-8">
            <Logo />

            <div className="flex gap-4">
                <Button size="sm" onClick={resetToDefault}>Reset Themes</Button>
                <ModeToggle />
            </div>
        </header>
    )
}

export default Header
