# 🚀 Deployment Information for Aarogya Clinic

When you deploy to Vercel or Netlify, you MUST add these **Environment Variables** in their dashboard settings to make the site work:

### 🔑 Environment Variables
| Key | Value |
| :--- | :--- |
| `RESEND_API_KEY` | `re_BPCNoVPq_KNcPtc1HHUPTNJvNahdxCmB2` |
| `MONGODB_URI` | `mongodb+srv://mscrajnish_db_user:ClinicPass123@cluster0.s4jdfa.mongodb.net/?appName=Cluster0` |

### 🌐 Custom Domain
If you have a custom domain (e.g., `aarogyaheart.com`), add it to your Vercel project settings.

### 📬 Email Production Setup
To send emails to real patients:
1. Go to [Resend Dashboard](https://resend.com/domains).
2. Add and Verify your domain.
3. Change the `from` email in `src/app/api/bookings/route.ts` from `onboarding@resend.dev` to `info@yourdomain.com`.

### 🔐 Admin Access
- **URL**: `your-site.com/admin`
- **Password**: `admin123`
