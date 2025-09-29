# FastAPI Portfolio Application
from fastapi import FastAPI, Request, Form, HTTPException, Depends
from fastapi.responses import HTMLResponse, FileResponse, Response, PlainTextResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
import os
from pydantic import BaseModel, EmailStr, validator
import logging
from typing import Optional
import re
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from dotenv import load_dotenv

# Environment setup
load_dotenv()

# Logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Rate limiting setup
limiter = Limiter(key_func=get_remote_address)

# Base URL configuration
BASE_URL = os.getenv("BASE_URL", "https://samuelrincon.com").rstrip("/")

# Application configuration
class Settings:
    EMAIL_HOST = "smtp.mail.yahoo.com"
    EMAIL_PORT = 465
    EMAIL_USERNAME = os.getenv("EMAIL_USERNAME", "samuelrinconm@yahoo.com")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
    EMAIL_FROM = os.getenv("EMAIL_FROM", "samuelrinconm@yahoo.com")
    EMAIL_TO = os.getenv("EMAIL_TO", "samuelrinconm@yahoo.com")
    
    @classmethod
    def validate_email_config(cls):
        if not cls.EMAIL_PASSWORD:
            logger.warning("EMAIL_PASSWORD not set - contact form will not work")
            return False
        return True

settings = Settings()

# Data validation models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    
    @validator('name')
    def validate_name(cls, v):
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters long')
        if len(v) > 100:
            raise ValueError('Name must be less than 100 characters')
        v = re.sub(r'<[^>]*>', '', v)
        return v.strip()
    
    @validator('message')
    def validate_message(cls, v):
        if len(v.strip()) < 10:
            raise ValueError('Message must be at least 10 characters long')
        if len(v) > 2000:
            raise ValueError('Message must be less than 2000 characters')
        v = re.sub(r'<[^>]*>', '', v)
        return v.strip()

# FastAPI application setup
app = FastAPI(
    title="Samuel Rincon Portfolio API",
    description="Personal portfolio backend built with FastAPI",
    version="2.1.0"
)

# Middleware configuration
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler) # type: ignore
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.samuelrincon.com", "https://samuelrincon.com", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Security headers middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response

# Static files and templates setup
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/images", StaticFiles(directory="images"), name="images")
templates = Jinja2Templates(directory="templates")

# Main page route
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Project detail pages with data
@app.get("/projects/mcp-appointment-manager", response_class=HTMLResponse)
async def mcp_appointment_manager(request: Request):
    project_data = {
        "title": "Python FastAPI MCP Appointment Manager (AI Integration)",
        "slug": "mcp-appointment-manager",
        "description": "Intelligent appointment management backend built with FastAPI and PostgreSQL, containerized with Docker and integrated with Claude via Model Context Protocol (MCP). This project demonstrates how artificial intelligence can directly interact with a backend system to create, list, update, and delete appointments.",
        "technologies": ["Python", "FastAPI", "PostgreSQL", "Docker", "MCP", "Claude", "Artificial Intelligence"],
        "github": "https://github.com/Samuelr2112/mcp-project",
        "demo": None,
        "image": "/images/project5.png",
        "features": [
            "AI-powered appointment management with Claude",
            "CRUD operations with FastAPI + PostgreSQL",
            "Containerized deployment with Docker Compose",
            "Model Context Protocol (MCP) integration",
            "Swagger UI for live API testing"
        ]
    }
    return templates.TemplateResponse("projects/mcp-appointment-manager.html", {
        "request": request, 
        "project": project_data
    })

@app.get("/projects/springboot-task-manager", response_class=HTMLResponse)
async def springboot_task_manager(request: Request):
    project_data = {
        "title": "Java Spring Boot Task Manager",
        "slug": "springboot-task-manager",
        "description": "Enterprise-level task and appointment management system built with Spring Boot. Provides comprehensive CRUD operations, RESTful API design, and a maintainable layered architecture. Endpoints tested directly from the command line using cURL.",
        "technologies": ["Java", "Spring Boot", "REST API", "Maven", "OOP"],
        "github": "https://github.com/Samuelr2112/Task-and-Appointment-Management-System-with-Java",
        "demo": None,
        "image": "/images/project4.png",
        "features": [
            "Complete REST API with CRUD operations",
            "Command-line testing with cURL",
            "Layered architecture with separation of concerns",
            "Future-ready for validation, unit testing, and database integration"
        ]
    }
    return templates.TemplateResponse("projects/springboot-task-manager.html", {
        "request": request, 
        "project": project_data
    })

@app.get("/projects/fastapi-portfolio", response_class=HTMLResponse)
async def fastapi_portfolio(request: Request):
    project_data = {
        "title": "FastAPI Portfolio Website",
        "slug": "fastapi-portfolio",
        "description": "This modern, responsive portfolio website built with FastAPI backend and vanilla JavaScript frontend. Deployed on AWS with professional design and smooth animations.",
        "technologies": ["Python", "FastAPI", "HTML/CSS", "JavaScript", "Bootstrap", "AWS"],
        "github": "https://github.com/Samuelr2112/portfolio-website",
        "demo": "https://www.samuelrincon.com",
        "image": "/images/project2.png",
        "features": [
            "Professional responsive design",
            "FastAPI REST API backend",
            "Contact form with email integration",
            "AWS Lightsail deployment"
        ]
    }
    return templates.TemplateResponse("projects/fastapi-portfolio.html", {
        "request": request, 
        "project": project_data
    })

@app.get("/projects/bst-parser", response_class=HTMLResponse)
async def bst_parser(request: Request):
    project_data = {
        "title": "Binary Search Tree Data Parser",
        "slug": "bst-parser",
        "description": "Command-line application implementing custom Binary Search Tree for efficient sales data parsing and analysis. Demonstrates advanced data structures and algorithm implementation.",
        "technologies": ["Python", "Data Structures", "Algorithms", "CSV", "CLI"],
        "github": "https://github.com/Samuelr2112/Python-Sales-Data-BST-Parser",
        "demo": None,
        "image": "/images/project3.png",
        "features": [
            "Custom BST implementation from scratch",
            "Efficient data parsing and searching",
            "Interactive command-line interface",
            "CSV file processing capabilities"
        ]
    }
    return templates.TemplateResponse("projects/bst-parser.html", {
        "request": request, 
        "project": project_data
    })

@app.get("/projects/inventory-tracker", response_class=HTMLResponse)
async def inventory_tracker(request: Request):
    project_data = {
        "title": "SQL Inventory Management System",
        "slug": "inventory-tracker",
        "description": "Full-featured inventory tracking system with SQL database integration. Features both command-line interface and web dashboard for comprehensive inventory management.",
        "technologies": ["Python", "SQLite", "SQL", "Flask", "HTML/CSS", "Jinja2"],
        "github": "https://github.com/Samuelr2112/Inventory-Tracker-with-SQLite-and-Python",
        "demo": None,
        "image": "/images/project1.png",
        "features": [
            "Full CRUD operations with SQL",
            "Web interface with Flask",
            "Database schema design",
            "Inventory reporting and analytics"
        ]
    }
    return templates.TemplateResponse("projects/inventory-tracker.html", {
        "request": request, 
        "project": project_data
    })

# Resume download route
@app.get("/resume/download")
async def download_resume():
    resume_path = "static/resumeV2.pdf"
    if not os.path.exists(resume_path):
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return FileResponse(
        path=resume_path,
        filename="Samuel_Rincon_Resume.pdf",
        media_type="application/pdf"
    )

# Projects API route
@app.get("/api/projects")
async def get_projects():
    try:
        return {
            "projects": [
                {
                "title": "Python FastAPI MCP Appointment Manager (AI Integration)",
                "description": "Intelligent appointment management backend built with FastAPI and PostgreSQL, containerized with Docker and integrated with Claude via Model Context Protocol (MCP). This project demonstrates how artificial intelligence can directly interact with a backend system to create, list, update, and delete appointments.",
                "technologies": ["Python", "FastAPI", "PostgreSQL", "Docker", "MCP", "Claude", "Artificial Intelligence"],
                "github": "https://github.com/Samuelr2112/mcp-project",
                "demo": None,
                "image": "/images/project5.png",
                "features": [
                    "AI-powered appointment management with Claude",
                    "CRUD operations with FastAPI + PostgreSQL",
                    "Containerized deployment with Docker Compose",
                    "Model Context Protocol (MCP) integration",
                    "Swagger UI for live API testing"
                ]
                },
                {
                    "title": "Java Spring Boot Task Manager",
                    "description": "Enterprise-level task and appointment management system built with Spring Boot. Provides comprehensive CRUD operations, RESTful API design, and a maintainable layered architecture. Endpoints tested directly from the command line using cURL.",
                    "technologies": ["Java", "Spring Boot", "REST API", "Maven", "OOP"],
                    "github": "https://github.com/Samuelr2112/Task-and-Appointment-Management-System-with-Java",
                    "demo": None,
                    "image": "/images/project4.png",
                    "features": [
                        "Complete REST API with CRUD operations",
                        "Command-line testing with cURL",
                        "Layered architecture with separation of concerns",
                        "Future-ready for validation, unit testing, and database integration"
                    ]
                },
                {
                    "title": "FastAPI Portfolio Website",
                    "description": "This modern, responsive portfolio website built with FastAPI backend and vanilla JavaScript frontend. Deployed on AWS with professional design and smooth animations.",
                    "technologies": ["Python", "FastAPI", "HTML/CSS", "JavaScript", "Bootstrap", "AWS"],
                    "github": "https://github.com/Samuelr2112/portfolio-website",
                    "demo": "https://www.samuelrincon.com",
                    "image": "/images/project2.png",
                    "features": [
                        "Professional responsive design",
                        "FastAPI REST API backend",
                        "Contact form with email integration",
                        "AWS Lightsail deployment"
                    ]
                },
                {
                    "title": "Binary Search Tree Data Parser",
                    "description": "Command-line application implementing custom Binary Search Tree for efficient sales data parsing and analysis. Demonstrates advanced data structures and algorithm implementation.",
                    "technologies": ["Python", "Data Structures", "Algorithms", "CSV", "CLI"],
                    "github": "https://github.com/Samuelr2112/Python-Sales-Data-BST-Parser",
                    "demo": None,
                    "image": "/images/project3.png",
                    "features": [
                        "Custom BST implementation from scratch",
                        "Efficient data parsing and searching",
                        "Interactive command-line interface",
                        "CSV file processing capabilities"
                    ]
                },
                {
                    "title": "SQL Inventory Management System",
                    "description": "Full-featured inventory tracking system with SQL database integration. Features both command-line interface and web dashboard for comprehensive inventory management.",
                    "technologies": ["Python", "SQLite", "SQL", "Flask", "HTML/CSS", "Jinja2"],
                    "github": "https://github.com/Samuelr2112/Inventory-Tracker-with-SQLite-and-Python",
                    "demo": None,
                    "image": "/images/project1.png",
                    "features": [
                        "Full CRUD operations with SQL",
                        "Web interface with Flask",
                        "Database schema design",
                        "Inventory reporting and analytics"
                    ]
                }
            ]
        }
    except Exception as e:
        logger.error(f"Error retrieving projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving projects")

# Resume data API route
@app.get("/api/resume")
async def get_resume():
    try:
        return {
            "name": "Samuel Rincon",
            "title": "Software Engineer | Backend Developer",
            "location": "Conroe, Texas",
            "contact": {
                "email": "samuelrinconm@yahoo.com",
                "linkedin": "www.linkedin.com/in/samuelrincon",
                "github": "https://github.com/Samuelr2112",
                "phone": "(786) 878-9292",
                "website": "https://www.samuelrincon.com"
            },
            "summary": "Computer Science graduate with hands-on experience in backend development, API design, and database management. Passionate about creating efficient, scalable software solutions with strong problem-solving abilities and leadership skills.",
            "skills": {
                "programming": ["Python", "Java", "JavaScript", "SQL", "HTML", "CSS"],
                "frameworks": ["FastAPI", "Spring Boot", "Flask", "Bootstrap", "REST API"],
                "database": ["SQLite", "MySQL", "PostgreSQL"],
                "tools": ["Git", "Docker", "AWS", "JUnit", "Maven"],
                "other": ["Backend Development", "API Design", "Database Management", "Problem Solving", "Team Leadership"]
            },
            "education": [
                {
                    "institution": "Southern New Hampshire University",
                    "degree": "Bachelor of Science in Computer Science",
                    "period": "May 2023 - March 2025",
                    "gpa": "3.69",
                    "status": "Graduated",
                    "focus": "Backend Development, API Design, Database Management",
                    "achievements": [
                        "Multiple honors and certificates for outstanding performance",
                        "Merit recognition available at meritpages.com/samuelrincon"
                    ]
                },
                {
                    "institution": "Lone Star College",
                    "degree": "Associate of Arts",
                    "period": "August 2019 – May 2022",
                    "gpa": "3.75",
                    "status": "Graduated"
                }
            ],
            "experience": [
                {
                    "title": "Online Grocery Associate & In-Home Delivery Driver",
                    "company": "Walmart",
                    "location": "The Woodlands, TX",
                    "period": "March 2023 - Present",
                    "achievements": [
                        "Delivered customer orders while maintaining a friendly, respectful, and professional relationship with clients.",
                        "Worked under time pressure to meet strict deadlines and ensure efficient order fulfillment.",
                        "Managed TC devices and backroom operations using the GIF software system for inventory control and organization."
                    ]
                },
                {
                    "title": "Moving Crew Lead & Operations Coordinator",
                    "company": "Out The Door Moving",
                    "location": "Conroe, TX",
                    "period": "June 2022 - March 2023",
                    "achievements": [
                        "Led teams of 2-6 movers with 100% customer satisfaction",
                        "Implemented efficient logistics reducing move time by 20%",
                        "Trained 12+ new team members on safety protocols"
                    ],
                    "reviews": [
                        {
                            "customer": "Michael Coleman",
                            "rating": 5,
                            "comment": "Samuel and Kevin were exactly the help we needed. They took very good care of our possessions and were very professional."
                        },
                        {
                            "customer": "Janese Sokulski",
                            "rating": 5,
                            "comment": "Enjoyed the attitude of these young men and they did an excellent job. On time and worked very hard. Highly recommend this group Samuel, Jony, Gabriel, Juan and Jose."
                        },
                        {
                            "customer": "Irene Patricia Regalo Estrada",
                            "rating": 5,
                            "comment": "We had the pleasure of having Samuel, Kevin and Juan move us to our new home. Very respectful, efficient, and quick. They also made sure not to damage any of our items."
                        },
                        {
                            "customer": "Rebecca Stone",
                            "rating": 5,
                            "comment": "Samuel and Marcelo were so polite and moved so quickly! I was very pleased with their work. Would hire them again for sure!"
                        },
                        {
                            "customer": "Barraque Monfils-Evangelista",
                            "rating": 5,
                            "comment": "Samuel and Daniel were quick, efficient, and patient when we had to wait at the storage unit. I recommend requesting them by name."
                        }
                    ]
                },
                {
                    "title": "Web & Systems Assistant (Part-Time)",
                    "company": "Aldea Music Corp",
                    "location": "The Woodlands, TX",
                    "period": "March 2022 – Present",
                    "achievements": [
                        "Managed and maintained the company's HTML-based online receipt system",
                        "Provided updates and light maintenance for the company website",
                        "Assisted with digital record-keeping and ensuring smooth operation of online systems"
                    ]
                }
            ],
            "languages": ["English (Native)", "Spanish (Conversational)"],
            "interests": ["Backend Development", "Software Engineering", "Problem Solving", "Technology Innovation"],
            "last_updated": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error retrieving resume data: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving resume data")

# Contact form route
@app.post("/api/contact")
@limiter.limit("5/minute")
async def submit_contact_form(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    email_password = settings.EMAIL_PASSWORD
    if not email_password:
        logger.error("EMAIL_PASSWORD environment variable not set")
        raise HTTPException(
            status_code=503, 
            detail="Contact form is temporarily unavailable"
        )
    
    try:
        contact_data = ContactForm(name=name, email=email, message=message)
        
        subject = f"Portfolio Contact: Message from {contact_data.name}"
        body = f"""
New message from your portfolio website:

Name: {contact_data.name}
Email: {contact_data.email}
Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

Message:
{contact_data.message}

---
Sent from samuelrincon.com
        """

        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = settings.EMAIL_FROM
        msg["To"] = settings.EMAIL_TO

        with smtplib.SMTP_SSL(settings.EMAIL_HOST, settings.EMAIL_PORT) as server:
            server.login(settings.EMAIL_USERNAME, email_password)
            server.sendmail(settings.EMAIL_FROM, [settings.EMAIL_TO], msg.as_string())

        logger.info(f"Contact form submitted successfully from {contact_data.email}")
        return {
            "status": "success", 
            "message": "Thank you for your message! I'll get back to you soon."
        }
        
    except ValueError as e:
        logger.warning(f"Validation error in contact form: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
        
    except smtplib.SMTPException as e:
        logger.error(f"SMTP error in contact form: {str(e)}")
        raise HTTPException(
            status_code=503, 
            detail="Unable to send message at this time. Please try again later."
        )
        
    except Exception as e:
        logger.error(f"Unexpected error in contact form: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="An unexpected error occurred. Please try emailing directly."
        )

# Health check route
@app.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "timestamp": datetime.now().isoformat(),
        "version": "2.1.0",
        "email_configured": settings.validate_email_config()
    }

# SEO metadata route
@app.get("/api/metadata")
async def get_metadata():
    return {
        "title": "Samuel Rincon | Portfolio",
        "description": "Computer Science graduate specializing in backend development with Python, Java, FastAPI, Spring Boot and modern web technologies. View my projects and experience.",
        "keywords": "Samuel Rincon, Software Engineer, Backend Developer, Python, Java, FastAPI, Spring Boot, Computer Science, Full Stack Developer",
        "author": "Samuel Rincon",
        "og_image": "/images/portfolio-preview.png"
    }

# Sitemap XML route for SEO
@app.get("/sitemap.xml", response_class=Response)
async def sitemap_xml():
    """Generate dynamic sitemap.xml for SEO"""
    lastmod = datetime.utcnow().date().isoformat()
    
    # Define all your important URLs
    urls = [
        {"loc": f"{BASE_URL}/", "changefreq": "weekly", "priority": "1.0"},
        {"loc": f"{BASE_URL}/resume/download", "changefreq": "yearly", "priority": "0.3"},
        {"loc": f"{BASE_URL}/api/projects", "changefreq": "monthly", "priority": "0.5"},
        {"loc": f"{BASE_URL}/api/resume", "changefreq": "monthly", "priority": "0.5"},
        {"loc": f"{BASE_URL}/api/metadata", "changefreq": "yearly", "priority": "0.2"},
        
        # Project detail pages
        {"loc": f"{BASE_URL}/projects/mcp-appointment-manager", "changefreq": "monthly", "priority": "0.9"},
        {"loc": f"{BASE_URL}/projects/springboot-task-manager", "changefreq": "monthly", "priority": "0.8"},
        {"loc": f"{BASE_URL}/projects/fastapi-portfolio", "changefreq": "monthly", "priority": "0.8"},
        {"loc": f"{BASE_URL}/projects/bst-parser", "changefreq": "monthly", "priority": "0.7"},
        {"loc": f"{BASE_URL}/projects/inventory-tracker", "changefreq": "monthly", "priority": "0.7"},
    ]
    
    # Build XML structure
    url_elements = []
    for url in urls:
        url_element = (
            f"  <url>\n"
            f"    <loc>{url['loc']}</loc>\n"
            f"    <lastmod>{lastmod}</lastmod>\n"
            f"    <changefreq>{url['changefreq']}</changefreq>\n"
            f"    <priority>{url['priority']}</priority>\n"
            f"  </url>"
        )
        url_elements.append(url_element)
    
    sitemap_xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + '\n'.join(url_elements) + '\n'
        '</urlset>'
    )
    
    return Response(content=sitemap_xml, media_type="application/xml")

# Robots.txt route for search engine crawlers
@app.get("/robots.txt", response_class=PlainTextResponse)
async def robots_txt():
    """Generate robots.txt for search engine crawlers"""
    robots_content = f"""User-agent: *
Allow: /

# Sitemap location
Sitemap: {BASE_URL}/sitemap.xml

# Disallow sensitive endpoints
Disallow: /health
"""
    
    return PlainTextResponse(content=robots_content)

# Application startup
if __name__ == "__main__":
    import uvicorn
    
    if not settings.validate_email_config():
        logger.warning("Starting without email configuration - contact form will not work")
    
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )