import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Aarogya Heart & Health | Best Cardiology Care in Gurgaon",
  description: "Experience world-class healthcare with Dr. Ananya Sharma. Book your appointment today for a healthier tomorrow.",
  keywords: "clinic, doctor, appointment, healthcare, medical services, cardiology, Gurgaon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-white text-slate-900 antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "Aarogya Heart & Health",
              "image": "/doctor-hero.png",
              "@id": "",
              "url": "https://aarogyaheart.com",
              "telephone": "+918757577586",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Medical Plaza, Sector 15",
                "addressLocality": "Gurgaon",
                "addressRegion": "Haryana",
                "postalCode": "122001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.6262423,
                "longitude": 77.2066124
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "20:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "10:00",
                  "closes": "17:00"
                }
              ]
            })
          }}
        />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
