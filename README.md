# Abrexom — Website

**abrexom.com** — Treasures of the Silk Road, Reborn.  
Static site hosted on Cloudflare Pages via GitHub. No build step required.

---

## Folder Structure

```
abrexom/
│
├── index.html                    ← Homepage
│
├── pages/
│   ├── about.html                ← Brand story & values
│   ├── blog.html                 ← Journal / blog
│   └── contact.html              ← Contact form & FAQ
│
├── css/
│   └── global.css                ← All styles, tokens, components
│
├── js/
│   └── main.js                   ← Nav, scroll reveal, forms, filters
│
├── assets/
│   ├── images/
│   │   ├── og-image.jpg          ← 1200×630px — ADD THIS (jar photo)
│   │   ├── favicon.ico           ← ADD THIS
│   │   └── apple-touch-icon.png  ← 180×180px — ADD THIS
│   └── fonts/                    ← Self-hosted fonts (optional)
│
├── _headers                      ← Cloudflare: security + cache headers
├── _redirects                    ← Cloudflare: /about → /pages/about.html etc.
├── robots.txt                    ← SEO: crawler instructions
├── sitemap.xml                   ← SEO: all 4 pages listed
├── .gitignore
└── README.md
```

---

## Local Development

No build tools needed.

```bash
# Option 1 — VS Code Live Server (recommended)
# Install "Live Server" by Ritwick Dey in VS Code Extensions
# Right-click index.html → "Open with Live Server"

# Option 2 — Python
python3 -m http.server 8080
# Visit http://localhost:8080
```

---

## Deploy: GitHub + Cloudflare Pages

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial Abrexom website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/abrexom.git
git push -u origin main
```

### Step 2 — Connect Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. Select **Pages** → **Connect to Git** → Authorise GitHub → Select your repo
3. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` *(or leave as default)*
4. Click **Save and Deploy**
5. Your site is live at `your-project.pages.dev`

### Step 3 — Connect abrexom.com

1. In your Cloudflare Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `abrexom.com` — Cloudflare auto-configures DNS if your domain is on Cloudflare
3. Also add `www.abrexom.com`
4. Go to **DNS** in your Cloudflare dashboard → add a redirect rule: `www` → `abrexom.com` (or vice versa)
5. SSL is automatic — no action needed

### Step 4 — Future updates

```bash
# Edit locally → push → live in ~30 seconds
git add .
git commit -m "update: ..."
git push
```

---

## Wire Up the Contact & Notify Forms

Both forms POST to a placeholder endpoint. Replace in `js/main.js`:

### Formspree (free, easiest — 50 submissions/month)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, copy the ID
3. In `js/main.js`, find the comment `/* Replace with your Formspree endpoint */` and change:

```js
// Contact form
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
});

// Notify form
await fetch('https://formspree.io/f/YOUR_NOTIFY_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

---

## Images to Add

Drop these into `assets/images/`:

| File | Size | Purpose |
|------|------|---------|
| `og-image.jpg` | 1200×630px | Social share thumbnail |
| `favicon.ico` | 32×32px | Browser tab icon |
| `apple-touch-icon.png` | 180×180px | iOS home screen |

Use your jar mockup photo for `og-image.jpg` — it's what appears when someone shares your URL on Instagram, WhatsApp, iMessage, etc.

---

## SEO Checklist

- [ ] Add the three images above to `assets/images/`
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console): `https://www.abrexom.com/sitemap.xml`
- [ ] Add GA4 tag to `<head>` in all 4 HTML files (or use Cloudflare's built-in analytics — free)
- [ ] Set up [Google Business Profile](https://business.google.com)
- [ ] Update `sitemap.xml` dates when you add content

---

## Migrating to Shopify Later

When you're ready:
1. Re-create pages in Shopify's theme editor (About, Blog, Contact are native Shopify pages)
2. Homepage hero and product sections become Shopify sections/blocks
3. Blog posts in `blog.html` can be migrated to Shopify's native blog
4. Your domain just points to Shopify instead of Cloudflare Pages
5. Keep the GitHub repo — useful for theme version control

---

## Short URL Redirects (via `_redirects`)

Cloudflare Pages automatically handles these:

| Short URL | Resolves to |
|-----------|-------------|
| `/about` | `/pages/about.html` |
| `/blog` | `/pages/blog.html` |
| `/journal` | `/pages/blog.html` |
| `/contact` | `/pages/contact.html` |

So you can share `abrexom.com/about` instead of the longer path.

---

© 2025 Abrexom™ — USPTO Registered Trademark
