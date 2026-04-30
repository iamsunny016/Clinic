import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Resend } from 'resend';
import { saveBooking, getBookings } from '@/lib/storage';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, phone, date, time, concern } = body;

    const local = saveBooking({ name, email, phone, date, time, concern });
    const savedId = local._id;

    const startTime = new Date(date);
    const hourMatch = time.match(/(\d+):/);
    if (hourMatch) {
      const hour = parseInt(hourMatch[1]);
      const isPM = time.toLowerCase().includes('pm');
      startTime.setHours(isPM && hour !== 12 ? hour + 12 : hour);
    }
    const endTime = new Date(startTime.getTime() + 30 * 60000);
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Appointment+at+Aarogya+Heart&details=Appointment+with+Dr.+Ananya+Sharma&location=Medical+Plaza,+Sector+15,+Gurgaon&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z%2F${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;

    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Aarogya Heart <onboarding@resend.dev>',
          to: [email],
          subject: 'Appointment Confirmed - Aarogya Heart & Health',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #ffffff; background-color: #0f172a;">
              <h1 style="color: #c084fc; font-size: 24px; margin-bottom: 20px;">Appointment Confirmed!</h1>
              <p style="margin-bottom: 10px;">Dear <strong>${name}</strong>,</p>
              <div style="background-color: #cbd5e1; padding: 25px; border-radius: 20px; color: #334155; margin-bottom: 25px;">
                <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Location:</strong> Medical Plaza, Gurgaon</p>
              </div>
              <a href="${calendarUrl}" style="display: inline-block; padding: 12px 25px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold;">🗓️ Set Reminder to Calendar</a>
            </div>
          `
        });

        await resend.emails.send({
          from: 'Clinic Alert <onboarding@resend.dev>',
          to: ['m.scrajnish@gmail.com'], 
          subject: 'New Booking: ' + name,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; background-color: #0f172a; color: #ffffff;">
              <h2>New Appointment Received</h2>
              <p><strong>Patient:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Time:</strong> ${time} on ${new Date(date).toDateString()}</p>
              <div style="background-color: #1e293b; padding: 15px; border-radius: 10px; border-left: 4px solid #6366f1;">
                <strong>Concern:</strong><br/>"${concern || 'None'}"
              </div>
            </div>
          `
        });
      } catch (e) {}
    }

    return NextResponse.json({ success: true, id: savedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const localBookings = getBookings();
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('YOUR_MONGODB_URI')) {
      try {
        const client = await clientPromise;
        const db = client.db();
        const mongoBookings = await db.collection('bookings').find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json([...mongoBookings, ...localBookings]);
      } catch (e) {
        return NextResponse.json(localBookings);
      }
    }
    return NextResponse.json(localBookings);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) return NextResponse.json({ error: 'Missing ID or Status' }, { status: 400 });

    // 1. Update local storage
    const localBookings = getBookings();
    const updatedBookings = localBookings.map((b: any) => 
      b._id === id ? { ...b, status } : b
    );
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'bookings.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedBookings, null, 2));

    // 2. Try to update MongoDB
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('YOUR_MONGODB_URI')) {
      try {
        const client = await clientPromise;
        const db = client.db();
        const { ObjectId } = require('mongodb');
        await db.collection('bookings').updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } }
        );
      } catch (e) {}
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const localBookings = getBookings();
    const updatedBookings = localBookings.filter((b: any) => b._id !== id);
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'bookings.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedBookings, null, 2));

    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('YOUR_MONGODB_URI')) {
      try {
        const client = await clientPromise;
        const db = client.db();
        const { ObjectId } = require('mongodb');
        await db.collection('bookings').deleteOne({ _id: new ObjectId(id) });
      } catch (e) {}
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
