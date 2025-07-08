'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type FeedbackContextType = {
    message: string | null
    setMessage: (msg: string) => void
    clearMessage: () => void
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined)

export function FeedbackProvider({ children }: { children: ReactNode }) {
    const [message, setMsg] = useState<string | null>(null)

    const setMessage = (msg: string) => {
        setMsg(msg)
        setTimeout(() => setMsg(null), 3000)
    }

    const clearMessage = () => setMsg(null)

    return (
        <FeedbackContext.Provider value={{ message, setMessage, clearMessage }}>
            {children}
            {/* Banner UI */}
            {message && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
                    {message}
                </div>
            )}
        </FeedbackContext.Provider>
    )
}

export const useFeedback = () => {
    const context = useContext(FeedbackContext)
    if (!context) throw new Error('useFeedback must be used within FeedbackProvider')
    return context
}
