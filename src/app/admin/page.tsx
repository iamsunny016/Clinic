'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  Search, 
  LogOut, 
  Lock,
  ChevronRight,
  RefreshCw,
  MoreVertical,
  CheckCircle2,
  Phone,
  Menu,
  X
} from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  concern?: string;
  createdAt: string;
  status: string;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'CONFIRMED' | 'COMPLETED'>('ALL');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchBookings();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid admin password');
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
        setActiveMenu(null);
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBookings(bookings.filter(b => b._id !== id));
        setActiveMenu(null);
      }
    } catch (err) {
      alert('Failed to delete booking');
    }
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    alert('Phone number copied!');
    setActiveMenu(null);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'ALL' || b.status.toUpperCase() === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              Login to Dashboard <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-400 z-50 flex flex-col p-6 transition-transform lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10 px-2 text-white">
          <div className="flex items-center gap-3 font-bold text-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Users size={18} /></div>
            Admin Portal
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden"><X size={20} /></button>
        </div>
        <nav className="space-y-1 flex-1">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-blue-600/10 text-blue-500 font-semibold text-sm transition-all"><Calendar size={18} /> Appointments</button>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 text-sm mt-auto"><LogOut size={18} /> Sign Out</button>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden"><Menu size={24} /></button>
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by name, phone or email..."
                className="w-full bg-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button onClick={fetchBookings} disabled={isLoading} className="p-2.5 rounded-xl hover:bg-slate-100 disabled:animate-spin"><RefreshCw size={20} /></button>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
              <p className="text-slate-500 text-sm">Managing {bookings.length} total bookings</p>
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm mb-12">
            <div className="overflow-visible">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Schedule</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booked At</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50/50 group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">{booking.name.charAt(0)}</div>
                          <div>
                            <div className="font-bold text-slate-900">{booking.name}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Phone size={10}/>{booking.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                        {format(new Date(booking.date), 'MMM d')} at {booking.time}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ring-1 ring-inset ${booking.status.toLowerCase() === 'completed' ? 'bg-emerald-50 text-emerald-600 ring-emerald-600/10' : 'bg-blue-50 text-blue-600 ring-blue-600/10'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{format(new Date(booking.createdAt), 'MMM d, h:mm a')}</td>
                      <td className="px-6 py-4 text-right relative">
                        <button onClick={() => setActiveMenu(activeMenu === booking._id ? null : booking._id)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-400"><MoreVertical size={18} /></button>
                        {activeMenu === booking._id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 py-2 text-left">
                              <button onClick={() => handleStatusUpdate(booking._id, 'COMPLETED')} className="w-full text-left px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 font-bold"><CheckCircle2 size={16} /> Mark Completed</button>
                              <button onClick={() => handleCopyPhone(booking.phone)} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Phone size={16} /> Copy Phone</button>
                              <button onClick={() => handleDelete(booking._id)} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><LogOut size={16} className="rotate-180" /> Delete</button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Concerns */}
          <h3 className="text-lg font-bold text-slate-900 mb-6">Medical Concerns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.filter(b => b.concern).map(b => (
              <div key={b._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-200 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Medical Concern</span>
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-4">"{b.concern}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">{b.name.charAt(0)}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{b.name}</div>
                    <div className="text-[10px] text-slate-500">{b.time} on {format(new Date(b.date), 'MMM d')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
