import { useAtom, useSetAtom } from 'jotai'
import { themeAtom, themeSettingAtom, setThemeAtom } from '@/atoms/ui'

export function useTheme() {
    const [theme] = useAtom(themeAtom) // 当前生效主题（'light'/'dark'）
    const [themeSetting] = useAtom(themeSettingAtom) // 用户设置（含 'system'）
    const setTheme = useSetAtom(setThemeAtom)

    return {
        theme,          // 'light' | 'dark' —— 用于 className
        themeSetting,   // 'light' | 'dark' | 'system' —— 用于设置面板
        setTheme,
    }
}
