import { listings } from '@/db/data'
import { auditLogs } from '@/lib/log'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { id } = await req.json()
    const admin = req.cookies.get('admin')?.value || 'unknown'

    console.log(admin, id, "admin")

    const listing = listings.find((l) => l.id === id)
    console.log(listing, "listing")
    if (listing) {
        listing.status = 'approved'

        auditLogs.push({
            id: crypto.randomUUID(),
            listingId: id,
            action: 'approved',
            admin,
            timestamp: new Date().toISOString(),
        })
    }

    return NextResponse.json({ success: true })
}
