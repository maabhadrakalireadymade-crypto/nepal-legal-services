# Deployment Guide - Nepal Legal Services

## Quick Deploy to Vercel (5 minutes)

### 1. Prerequisites
- GitHub account
- Vercel account (free tier works)

### 2. Deploy Steps

1. **Push to GitHub** (Already done ✓)
   ```bash
   git clone https://github.com/maabhadrakalireadymade-crypto/nepal-legal-services.git
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select `nepal-legal-services` repository
   - Click "Deploy"

3. **Add Environment Variables** (in Vercel Dashboard)
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   DATABASE_URL=your_database_url
   ESEWA_MERCHANT_ID=your_esewa_id
   KHALTI_SECRET_KEY=your_khalti_key
   SENDGRID_API_KEY=your_sendgrid_key
   ```

4. **Done!** Your site is live at `https://your-project.vercel.app`

---

## Database Setup

### Option 1: Supabase (Recommended - Free Tier)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings > Database
4. Add to Vercel environment variables:
   ```
   DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
   ```

### Option 2: Railway (Free $5 credit)

1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection string
4. Add to environment variables

### Option 3: Neon (Serverless Postgres - Free)

1. Sign up at [neon.tech](https://neon.tech)
2. Create database
3. Get connection string
4. Add to environment variables

---

## Payment Gateway Setup

### eSewa Integration

1. **Register as Merchant**
   - Visit: https://esewa.com.np/merchant
   - Fill merchant registration form
   - Submit required documents
   - Wait for approval (2-3 days)

2. **Get Credentials**
   - Login to merchant dashboard
   - Get Merchant ID and Secret Key
   - Add to environment variables

3. **Test Mode**
   - Use test credentials for development
   - Test Merchant ID: `EPAYTEST`
   - Test URL: `https://uat.esewa.com.np/epay/main`

### Khalti Integration

1. **Register as Merchant**
   - Visit: https://khalti.com/join/merchant
   - Complete KYC process
   - Submit business documents
   - Wait for approval (1-2 days)

2. **Get API Keys**
   - Login to merchant dashboard
   - Navigate to Settings > API Keys
   - Copy Public Key and Secret Key
   - Add to environment variables

3. **Test Mode**
   - Use test keys for development
   - Test credentials available in Khalti docs

---

## Email Service Setup

### Option 1: SendGrid (Recommended)

1. Sign up at [sendgrid.com](https://sendgrid.com) (Free 100 emails/day)
2. Create API Key
3. Verify sender email
4. Add to environment variables:
   ```
   EMAIL_PROVIDER=sendgrid
   SENDGRID_API_KEY=your_api_key
   ```

### Option 2: Resend

1. Sign up at [resend.com](https://resend.com) (Free 3000 emails/month)
2. Create API Key
3. Add domain
4. Add to environment variables:
   ```
   EMAIL_PROVIDER=resend
   RESEND_API_KEY=your_api_key
   ```

---

## File Upload Setup (Optional)

### AWS S3

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=nepal-legal-documents
```

### Cloudinary (Easier Alternative)

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Database Migration

After setting up database, run migrations:

```bash
# Install Prisma CLI
npm install -g prisma

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed
```

---

## Custom Domain Setup

### 1. Buy Domain
- Recommended: [Mercantile](https://www.mercantile.com.np/) (Nepal)
- Or: Namecheap, GoDaddy

### 2. Configure DNS
Add these records in your domain provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Add to Vercel
- Go to Vercel Dashboard > Settings > Domains
- Add your domain
- Wait for DNS propagation (5-30 minutes)

---

## SSL Certificate

Vercel automatically provides free SSL certificates via Let's Encrypt. No configuration needed!

---

## Monitoring & Analytics

### 1. Vercel Analytics (Built-in)
- Automatically enabled
- View in Vercel Dashboard

### 2. Google Analytics (Optional)
Add to `app/layout.tsx`:
```typescript
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

---

## Production Checklist

- [ ] Environment variables configured
- [ ] Database connected and migrated
- [ ] Payment gateways tested
- [ ] Email service working
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Admin credentials changed
- [ ] Error monitoring setup
- [ ] Backup strategy in place
- [ ] Terms & Privacy policy added

---

## Support

For deployment issues:
- Email: info@nepallegal.com
- GitHub Issues: [Create Issue](https://github.com/maabhadrakalireadymade-crypto/nepal-legal-services/issues)

---

## Estimated Costs

| Service | Free Tier | Paid Plan |
|---------|-----------|-----------|
| Vercel Hosting | ✓ Unlimited | $20/month |
| Supabase DB | ✓ 500MB | $25/month |
| SendGrid Email | ✓ 100/day | $15/month |
| Domain (.com.np) | - | NPR 1000/year |
| **Total** | **FREE** | **~$60/month** |

---

**Your platform is production-ready!** 🚀
