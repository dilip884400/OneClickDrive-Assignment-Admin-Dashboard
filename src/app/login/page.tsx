'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')

    const handleLogin = async () => {
        document.cookie = `admin=${email}; path=/`
        toast.success('Logged in successfully!')
        router.push('/dashboard')
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="p-6 bg-white rounded shadow w-80 space-y-4">
                <h2 className="text-xl font-bold">Admin Login</h2>
                <input
                    className="w-full p-2 border rounded"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    )
}
