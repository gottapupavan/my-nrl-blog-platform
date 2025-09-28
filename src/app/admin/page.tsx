// src/components/PostForm.tsx
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { createPost } from '@/lib/blogActions';

export default function PostForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [shortDesc, setShortDesc] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [slug, setSlug] = useState('');
  useEffect(() => {
    setSlug(slugify(title, { lower: true, strict: true }));
  }, [title]);

  const handleSubmit = (formData: FormData) => {
    if (!title || !content || !shortDesc || !slug) {
      alert('Please fill in all required fields (Title, Content, Description).');
      return;
    }

    startTransition(async () => {
      const result = await createPost(formData);
      
      if (result.success) {
        alert('Blog Post created successfully!');
        router.push('/');
      } else {
        alert(`Error: ${result.error}`);
      }
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 border-b pb-3">Create New Blog Post</h2>
      <form action={handleSubmit} className="space-y-6">
        {/* Simplified Form Content */}
        <div><label>Title (Required)</label><input type="text" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border" /></div>
        <div><label>Generated Slug</label><input type="text" name="slug" value={slug} readOnly className="mt-1 block w-full px-3 py-2 border bg-gray-100" /></div>
        <div><label>Short Description (Required)</label><textarea name="shortDesc" required value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border" /></div>
        <div><label>Full Content (Required)</label><textarea name="content" required value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="mt-1 block w-full px-3 py-2 border" /></div>
        <button type="submit" disabled={isPending} className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md disabled:bg-gray-400">
          {isPending ? 'Saving Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}