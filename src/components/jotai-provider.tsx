
import { Provider } from 'jotai'
// @ts-ignore
import React from 'react'

export function JotaiProvider({ children }: { children: React.ReactNode }) {
    return <Provider>{children}</Provider>
}
