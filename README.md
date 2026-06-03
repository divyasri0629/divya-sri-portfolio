# Divya Sri Kantamani - Personal Portfolio Website

A highly interactive, responsive, and animated single-page portfolio website for **Divya Sri Kantamani**. This project replicates the energetic, fast-paced, and layered motion aesthetic of modern short-form video transitions (inspired by the referenced Instagram reel) and enhances it with WebGL 3D canvas dynamics, cursor parallax, smooth scrolling reveals, and glassmorphic micro-interactions.

Live Demo (Vercel): [divya-sri-portfolio.vercel.app](https://divya-sri-portfolio.vercel.app) *(Note: Link placeholder - replace with your actual deployment link)*

---

## 🚀 Key Features

- **Energetic 3D WebGL Background**: Built with **Three.js**, rendering a glowing interactive particle field and floating 3D abstract geometric nodes that react dynamically to mouse position parallax (and mobile gyroscope orientation).
- **Layered 3D Card Stack**: Interactive 3D cards displaying core focus areas that tilt and scale in response to cursor hover using custom 3D vector math.
- **GSAP Orchestrated Animations**: Fast-paced, high-energy page load entrance sequence and smooth ScrollTrigger-based scroll reveals for all major page sections.
- **Typewriter Title Sequence**: Dynamic typing and deletion cycle highlighting professional roles (Full-Stack Developer, Flutter Specialist, DSA Problem Solver).
- **Interactive Case Study Modal**: Popup system detailing tech stack, key accomplishments, features, and source code links for selected projects.
- **Responsive Layout**: Designed for optimal readability and layout scaling across mobile (smartphones), tablet, and widescreen desktop displays.
- **Accessibility & Reduced Motion**: Fully supports prefers-reduced-motion media query to disable heavy WebGL rendering and GSAP animations, ensuring a high-performance, static fallback for users who request it.
- **Light/Dark Mode Toggle**: Fluid theme transitions powered by CSS variables and local storage caching, linked directly to Three.js environment colors.
- **Audio Soundscape**: Subtle background audio ambient loop toggled via floating controls (muted by default).

---

## 🛠️ Tech Stack & Libraries

- **Bundler & Tooling**: Vite 8.x, ESLint, Prettier
- **Core Languages**: HTML5, Vanilla CSS3 (Custom Design System with Variables), JavaScript (ES6+)
- **3D Graphics**: Three.js (WebGL Canvas)
- **Motion & Transitions**: GSAP 3.x (ScrollTrigger)
- **Micro-Animations**: Lottie-web (loading dynamic animated vectors)
- **Icons**: FontAwesome 6.x

---

## 📂 Project Structure

```text
├── public/
│   ├── favicon.svg      # Vite Logo Favicon
│   ├── profile.jpg      # Profile Photo
│   └── resume.pdf       # Compiled Professional PDF Resume
├── src/
│   ├── assets/          # Static template SVGs
│   ├── main.js          # Core setup (Themes, Audio, Form Val, Nav logic)
│   ├── hero-scene.js    # Three.js WebGL canvas setup & mouse parallax
│   ├── animations.js    # GSAP load timeline & ScrollTriggers
│   ├── projects.js      # Card tilt coordinates & Modal popups
│   └── style.css        # Glassmorphic layout variables & CSS definitions
├── index.html           # Main semantic HTML structure
├── package.json         # Dependency configuration
└── README.md            # Project documentation
```

---

## 💻 Local Setup & Execution

Follow these steps to run the portfolio website locally on your computer:

### Prerequisites

Make sure you have Node.js (version 18+ recommended) and npm installed.

### 1. Install Dependencies

In the project root directory, run:

```bash
npm install
```

### 2. Start the Development Server

To start the local developer server:

```bash
npm run dev
```

The terminal will report the local URL (usually `http://localhost:5173/`). Open this link in your browser to view the application in real-time.

### 3. Build for Production

To compile static assets for production deployment (creates a `dist/` folder containing minified assets):

```bash
npm run build
```

---

## ☁️ Deployment Instructions

### Vercel (Recommended)

1. Sign in to your [Vercel](https://vercel.com) account.
2. Click **New Project** and import your Git repository (`divya-sri-portfolio`).
3. Under Build & Development settings, Vite is automatically detected.
4. Click **Deploy**. Vercel will build and serve your site statically.

### GitHub Pages

To host on GitHub Pages:
1. Install the `gh-pages` package: `npm install gh-pages --save-dev`
2. Add deploy scripts to your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run deploy` to push the built bundle to the `gh-pages` branch.

---

## 🔧 Git & PR Workflow

To keep your main branch clean, please follow this workflow when updating or deploying changes:

### 1. Initialize and link Remote Repository
If you haven't linked this local repository to GitHub yet, run:
```bash
# Add your remote URL
git remote add origin https://github.com/your-username/divya-sri-portfolio.git
```

### 2. Develop on Feature Branch
All changes should be committed on the feature branch:
```bash
git checkout -b feature/portfolio/animated-hero
```

### 3. Make Commit Updates
We use conventional commits to document modifications:
```bash
git add .
git commit -m "feat(portfolio): add interactive Three.js hero and GSAP timelines"
```

### 4. Push to GitHub
```bash
git push -u origin feature/portfolio/animated-hero
```

### 5. Create Pull Request
Go to your GitHub repository dashboard, click **Compare & pull request**, set the base to `main` and compare to `feature/portfolio/animated-hero`. Include the live Vercel URL and summary screenshots in the description.

---

## 🎨 Asset Attributions & Fallbacks

- **Profile Picture**: Contributed by Divya Sri Kantamani (`public/profile.jpg`).
- **Resume**: Programmatically generated and stored as `public/resume.pdf` based on user credentials.
- **Lottie Assets**: Sourced via public JSON CDN nodes. Falls back automatically to FontAwesome SVG medals in network-restricted environments.
- **Audio Loops**: Sourced from royalty-free SFX repositories (Mixkit).
