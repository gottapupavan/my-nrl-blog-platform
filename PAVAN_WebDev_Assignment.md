I deeply apologize for using the incorrect name throughout the assignment. My apologies for the repeated mistake, Pavan.

You are absolutely correct; the documentation should reference Pavan. I have corrected the filename and all references in the final README.md content below.

Please use the following complete, final content for your documentation file, saved as PAVAN_WebDev_Assignment.md.

PAVAN_WebDev_Assignment
Project Overview
This project is a fully functional, full-stack Dynamic Blog Platform built to meet all assignment requirements. It utilizes the modern Next.js App Router for the frontend and API layers, connected to a reliable PostgreSQL database via the Prisma ORM.

It includes the complete public-facing blog (with search/filtering) and a secure, protected Admin Content Management System (CMS) for content creation.

⚙️ Setup Instructions
Follow these steps to clone the repository, install dependencies, configure the database, and run the application locally.

Prerequisites
You must have the following tools installed and running:

Node.js (v18 or later)

Git

PostgreSQL server running locally (Default port 5432).

1. Installation
Clone the repository and install dependencies using the required installation flag:

Bash

git clone https://github.com/gottapupavan/my-nrl-blog-platform.git
cd my-nrl-blog-platform
npm install --legacy-peer-deps
2. Database & Environment Configuration
Ensure your PostgreSQL server is running.

Create a file named .env in the project root.

Add the following credentials (replace placeholders with your actual values):

Code snippet

DATABASE_URL="postgresql://postgres:[YOUR_DB_PASSWORD]@localhost:5432/postgres?schema=public"
NEXTAUTH_SECRET="A_LONG_RANDOM_STRING_FOR_SECURITY"
Run the Prisma migration command to create the necessary BlogPost table:

Bash

npx prisma migrate dev --name create_blog_post_table
3. Run the Application
Start the development server:

Bash

npm run dev
The public site will be live at: http://localhost:3000

📦 Dependencies and Features
Category	Component/Feature	Notes
Core Stack	Next.js 15, TypeScript, Tailwind CSS	Full App Router implementation.
Data Layer	PostgreSQL + Prisma ORM	Type-safe queries, dynamic schema management.
API	/api/blogs, /api/search	REST endpoints for fetching and filtering data.
Admin Auth	NextAuth.js	Protected routes for /admin using admin/nrl2025 demo credentials.
Content Input	Standard HTML <textarea>	Replaced the complex react-quill to ensure stable compilation.

Export to Sheets
🤖 AI Tool Usage Disclosure (CRITICAL REQUIREMENT)
This project was developed with assistance from Google's Gemini conversational model.

The AI assistant was used extensively for:

Code Generation: Boilerplate for API Route Handlers, Server Actions, and component structures.

Architecture: Defining the structure for the NextAuth routes and secure data flow.

Advanced Troubleshooting: Diagnosing and resolving complex, environment-specific errors common on Windows (e.g., P1001 database errors and EACCES dependency conflicts requiring the --legacy-peer-deps flag and tsconfig.json path fixes).

🚀 Final Submission
Please save the documentation as PAVAN_WebDev_Assignment.md and ensure it's committed to your repository before submitting the following link:

→[https://github.com/gottapupavan/my-nrl-blog-platform](https://github.com/