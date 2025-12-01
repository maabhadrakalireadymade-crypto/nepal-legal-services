# Nepal Legal Services Platform

A comprehensive web application for company registration and legal services in Nepal.

## Features

### Core Services
- **Company Registration**: Private Ltd, Public Ltd, Partnership, Sole Proprietorship
- **Legal Documentation**: MOA, AOA, Partnership Deeds
- **Tax Registration**: PAN, VAT registration services
- **Trademark & IP**: Trademark and copyright registration
- **Business Licenses**: License application assistance
- **Legal Consultation**: Expert legal advice

### Platform Features
- Modern, responsive design
- User-friendly registration forms
- Service tracking dashboard
- Document upload system
- Payment integration ready
- Admin panel for management
- Email notifications
- Real-time status updates

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/maabhadrakalireadymade-crypto/nepal-legal-services.git
cd nepal-legal-services
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
nepal-legal-services/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   └── register/
│       └── page.tsx        # Registration form
├── components/             # Reusable components
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Environment Variables

Create a \`.env.local\` file:

\`\`\`env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
EMAIL_SERVICE_KEY=your_email_key
PAYMENT_GATEWAY_KEY=your_payment_key
\`\`\`

## Customization

### Colors
Edit \`tailwind.config.js\` to customize the Nepal-themed colors:
- Primary Blue: #003893
- Nepal Red: #DC143C

### Services
Add or modify services in \`app/page.tsx\`

### Forms
Customize registration forms in \`app/register/page.tsx\`

## Future Enhancements

- [ ] Backend API integration
- [ ] Database setup (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Payment gateway integration (eSewa, Khalti)
- [ ] Document upload to cloud storage
- [ ] Email notification system
- [ ] Admin dashboard
- [ ] Client portal
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Nepali/English)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For inquiries: info@nepallegal.com

---

Built with ❤️ for Nepal's business community
