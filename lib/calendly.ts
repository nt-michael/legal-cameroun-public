export interface CalendlyEvent {
  uri: string;
  name: string;
  scheduling_url: string;
}

export interface CalendlyInvitee {
  resource: {
    uri: string;
    email: string;
    name: string;
    status: 'active' | 'canceled';
  };
}

const CALENDLY_API_BASE = 'https://api.calendly.com';

export async function getEventHeader() {
  const token = process.env.CALENDLY_PAT;
  if (!token) throw new Error('Missing CALENDLY_PAT');

  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function createInvitee(data: {
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  timezone?: string;
  slot_start_time: string; // ISO 8601
  answers?: Array<{
    question: string;
    answer: string;
  }>;
}) {
  // Ignore eventUuid, use CALENDLY_EVENT_URI from env
  const eventUri = process.env.CALENDLY_EVENT_URI;
  if (!eventUri) throw new Error('Missing CALENDLY_EVENT_URI');

  const customQuestions = (data.answers || []).map((q, index) => ({
    ...q,
    position: index
  }));

  const headers = await getEventHeader();

  /* 
   * Updated to match user-provided API structure: POST /invitees
   * URL: https://api.calendly.com/invitees
   * Body: { event_type, start_time, invitee: { name, email, ... }, ... }
   */
  const response = await fetch(`${CALENDLY_API_BASE}/invitees`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      event_type: eventUri,
      start_time: data.slot_start_time,
      invitee: {
        email: data.email,
        name: data.name, // Full name
        first_name: data.firstName, // Added specific fields
        last_name: data.lastName,
        timezone: data.timezone || 'Africa/Douala',
      },
      questions_and_answers: customQuestions,
      location: { kind: 'google_conference' }
    }),
  });
  console.log("Response: ", response);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Calendly Booking Error:', errorBody);
    throw new Error(`Failed to book Calendly event: ${response.statusText}`);
  }

  return response.json();
}

export async function getUserUri() {
  const headers = await getEventHeader();
  const response = await fetch(`${CALENDLY_API_BASE}/users/me`, { headers });
  if (!response.ok) throw new Error('Failed to fetch user info');
  const data = await response.json();
  return data.resource.uri;
}

export async function getEventTypes(userUri: string) {
  const headers = await getEventHeader();
  const response = await fetch(`${CALENDLY_API_BASE}/event_types?user=${userUri}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch event types');
  return response.json();
}

export async function getEventAvailability(userUri: string, eventTypeUri: string, startTime: string, endTime: string) {
  const headers = await getEventHeader();
  // We need to use /user_availability_schedules or /event_type_available_times
  // The search result mentioned `/event_type_available_times`.

  const query = new URLSearchParams({
    user: userUri,
    event_type: eventTypeUri,
    start_time: startTime,
    end_time: endTime,
  });

  console.log("Query: ", query.toString());
  const response = await fetch(`${CALENDLY_API_BASE}/event_type_available_times?${query.toString()}`, { headers });

  if (!response.ok) {
    console.error('Calendly Availability Error:', await response.text());
    throw new Error('Failed to fetch availability');
  }

  return response.json();
}
