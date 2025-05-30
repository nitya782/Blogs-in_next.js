import { notFound } from 'next/navigation';
import Blog1 from '@/components/Blog1';
import Blog2 from '@/components/Blog2';
import Blog3 from '@/components/Blog3';

// Map slugs to blog components
const blogComponents = {
  'buyers-content-help': <Blog1 />,
  'buyer-journey': <Blog2 />,
  'AI-in-HR-Payroll': <Blog3 />,
};

export default function BlogPost({ params }) {
  const content = blogComponents[params.slug];

  if (!content) return notFound();

  return content;
}