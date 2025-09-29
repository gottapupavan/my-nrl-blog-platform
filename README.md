This project fulfills the full-stack assignment requirements by creating a dynamic blog platform using Next.js (App Router) and PostgreSQL. It includes all core features and a protected Admin CMS.

✨ Core Features and Architecture
Frontend/Framework: Next.js 15 (App Router, TypeScript) and Tailwind CSS.

Data Persistence: PostgreSQL database managed via Prisma ORM.

Dynamic Pages: Homepage lists all posts using ISR (revalidate = 60s). Individual posts use dynamic routing and SSR.

API Layer: Full REST API routes for listing, fetching single posts, and searching (/api/blogs, /api/search).

Search/Filter: Functional search mechanism built directly into the homepage.

Admin CMS (Bonus): Protected dashboard for creating new content.

Auth: Secured using NextAuth.js with local credentials.

Content: Uses a stable HTML <textarea> for content input (Rich Text Editor was temporarily disabled due to dependency conflicts).

Data Flow: Uses Next.js Server Actions to securely submit data to the database.

⚙️ Local Setup and Run Instructions
Prerequisites
Node.js (v18+)

PostgreSQL server running locally (Default port 5432).

Git and VS Code (with Tailwind IntelliSense extension).

1. Installation
Clone the repository and install dependencies using the required legacy flag:

Bash

git clone https://github.com/gottapupavan/my-nrl-blog-platform.git
cd my-nrl-blog-platform
npm install --legacy-peer-deps
2. Database & Environment Configuration
Create a file named .env in the project root.

Add the following credentials (replace placeholders with your actual values):

Code snippet

DATABASE_URL="postgresql://postgres:[YOUR_DB_PASSWORD]@localhost:5432/postgres?schema=public"
NEXTAUTH_SECRET="A_LONG_RANDOM_STRING_FOR_SECURITY"
Run the Prisma migration to create the necessary BlogPost table in your PostgreSQL database:

Bash

npx prisma migrate dev --name create_blog_post_table
3. Run the Application
Start the development server:

Bash

npm run dev
4. Testing the Application
Public Site: http://localhost:3000

Admin CMS (Protected): http://localhost:3000/admin (You will be redirected to the login page).

Demo Credentials: Username: admin, Password: nrl2025

🤖 AI Tool Usage Disclosure (CRITICAL REQUIREMENT)
This project was developed with assistance from Google's Gemini conversational model.

The AI assistant was used extensively for:

Initial Project Architecture: Defining the Next.js/Prisma/Tailwind structure.

Code Generation: Providing the boilerplate for all API Route Handlers, the Server Action logic (createPost), and initial component structures (PostForm, SessionProvider).

Advanced Troubleshooting: Diagnosing and resolving complex, environment-specific errors common to Next.js on Windows, including:

Resolving P1001 (database connectivity failures).

Fixing ERESOLVE and EACCES dependency conflicts by forcing the installation with --legacy-peer-deps.

Correcting tsconfig.json paths (the @/components alias) necessary for modularity.

Pinpointing and correcting file name and directory structure typos (pag.tsx → page.tsx) that caused 404 errors.

🚀 Final Step: Push the Documentation
Once you have saved the correct content in your local README.md, run these commands to update your GitHub repository:

Bash

git add README.md
git commit -m "docs: Final README with complete setup instructions and AI disclosure"
git push origin main