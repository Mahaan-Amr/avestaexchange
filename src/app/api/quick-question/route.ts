import { NextResponse } from 'next/server'
import { logError } from '@/lib/utils/logger'
import { sendEmail } from '@/lib/utils/email'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, question } = data

    if (!name || !email || !question) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email notification
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: 'New Quick Question',
      text: `
Name: ${name}
Email: ${email}
Question: ${question}
      `,
      html: `
<h2>New Quick Question</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Question:</strong> ${question}</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError('Error submitting quick question:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Failed to submit question' },
      { status: 500 }
    )
  }
} 