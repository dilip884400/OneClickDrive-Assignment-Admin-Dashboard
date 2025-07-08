import { listings } from '@/db/data'
import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({ listings })
}
