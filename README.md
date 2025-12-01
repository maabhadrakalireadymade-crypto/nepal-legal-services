# 🇳🇵 Nepal Legal Services Platform

**Complete web application for company registration and legal services in Nepal**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maabhadrakalireadymade-crypto/nepal-legal-services)

## ✨ Features

### 🏢 Core Services
- **Company Registration**: Private Ltd, Public Ltd, Partnership, Sole Proprietorship
- **Legal Documentation**: MOA, AOA, Partnership Deeds, Legal Agreements
- **Tax Registration**: PAN, VAT registration and compliance
- **Trademark & IP**: Trademark and copyright registration
- **Business Licenses**: License application assistance
- **Legal Consultation**: Expert legal advice and support

### 💳 Payment Integration
- **eSewa Integration**: Nepal's leading digital wallet
- **Khalti Integration**: Digital wallet and card payments
- Automatic payment verification
- Payment status tracking
- Invoice generation

### 📧 Email Notifications
- Registration confirmation emails
- Payment confirmation
- Status update notifications
- Document submission reminders
- Professional HTML email templates

### 📊 Admin Dashboard
- Real-time statistics and analytics
- Application management
- Payment tracking
- User management
- Document review system
- Status updates

### 🗄️ Database Support
- PostgreSQL (Recommended)
- MongoDB
- MySQL
- Supabase integration
- Prisma ORM with type safety

### 🔐 Security Features
- Secure payment processing
- Data encryption
- Environment variable protection
- Input validation
- SQL injection prevention

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/maabhadrakalireadymade-crypto/nepal-legal-services.git
cd nepal-legal-services
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/nepal_legal
ESEWA_MERCHANT_ID=your_esewa_id
KHALTI_SECRET_KEY=your_khalti_key
SENDGRID_API_KEY=your_sendgrid_key
```

4. **Setup database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run development server**
```bash
npm run dev
```

6. **Open browser**
Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nepal-legal-services/
├── app/
│   ├── api/
│   │   ├── register/          # Registration API
│   │   └── payment/           # Payment APIs
│   ├── admin/                 # Admin dashboard
│   ├── payment/               # Payment pages
│   ├── register/              # Registration form
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── lib/
│   ├── db.ts                  # Database utilities
│   ├── payment.ts             # Payment gateway integration
│   └── email.ts               # Email service
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: eSewa & Khalti APIs
- **Email**: SendGrid / Resend
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 💰 Payment Gateway Setup

### eSewa
1. Register at [esewa.com.np/merchant](https://esewa.com.np/merchant)
2. Get Merchant ID and Secret Key
3. Add to environment variables
4. Test with sandbox credentials

### Khalti
1. Register at [khalti.com/join/merchant](https://khalti.com/join/merchant)
2. Complete KYC process
3. Get API keys from dashboard
4. Add to environment variables

## 📧 Email Service Setup

### SendGrid (Recommended)
```env
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_api_key
```

### Resend
```env
EMAIL_PROVIDER=resend
RESEND_API_KEY=your_api_key
```

## 🗄️ Database Options

### Supabase (Recommended - Free)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string
4. Add to `DATABASE_URL`

### Railway
1. Sign up at [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection string

### Neon
1. Sign up at [neon.tech](https://neon.tech)
2. Create serverless Postgres
3. Get connection string

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **One-Click Deploy**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maabhadrakalireadymade-crypto/nepal-legal-services)

2. **Manual Deploy**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Add Environment Variables** in Vercel Dashboard

4. **Done!** Your site is live

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide.

## 🔧 Configuration

### Customize Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  nepal: {
    red: '#DC143C',
    blue: '#003893',
  }
}
```

### Add Services
Edit `app/page.tsx` to add/modify services

### Modify Forms
Edit `app/register/page.tsx` for registration form

### Email Templates
Edit `lib/email.ts` for email templates

## 📊 API Endpoints

### Registration
```
POST /api/register
GET  /api/register?applicationId=xxx
```

### Payment
```
POST /api/payment/initiate
POST /api/payment/verify
```

## 🔐 Security

- Environment variables for sensitive data
- Input validation with Zod
- SQL injection prevention with Prisma
- XSS protection
- CSRF protection
- Secure payment processing

## 📱 Features Roadmap

- [x] Company registration forms
- [x] Payment gateway integration (eSewa, Khalti)
- [x] Email notifications
- [x] Admin dashboard
- [x] Database integration
- [ ] User authentication (NextAuth.js)
- [ ] Document upload (AWS S3/Cloudinary)
- [ ] SMS notifications (Sparrow SMS)
- [ ] Client portal
- [ ] Mobile app (React Native)
- [ ] Multi-language (Nepali/English)
- [ ] Invoice generation (PDF)
- [ ] Analytics dashboard
- [ ] Automated reminders
- [ ] API documentation

## 💡 Usage Examples

### Create Registration
```typescript
const response = await fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    companyType: 'private',
    companyName: 'Tech Solutions Pvt. Ltd.',
    email: 'contact@techsolutions.com',
    // ... other fields
  })
})
```

### Initiate Payment
```typescript
const response = await fetch('/api/payment/initiate', {
  method: 'POST',
  body: JSON.stringify({
    gateway: 'esewa',
    applicationId: 'NLS-123456',
    amount: 15000
  })
})
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: info@nepallegal.com
- **Phone**: +977-1-XXXXXXX
- **GitHub Issues**: [Create Issue](https://github.com/maabhadrakalireadymade-crypto/nepal-legal-services/issues)
- **Documentation**: [View Docs](./DEPLOYMENT.md)

## 🙏 Acknowledgments

- Built for Nepal's business community
- Powered by Next.js and Vercel
- Payment integration with eSewa and Khalti
- Email service by SendGrid

## 📈 Stats

- ⚡ Lightning fast with Next.js 14
- 🎨 Beautiful UI with Tailwind CSS
- 🔒 Secure payment processing
- 📧 Automated email notifications
- 📊 Comprehensive admin dashboard
- 🗄️ Scalable database architecture

---

**Made with ❤️ for Nepal's entrepreneurs**

🚀 **[Deploy Now](https://vercel.com/new/clone?repository-url=https://github.com/maabhadrakalireadymade-crypto/nepal-legal-services)** | 📖 **[Read Docs](./DEPLOYMENT.md)** | 🐛 **[Report Bug](https://github.com/maabhadrakalireadymade-crypto/nepal-legal-services/issues)**
