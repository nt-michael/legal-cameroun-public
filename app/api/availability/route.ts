/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getEventAvailability, getUserUri } from '@/lib/calendly';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'Missing date range' }, { status: 400 });
        }

        const type = searchParams.get('type');
        const eventTypeUri = type === 'free'
            ? process.env.FREE_CALENDLY_EVENT_URI
            : process.env.CALENDLY_EVENT_URI;
        if (!eventTypeUri) {
            return NextResponse.json({ error: 'Server configuration error: Missing Event URI' }, { status: 500 });
        }

        const userUri = await getUserUri();

        // Calendly limitation: 
        // 1. Max 7 days per request.
        // 2. Start time must be in the future.

        let start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();

        // Fix "start_time must be in the future"
        // If start date is in the past (e.g. earlier today), use now + 5 min buffer
        if (start < now) {
            start = new Date(now.getTime() + 5 * 60000);
        }

        const requests = [];
        let currentStart = new Date(start);

        // Batch requests in 7-day chunks
        while (currentStart < end) {
            let currentEnd = new Date(currentStart);
            currentEnd.setDate(currentEnd.getDate() + 7);

            // Cap at 'end'
            if (currentEnd > end) currentEnd = new Date(end);

            const sStr = currentStart.toISOString();
            const eStr = currentEnd.toISOString();

            // Only push if start < end (sanity check)
            if (currentStart < currentEnd) {
                requests.push(
                    getEventAvailability(userUri, eventTypeUri, sStr, eStr)
                        .catch(err => {
                            console.error(`Batch fetch failed for ${sStr}-${eStr}:`, err);
                            return { collection: [] };
                        })
                );
            }

            // Next start is this end
            currentStart = new Date(currentEnd);
        }

        const results = await Promise.all(requests);
        const allSlots = results.flatMap(r => r.collection || []);

        return NextResponse.json({ collection: allSlots });
    } catch (error: any) {
        console.error('Availability API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch availability', details: error.message }, { status: 500 });
    }
}
