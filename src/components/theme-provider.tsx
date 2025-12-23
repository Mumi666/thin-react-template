import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { themeAtom } from '@/atoms/ui'
import * as React from "react";
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme] = useAtom(themeAtom)

    // 同步到 DOM
    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    return <>{children}</>
}
