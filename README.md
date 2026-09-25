# MP Sugam Parivahan — Web Application

> Independent information portal for Madhya Pradesh government bus services (Mukhyamantri Sugam Parivahan Seva)

## 🚀 Deployed URL
**https://mp-sugam-parivahan.vercel.app**

---

## 📋 Vercel Project Name Recommendation

**Use: `mp-sugam-parivahan`**

This is the exact search term people will Google. Other options:
- `sugam-parivahan-mp`
- `mp-sugam-bus`
- `sugam-parivahan-info`

---

## 🔍 SEO Strategy (Implemented)

### Structured Data (JSON-LD)
- ✅ `WebSite` schema with SearchAction
- ✅ `GovernmentService` schema
- ✅ `FAQPage` schema (for Google featured snippets)
- ✅ `BreadcrumbList` schema
- ✅ `Organization` schema

### Meta Tags
- ✅ Comprehensive title tag with primary keywords
- ✅ Meta description with key search terms
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Canonical URL
- ✅ Hreflang tags (en/hi)
- ✅ Robots meta with max-snippet

### Technical SEO
- ✅ `sitemap.xml` with all pages
- ✅ `robots.txt` allowing all crawlers
- ✅ `vercel.json` for SPA routing
- ✅ PWA manifest for mobile ranking
- ✅ Semantic HTML5 structure
- ✅ Fast loading (no heavy images)
- ✅ Mobile-first responsive design
- ✅ `<noscript>` fallback content for crawlers

### Content SEO
- ✅ FAQ section targeting "People Also Ask" queries
- ✅ Keyword-rich about section
- ✅ Bilingual content (Hindi + English)
- ✅ Long-tail keyword coverage
- ✅ Internal linking structure
- ✅ Route-specific pages for each city pair

### Target Keywords
Primary:
- "MP Sugam Parivahan"
- "Mukhyamantri Sugam Parivahan Seva"
- "मुख्यमंत्री सुगम परिवहन सेवा"
- "MP government bus service"

Secondary:
- "MP bus routes"
- "Indore Bhopal bus"
- "MP bus timings 2026"
- "Sugam Parivahan live tracking"
- "MP electric bus"
- "MP bus fare"
- "Indore Singrauli bus"

---

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- React Router v6
- Lucide React icons

---

## 📂 Project Structure

```
src/
├── App.tsx                    # Router + layout
├── main.tsx                   # Entry point
├── index.css                  # Tailwind + custom styles
├── types/index.ts             # TypeScript interfaces
├── data/mockData.ts           # Demo data layer
├── contexts/LanguageContext.tsx # i18n (Hindi/English)
├── components/Layout.tsx      # Header, Footer, Nav
└── pages/
    ├── HomePage.tsx           # SEO-optimized homepage
    ├── RoutesPage.tsx         # Route search
    ├── RouteDetailPage.tsx    # Route details
    ├── BusStopsPage.tsx       # Bus stop directory
    ├── LiveTrackingPage.tsx   # Live map (demo)
    ├── CityPage.tsx           # City pages
    ├── AnnouncementsPage.tsx  # News
    ├── FaresPage.tsx          # Fare calculator
    ├── PlanTripPage.tsx       # Journey planner
    └── BusDetailPage.tsx      # Bus details
```

---

## 🔌 Connecting Real APIs

Replace data in `src/data/mockData.ts` with API calls:

```typescript
// Example: src/services/api.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function getRoutes() {
  const res = await fetch(`${API_BASE}/api/routes`);
  return res.json();
}

export async function getBuses(from: string, to: string) {
  const res = await fetch(`${API_BASE}/api/buses?from=${from}&to=${to}`);
  return res.json();
}

export async function getBusStops() {
  const res = await fetch(`${API_BASE}/api/stops`);
  return res.json();
}

export async function getLiveLocation(busId: string) {
  const res = await fetch(`${API_BASE}/api/live-location?bus=${busId}`);
  return res.json();
}
```

### Required API Endpoints
- `GET /api/routes` — All routes
- `GET /api/buses` — All buses (filterable)
- `GET /api/stops` — Bus stops
- `GET /api/timetable` — Schedule data
- `GET /api/fares` — Fare information
- `GET /api/live-location` — GPS positions

---

## 🌐 Environment Variables

```env
VITE_API_BASE_URL=https://api.example.com
VITE_MAP_API_KEY=your_map_api_key
VITE_MAP_PROVIDER=google  # or 'mapbox' or 'osm'
VITE_SITE_URL=https://mp-sugam-parivahan.vercel.app
```

---

## 🚀 Deployment on Vercel

### Step 1: Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. **Project Name**: `mp-sugam-parivahan`
4. Framework Preset: `Vite`
5. Build Command: `npm run build`
6. Output Directory: `dist`

### Step 2: Environment Variables
Add the env vars listed above in Vercel dashboard.

### Step 3: Custom Domain (Optional)
- Recommended domains: `mpsugamparivahan.in`, `sugamparivahan.info`
- Add in Vercel → Settings → Domains

### Step 4: Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (URL prefix method)
3. Submit sitemap: `https://mp-sugam-parivahan.vercel.app/sitemap.xml`
4. Request indexing for key pages

### Step 5: Google Analytics (Optional)
Add GA4 tracking code to `index.html` before `</head>`.

---

## 📈 Post-Launch SEO Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify site in Google Search Console
- [ ] Check mobile usability report
- [ ] Check Core Web Vitals
- [ ] Submit to Google News (if applicable)
- [ ] Create social media profiles with same name
- [ ] Share on Twitter/X, Facebook, WhatsApp
- [ ] Get backlinks from MP news sites
- [ ] Monitor Search Console for indexing issues
- [ ] Update content as official data becomes available

---

## ⚠️ Important Disclaimer

This is an **independent information portal** and is NOT an official government website. All data should be verified from official MP government transport sources before travel.

---

## 📄 License

MIT
