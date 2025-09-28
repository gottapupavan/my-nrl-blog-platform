// src/app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

// GET /api/blogs -> Returns a list of all published blog posts (paginated).
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Basic Pagination Logic: Gets page number, defaults to 1
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const posts = await prisma.blogPost.findMany({
      // Fetch only posts marked as published
      where: { published: true },
      // Order by newest date first
      orderBy: { publishDate: 'desc' }, 
      skip: skip,
      take: pageSize,
      // Select only the fields needed for the homepage preview
      select: {
        title: true,
        slug: true,
        shortDesc: true,
        publishDate: true,
        imageUrl: true,
        tags: true,
      },
    });

    const totalPosts = await prisma.blogPost.count({ where: { published: true } });
    
    // Return the list of posts along with pagination metadata
    return NextResponse.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / pageSize),
    });
  } catch (error) {
    console.error('API Error fetching blog list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}