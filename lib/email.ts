import { Resend } from 'resend'

export type RequestData = {
  direction: string
  serviceType: string
  itemName: string
  itemLink?: string
  usPrice?: string
  caPrice?: string
  packageSize: string
  contact: string
  notes?: string
  imageAttachment?: { filename: string; content: string }
}

export async function sendRequestEmail(data: RequestData) {
  const dirLabel = data.direction === 'us_ca' ? 'USA → Canada' : 'Canada → USA'
  const svcLabel = data.serviceType === 'buy' ? 'Buy for Me (帮我买)' : 'Carry for Me (帮我带)'
  const sizeLabel: Record<string, string> = {
    small: 'Small (小件)',
    medium: 'Medium (中件)',
    large: 'Large (大件)',
  }

  const text = `New PassBy Request
==================

Direction:    ${dirLabel}
Service:      ${svcLabel}
Item:         ${data.itemName}
Link:         ${data.itemLink || '—'}
US Price:     ${data.usPrice ? `$${data.usPrice} USD` : '—'}
CA Price:     ${data.caPrice ? `$${data.caPrice} CAD` : '—'}
Package Size: ${sizeLabel[data.packageSize] ?? data.packageSize}
Contact:      ${data.contact}
Notes:        ${data.notes || '—'}
${data.imageAttachment ? `\n[Image attached: ${data.imageAttachment.filename}]` : ''}
`

  const resend = new Resend(process.env.RESEND_API_KEY)
  return resend.emails.send({
    from: 'PassBy <onboarding@resend.dev>',
    to: 'cooltreedan@gmail.com',
    subject: `PassBy: ${data.itemName} (${dirLabel})`,
    text,
    ...(data.imageAttachment && {
      attachments: [{
        filename: data.imageAttachment.filename,
        content: data.imageAttachment.content,
      }],
    }),
  })
}
