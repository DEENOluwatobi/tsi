import { NextRequest, NextResponse } from 'next/server';
import transporter from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const { emails, subject, content } = await request.json();

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
        return NextResponse.json(
            { error: 'No email addresses provided' },
            { status: 400 }
        );
        }

        if (!subject || !content) {
        return NextResponse.json(
            { error: 'Subject and content are required' },
            { status: 400 }
        );
        }

        // Send emails in batches to avoid overwhelming the server
        const batchSize = 10;
        const batches = [];
        
        for (let i = 0; i < emails.length; i += batchSize) {
        batches.push(emails.slice(i, i + batchSize));
        }

        let successCount = 0;
        let failureCount = 0;
        const failedEmails: string[] = [];

        for (const batch of batches) {
        const emailPromises = batch.map(async (email: string) => {
            try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #dc2626, #1e40af); padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">TSI Newsletter</h1>
                    </div>
                    <div style="padding: 30px; background: #f9f9f9;">
                    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        ${content.replace(/\n/g, '<br>')}
                    </div>
                    </div>
                    <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
                    <p>You're receiving this because you subscribed to our newsletter.</p>
                    <p>If you no longer wish to receive these emails, you can unsubscribe at any time.</p>
                    </div>
                </div>
                `,
                text: content, // Fallback plain text
            });
            successCount++;
            return { email, success: true };
            } catch (error) {
            failureCount++;
            failedEmails.push(email);
            console.error(`Failed to send email to ${email}:`, error);
            return { email, success: false, error };
            }
        });

        // Wait for current batch to complete before processing next batch
        await Promise.all(emailPromises);
        
        // Add a small delay between batches to be respectful to email servers
        if (batches.indexOf(batch) < batches.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        }

        return NextResponse.json({
        message: 'Newsletter sending completed',
        successCount,
        failureCount,
        failedEmails,
        totalEmails: emails.length,
        });

    } catch (error) {
        console.error('Newsletter sending error:', error);
        return NextResponse.json(
        { error: 'Failed to send newsletter' },
        { status: 500 }
        );
    }
}