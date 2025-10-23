# Resumatic 📄

A modern, professional resume builder application built with React, TypeScript, and Tailwind CSS. Create ATS-friendly resumes with multiple professionally designed templates and export them as high-quality PDFs.

![Resumatic](https://static.wixstatic.com/media/5c0589_e30e6ff390554063b3ccb163b93366aa~mv2.png)

## ✨ Features

- **7 Professional Templates** - Modern, Classic, Minimal, Professional, Executive, Creative, and Technical designs
- **Live Preview** - See your resume update in real-time as you type
- **ATS-Friendly** - All templates are optimized to pass Applicant Tracking Systems
- **PDF Export** - Download your resume as a high-quality PDF with one click
- **ATS Score Analysis** - Get real-time feedback on how well your resume performs
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Clean & Minimal UI** - Distraction-free interface focused on your content

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible components
- **React Router** - Client-side routing
- **html2canvas** - Convert HTML to canvas for PDF generation
- **jsPDF** - Generate PDF documents
- **Lucide React** - Beautiful icon library

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resumatic.git
cd resumatic
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📝 Available Templates

### 1. **Modern** ⭐ Popular
Clean and contemporary design with blue accents, perfect for tech and creative roles.

### 2. **Executive**
Sophisticated sidebar layout ideal for senior professionals and leadership positions.

### 3. **Creative**
Vibrant gradient header with modern visual elements, great for designers and creative fields.

### 4. **Technical**
Code-inspired design with terminal-style elements, perfect for developers and engineers.

### 5. **Classic**
Traditional serif font with timeless elegance for formal industries.

### 6. **Professional**
Corporate layout with structured sections, ideal for business professionals.

### 7. **Minimal**
Ultra-clean design with maximum white space for a modern, minimalist look.

## 🎯 Key Features Breakdown

### Resume Builder
- Personal Information (Name, Email, Phone, Location, LinkedIn, Website)
- Professional Summary
- Work Experience (Multiple entries with descriptions)
- Education (Degree, School, GPA, Dates)
- Skills (Categorized by type)
- Languages (With proficiency levels)
- Certifications (Name, Issuer, Date, URL)
- Projects (Name, Description, Technologies, URL, Date)

### PDF Export
- High-quality A4-sized PDF generation
- Maintains formatting and styling
- Optimized for printing
- No watermarks or branding

### ATS Score Analysis
Real-time analysis providing feedback on:
- Content completeness
- Keyword optimization
- Formatting compatibility
- Section organization

## 🎨 UI/UX Highlights

- **Minimal Design** - Clean, distraction-free interface
- **Responsive** - Fully functional on all screen sizes
- **Accessibility** - Built with accessibility in mind
- **Fast** - Optimized performance with Vite
- **Intuitive** - Easy-to-use form interface

## 📂 Project Structure

```
resumatic/
├── src/
│   ├── components/
│   │   ├── templates/          # Resume templates
│   │   │   ├── ModernTemplate.tsx
│   │   │   ├── ClassicTemplate.tsx
│   │   │   ├── MinimalTemplate.tsx
│   │   │   ├── ProfessionalTemplate.tsx
│   │   │   ├── ExecutiveTemplate.tsx
│   │   │   ├── CreativeTemplate.tsx
│   │   │   └── TechnicalTemplate.tsx
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── ATSScanner.tsx
│   │   ├── ResumeForm.tsx
│   │   ├── ResumePreview.tsx
│   │   └── TemplateSelector.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── BuilderPage.tsx
│   ├── utils/
│   │   └── pdfExport.ts        # PDF generation logic
│   ├── types.ts                # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration. You can modify the theme in `tailwind.config.js`.

### TypeScript
TypeScript configuration is in `tsconfig.json` with strict type checking enabled.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern resume builders
- Shadcn UI for beautiful components
- Lucide React for icons
- The open-source community

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for job seekers**

© 2025 Resumatic
