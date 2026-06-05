import { NextRequest, NextResponse } from 'next/server'
import { sendRequestEmail, type RequestData } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json() as RequestData

  if (!body.direction || !body.serviceType || !body.itemName || !body.packageSize || !body.contact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (body.packageSize === 'large') {
    return NextResponse.json({ error: 'Oversized items not accepted' }, { status: 400 })
  }

  try {
    await sendRequestEmail(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
