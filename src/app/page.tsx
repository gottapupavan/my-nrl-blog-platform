// src/app/page.tsx
import Link from 'next/link';
import { format } from 'date-fns';

// NEXT.JS PRACTICE: Use ISR to re-fetch data every 60 seconds (demonstrates correct practice)
// This makes the homepage fast, but updates every minute if new content is published.
export const revalidate = 60; 

// --- Type Definitions for API Response ---
interface PostSummary {
  title: string;
  slug: string;
  shortDesc: string;
  publishDate: string; 
  imageUrl?: string;
}

interface BlogListResponse {
  posts: PostSummary[];
  totalPages: number;
}
// --- End Type Definitions ---


async function getBlogPosts(): Promise<PostSummary[]> {
  // Use the API endpoint created in the previous step
  // In a real application, you'd use the deployed URL, but for local testing, localhost works.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const response = await fetch(`${baseUrl}/api/blogs?page=1`, {
    // This tells Next.js to use the revalidate timer set above
    next: { revalidate: revalidate } 
  });

  if (!response.ok) {
    console.error("Failed to fetch blog posts:", response.statusText);
    // Return an empty array on error so the application doesn't crash
    return [];
  }
  
  const data: BlogListResponse = await response.json();
  return data.posts;
}

export default async function HomePage() {
  const posts = await getBlogPosts();

  return (
    <main className="container mx-auto p-4 max-w-4xl min-h-screen">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-800">
        Dynamic Blog Platform
      </h1>
      
      {/* Search component will be added here in a later step */}

      <div className="space-y-10">
        {posts.length === 0 ? (
          <p className="text-center text-xl text-gray-500">
            No blog posts found. The database connection is active, but the table is empty.
          </p>
        ) : (
          posts.map((post) => (
            <div key={post.slug} className="p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white">
              <h2 className="text-3xl font-semibold text-indigo-600">
                {/* Links to the individual post page */}
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Published: {format(new Date(post.publishDate), 'MMMM d, yyyy')}
              </p>
              <p className="mt-4 text-gray-700">{post.shortDesc}</p>
              <Link href={`/posts/${post.slug}`} className="text-indigo-500 hover:text-indigo-700 font-medium mt-3 inline-block">
                Read Full Post →
              </Link>
            </div>
          ))
        )}
      </div>
    </main>
  );
}