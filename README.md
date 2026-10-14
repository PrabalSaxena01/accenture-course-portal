# Accenture Mock Test Series — Course Explorer & Placement Portal

A modern, responsive, and searchable course exploration platform built with **React** and **Vite**. This web application provides a structured syllabus, module navigation, interactive progress tracking, educational notes, and an inspection audit for the **Accenture Mock Test Series** course from KN Academy.

---

## 🌟 Highlights & Features

- **⚡ Fast Search & Multi-Level Filtering**:
  - Instant substring search across module titles, lesson names, topics, and original notes (press `/` to focus).
  - Filter by Category (*Game-Based Assessment, Pattern & Syllabus, Coding & Algorithms, Full-Length Papers, Technical Assessment, Cloud & Security, Mock Simulation, Communication Round*).
  - Filter by Content Type (*Assessments, Articles, PDFs, Videos, Coding Challenges, Live Tests*).
  - Filter by Completion Status (*All, Completed, Pending*).
- **📊 Real-Time Progress Tracking**:
  - Interactive lesson completion checkboxes persisted locally in your browser (`localStorage`).
  - Visual progress bar calculating real-time percentage and completed fractions.
- **📚 100% Inspected Course Hierarchy**:
  - **21 Modules** and **206 Learning Items** fully accounted for.
  - Expandable accordions with module-level learning objectives, key topics, and educational summaries.
  - Type badges and estimated study durations for each lesson.
- **📋 Inspection Checklist & Scope Audit**:
  - Transparent audit tab verifying that all accessible sections from the authorized scope have been inspected with zero missing sections.
- **🗓️ 14-Day Placement Sprint Roadmap**:
  - Step-by-step preparation plan targeting Cognitive Game Tests, Technical MCQs, Pseudocode, Algorithms, and AI Voice Communication.
- **🎨 Modern Dark & Light Mode UI**:
  - Sleek glassmorphism aesthetic with responsive layouts for mobile, tablet, and desktop viewports.

---

## 📊 Course Syllabus Summary

| Metric | Details |
| :--- | :--- |
| **Course Name** | Accenture Mock Test Series (Crash Course) |
| **Platform** | KN Academy Courses (Graphy) |
| **Total Modules** | 21 Modules |
| **Total Learning Items** | 206 Items |
| **Assessments / Quizzes** | 77 Practice & Mock Tests |
| **Guides & Articles** | 62 Topic Notes & Walkthroughs |
| **Reference PDFs** | 32 Formula & Question Sheets |
| **Video Masterclasses** | 13 Video Walkthroughs |
| **Coding Assessments** | 4 Compiler-Based Challenges |
| **External Portals & Links** | 3 Practice Websites |
| **Live Mock Tests** | 2 Timed Live Simulations |
| **Scope Verification** | 100% Accounted For (0 Missing Sections) |

---

## 🏗️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Icons**: Lucide React
- **Styling**: Modern CSS Design System (Custom Glassmorphism, CSS Variables, Responsive Grid/Flexbox)
- **Data Source**: Clean JSON data structure (`src/data/course_data.json` & `docs/course_data.json`)

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/accenture-course-portal.git
   cd accenture-course-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   Production assets will be generated in the `dist/` directory.

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Instructions

### Deploy to GitHub Pages

1. **Install `gh-pages`**:
   ```bash
   npm install -D gh-pages
   ```

2. **Add deploy scripts to `package.json`**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy with a single command**:
   ```bash
   npm run deploy
   ```
   *Note: `vite.config.js` is already configured with `base: './'` to support relative asset paths on GitHub Pages.*

### Deploy to Vercel / Netlify
- Connect your GitHub repository to Vercel or Netlify.
- Set Build Command to: `npm run build`
- Set Output Directory to: `dist`
- Click Deploy!

---

## 🔒 Privacy & Compliance Guarantee

- **Zero Credentials Stored**: No usernames, passwords, cookies, authorization tokens, or session IDs are included or saved.
- **Copyright & Fair Use**: No DRM-protected videos or copyrighted source files are redistributed. All lesson notes, learning objectives, and roadmaps are original educational summaries synthesized for navigation and revision assistance.
