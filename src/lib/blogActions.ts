// src/lib/blogActions.ts
'use server';

import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import { getServerSession } from 'next-auth';

// Hardcoded auth options from [...nextauth]/route.ts
const authOptions = {
    session: { strategy: "jwt" as const },
    providers: [] 
};

interface ServerActionResult {
  success: boolean;
  error?: string;
}

export async function createPost(formData: FormData): Promise<ServerActionResult> {
  // 1. Authorization Check
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: 'Authorization required. Please log in.' };
  }

  // 2. Extract Data
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const shortDesc = formData.get('shortDesc') as string;
  const tagsString = (formData.get('tags') as string) || '';
  const imageUrl = (formData.get('imageUrl') as string) || null;
  const publishedValue = formData.get('publishedValue') as string;
  
  const isPublished = publishedValue === 'true';

  // 3. Validation
  if (!title || !content || !shortDesc) {
    return { success: false, error: 'Missing required fields (Title, Content, or Description).' };
  }

  const postSlug = slugify(title, { lower: true, strict: true });
  const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

  // 4. Database Write Operation (Prisma)
  try {
    await prisma.blogPost.create({
      data: {
        title,
        slug: postSlug,
        shortDesc,
        content,
        imageUrl,
        tags: tagsArray,
        published: isPublished,
        publishDate: new Date(),
      }
    });

    // 5. Cache Invalidation
    revalidatePath('/'); 
    
    return { success: true };
  } catch (e: any) {
    if (e.code === 'P2002') {
      return { success: false, error: 'A post with this title already exists (slug conflict).' };
    }
    console.error("Database Save Error:", e);
    return { success: false, error: 'An unexpected database error occurred.' };
  }
}