import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('resend', () => ({
  Resend: class {
    emails = {
      send: vi.fn().mockResolvedValue({ id: 'test-id' }),
    }
  },
}))

process.env.RESEND_API_KEY = 'test-key'

async function postSubmit(body: object) {
  const { POST } = await import('../app/api/submit/route')
  const req = new Request('http://localhost/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return POST(req as any)
}

const validBuyPayload = {
  direction: 'us_ca',
  serviceType: 'buy',
  itemName: 'AirPods Pro',
  usPrice: '249',
  packageSize: 'small',
  contact: 'wechat_123',
}

const validCarryPayload = {
  direction: 'ca_us',
  serviceType: 'carry',
  itemName: 'Maple Syrup',
  packageSize: 'small',
  contact: 'test@example.com',
}

describe('POST /api/submit', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('returns 200 for valid buy payload', async () => {
    const res = await postSubmit(validBuyPayload)
    expect(res.status).toBe(200)
  })

  it('returns 200 for valid carry payload', async () => {
    const res = await postSubmit(validCarryPayload)
    expect(res.status).toBe(200)
  })

  it('returns 400 when direction is missing', async () => {
    const { direction: _, ...body } = validBuyPayload
    const res = await postSubmit(body)
    expect(res.status).toBe(400)
  })

  it('returns 400 for large package size', async () => {
    const res = await postSubmit({ ...validCarryPayload, packageSize: 'large' })
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/oversized/i)
  })

  it('returns 400 for buy service without US price', async () => {
    const { usPrice: _, ...body } = validBuyPayload
    const res = await postSubmit(body)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/US price/i)
  })
})
