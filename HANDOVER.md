# Project Handover: Aarogya Heart & Health Clinic Website

Welcome to your new premium medical website. This document provides all the information needed to manage, customize, and deploy the application.

---

## 🏗️ Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Utility-first CSS)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database**: MongoDB (Ready for appointment persistence)

---

## ⭐ Key Features Implemented
1.  **Premium UI/UX**: High-end design with glassmorphism, responsive grids, and professional typography.
2.  **Localized for India**: Tailored for Indian patients with specific credentials (MBBS, MD, DM) and local business hours.
3.  **Smart Booking System**: A 3-step appointment flow that validates dates (Sundays disabled) and confirms via WhatsApp.
4.  **Dynamic Clinic Status**: Automatically displays "Open Now" or "Closed" based on the clinic's local operating hours.
5.  **WhatsApp Integration**: Floating chat button and direct booking CTAs for high conversion.
6.  **SEO Optimized**: Includes Local Business Schema (JSON-LD) for better visibility in Google Search results.

---

## 🛠️ How to Customize

### 1. Change Doctor Information
Navigate to `src/components/home/DoctorProfile.tsx`.
- Update the `name`, `specialties`, and `credentials` constants at the top of the file.
- Replace the profile image by placing a new file in `/public/doctor-hero.png`.

### 2. Update Services
Navigate to `src/components/home/Services.tsx`.
- Modify the `services` array to add or remove medical offerings.

### 3. Change Clinic Details (Address/Phone)
Navigate to `src/components/home/ClinicInfo.tsx` and `src/components/layout/Footer.tsx`.
- Update the address, phone number (+91 87575 77586), and email.
- **Important**: Also update the `telephone` and `address` fields in `src/app/layout.tsx` for SEO purposes.

### 4. Clinic Hours
Navigate to `src/components/home/ClinicInfo.tsx`.
- Update the `schedule` array to reflect the clinic’s actual opening and closing times.

---

## 🚀 Deployment Guide

### Step 2: Email Setup (Real Confirmations)
1.  Go to [Resend.com](https://resend.com) and create a free account.
2.  Generate an **API Key**.
3.  Add it to your environment variables: `RESEND_API_KEY=re_123456789`.
4.  *Note*: By default, Resend only sends emails to your own account email. To send to any patient, you must verify your domain in the Resend dashboard.

### Step 3: Deploy to Vercel (Fastest)
1.  Push the code to a GitHub repository.
2.  Import the project into [Vercel](https://vercel.com).
3.  Add both `MONGODB_URI` and `RESEND_API_KEY` in the Vercel "Environment Variables" settings.
4.  Click **Deploy**.

---

## 📞 Support & Maintenance
- **Development Server**: Run `npm run dev` to see changes locally.
- **Production Build**: Run `npm run build` to verify the site before deployment.

Made with ❤️ for Aarogya Heart & Health.
