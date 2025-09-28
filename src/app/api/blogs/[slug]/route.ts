// src/app/api/blogs/[slug]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the type for the dynamic route parameter
interface Context {
  params: { slug: string };
}

// GET /api/blogs/[slug] -> Returns all details of a single blog post.
export async function GET(request: Request, context: Context) {
  const { slug } = context.params;

  try {
    const post = await prisma.blogPost.findUnique({
      // Find the post using the unique slug and ensure it's published
      where: { slug: slug, published: true }, 
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // Return the full post object
    return NextResponse.json(post);
  } catch (error) {
    console.error(`API Error fetching post ${slug}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}