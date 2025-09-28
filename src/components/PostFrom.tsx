// src/components/PostForm.tsx
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Removed problematic imports for stability
import slugify from 'slugify';
import { createPost } from '@/lib/blogActions';

export default function PostForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [shortDesc, setShortDesc] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Auto-generate slug
  const [slug, setSlug] = useState('');
  useEffect(() => {
    setSlug(slugify(title, { lower: true, strict: true }));
  }, [title]);

  // --- Server Action Handler ---
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
        
        {/* Title and Slug */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title (Required)</label>
            <input
              type="text"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Generated Slug</label>
            <input
              type="text"
              name="slug"
              value={slug}
              readOnly
              className="mt-1 block w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description (Required)</label>
          <textarea
            name="shortDesc"
            required
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        
        {/* Full Content: Simple Textarea (STABLE REPLACEMENT FOR QUILL) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Content (Required)</label>
          <textarea 
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        
        {/* Tags and Image URL */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (Comma Separated)</label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL (for homepage thumbnail)</label>
            <input
              type="url"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center">
          <input
            id="isPublished"
            name="isPublished"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="isPublished" className="ml-2 block text-sm font-medium text-gray-900">
            Publish Post Now
          </label>
          <input type="hidden" name="publishedValue" value={isPublished.toString()} />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition"
          >
            {isPending ? 'Saving Post...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}