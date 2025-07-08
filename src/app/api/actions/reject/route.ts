import { listings } from '@/db/data'
import { auditLogs } from '@/lib/log'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { id } = await req.json()
    const admin = req.cookies.get('admin')?.value || 'unknown'

    const listing = listings.find((l) => l.id === id)

    if (listing) {
        listing.status = 'rejected'

        auditLogs.push({
            id: crypto.randomUUID(),
            listingId: id,
            action: 'rejected',
            admin,
            timestamp: new Date().toISOString(),
        })
    }

    return NextResponse.json({ success: true })
}
