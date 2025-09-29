# Portfolio Website (FastAPI)

Checkpoint #3: Constant Updates and Live Deployment

This repository represents my personal developer portfolio.
Built with FastAPI as the backend and integrates a responsive frontend with HTML, CSS, and JavaScript.
The project is constantly updated as I refine design, features, and backend logic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 ACCOMPLISHED FEATURES

Backend with FastAPI
  • Dynamic routing for project detail pages
  • REST API endpoints providing resume data and project information
  • Integrated contact form with email functionality (via SMTP)
  • Security middleware:
      - Rate limiting with SlowAPI
      - CORS setup for production and local testing
      - Security headers (X-Frame-Options, X-XSS-Protection, etc.)
  • SEO endpoints:
      - /sitemap.xml dynamically generated
      - /robots.txt configured for crawlers

Frontend
  • Responsive design with HTML, CSS, and vanilla JavaScript
  • Integrated project showcase pages (/projects/...)
  • Static files served through FastAPI (/static, /images)
  • Professional design with animations and clean layout

Deployment
  • Hosted on AWS Lightsail
  • Custom domain: samuelrincon.com
  • Optimized for SEO and performance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 API ENDPOINTS

  GET  /api/resume          → Resume data
  GET  /api/projects        → Projects data
  POST /api/contact         → Contact form submission
  GET  /api/metadata        → SEO metadata
  GET  /resume/download     → Download resume
  GET  /health              → Health check

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠️ GETTING STARTED

1. Clone the repository:

   git clone https://github.com/Samuelr2112/portfolio-website.git
   cd portfolio-website

2. Create and activate a virtual environment:

   # Linux/Mac
   python -m venv venv
   source venv/bin/activate

   # Windows
   python -m venv venv
   .\venv\Scripts\activate

3. Install dependencies:

   pip install -r requirements.txt

4. Run the application:

   uvicorn main:app --reload

5. Visit: http://localhost:8000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 DEPLOYMENT WITH GIT

git add .
git commit -m "Your commit message"
git push origin main

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ NOTE

This portfolio is constantly being edited and improved.
New features, design adjustments, and backend updates are added regularly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 LIVE DEMO

https://www.samuelrincon.com
