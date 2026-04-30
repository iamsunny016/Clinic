import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), 'bookings.json');

export function getBookings() {
  if (!fs.existsSync(DB_PATH)) {
    return [];
  }
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveBooking(booking: any) {
  const bookings = getBookings();
  const newBooking = {
    ...booking,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };
  bookings.unshift(newBooking);
  fs.writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2));
  return newBooking;
}
