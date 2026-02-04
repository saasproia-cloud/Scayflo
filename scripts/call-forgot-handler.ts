import { POST } from '../app/api/auth/forgot/route'

async function main() {
  const req = new Request('http://localhost/api/auth/forgot', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'admin@example.com' }) })
  const res = await POST(req as unknown as Request)
  // NextResponse returned; attempt to read JSON
  try {
    const json = await res.json()
    console.log('Handler response JSON:', json)
  } catch (e) {
    console.error('Failed to parse response:', e)
  }
}

main().catch((e) => { console.error('ERR', e); process.exit(1) })
