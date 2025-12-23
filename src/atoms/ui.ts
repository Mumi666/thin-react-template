import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// 原始主题设置（'light' | 'dark' | 'system'）
export const themeSettingAtom = atomWithStorage<'light' | 'dark' | 'system'>(
    'app-theme',
    'system'
)

// 实际生效的主题（计算属性，自动响应 system 变化）
export const themeAtom = atom((get) => {
    const setting = get(themeSettingAtom)

    if (setting === 'system') {
        // 客户端：用 matchMedia
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        // 服务端：默认用 'light'（或根据 UA 推断）
        return 'light'
    }

    return setting
})

// 修改主题的 setter
export const setThemeAtom = atom(null, (get, set, theme: 'light' | 'dark' | 'system') => {
    set(themeSettingAtom, theme)
})
