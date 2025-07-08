import { auditLogs } from '@/lib/log'
import { NextResponse } from 'next/server'

export async function GET() {
    console.log("Logs in memory:", auditLogs)
    return NextResponse.json({ logs: auditLogs })
}
