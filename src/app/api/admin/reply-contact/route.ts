import { NextRequest, NextResponse } from 'next/server';
import transporter from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const { email, subject, content, originalMessage } = await request.json();

        if (!email || !subject || !content) {
        return NextResponse.json(
            { error: 'Email, subject, and content are required' },
            { status: 400 }
        );
        }

        // Send reply email
        await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #dc2626, #1e40af); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">TSI Response</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #333; margin-top: 0;">Thank you for contacting us!</h3>
                <div style="margin: 20px 0;">
                    ${content.replace(/\n/g, '<br>')}
                </div>
                
                ${originalMessage ? `
                    <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-left: 4px solid #dc2626; border-radius: 4px;">
                    <p style="margin: 0; font-size: 14px; color: #666;"><strong>Your original message:</strong></p>
                    <p style="margin: 10px 0 0 0; color: #555;">${originalMessage}</p>
                    </div>
                ` : ''}
                </div>
            </div>
            <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
                <p>Thank you for reaching out to TSI. We appreciate your interest!</p>
                <p>If you have any further questions, feel free to contact us again.</p>
            </div>
            </div>
        `,
        text: `
    Thank you for contacting us!

    ${content}

    ${originalMessage ? `Your original message: ${originalMessage}` : ''}

    Thank you for reaching out to TSI. We appreciate your interest!
    If you have any further questions, feel free to contact us again.
        `,
        });

        return NextResponse.json({
        message: 'Reply sent successfully',
        sentTo: email,
        });

    } catch (error) {
        console.error('Contact reply error:', error);
        return NextResponse.json(
        { error: 'Failed to send reply' },
        { status: 500 }
        );
    }
}