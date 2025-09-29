# Portfolio Website (FastAPI)

This repository represents my personal developer portfolio.  
It is built with FastAPI as the backend and integrates a responsive frontend with HTML, CSS, and JavaScript.  
The project is constantly updated as I refine design, features, and backend logic to better present my skills and projects.

---

## Accomplished Features

### Backend with FastAPI
- Dynamic routing for project detail pages.
- REST API endpoints providing resume data and project information.
- Integrated contact form with email functionality (via SMTP).
- Security middleware:
  - Rate limiting with SlowAPI.
  - CORS setup for production and local testing.
  - Security headers (X-Frame-Options, X-XSS-Protection, etc.).
- SEO endpoints:
  - /sitemap.xml dynamically generated.
  - /robots.txt configured for crawlers.

### Frontend
- Responsive design with HTML, CSS, and vanilla JavaScript.
- Integrated project showcase pages (/projects/...).
- Static files served through FastAPI (/static, /images).
- Professional design with animations and clean layout.

### Deployment
- Hosted on AWS Lightsail.
- Custom domain: samuelrincon.com
- Optimized for SEO and performance.

---

## API Endpoints

- Resume Data:  
  GET /api/resume

- Projects Data:  
  GET /api/projects

- Contact Form:  
  POST /api/contact

- SEO Metadata:  
  GET /api/metadata

- Download Resume:  
  GET /resume/download

- Health Check:  
  GET /health

---

## Getting Started

Clone the repository:

git clone https://github.com/Samuelr2112/portfolio-website.git
cd portfolio-website

Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate   # Linux/Mac
.\venv\Scripts\activate    # Windows

Install dependencies:

pip install -r requirements.txt

Run the application:

uvicorn main:app --reload

Visit: http://localhost:8000

---

## Deployment with Git

git add .
git commit -m "Your commit message"
git push origin main

---

## Note

This portfolio is constantly being edited and improved.
New features, design adjustments, and backend updates are added regularly to keep it modern and aligned with my career goals.

---

Live site: https://www.samuelrincon.com
