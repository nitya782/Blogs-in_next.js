import { notFound } from 'next/navigation';
import Blog1 from '@/components/Blog1';
import Blog2 from '@/components/Blog2';
import Blog3 from '@/components/Blog3';
import Blog4 from '@/components/Blog4';
import Blog5 from '@/components/Blog5';
import Blog6 from '@/components/Blog6';
import Blog7 from '@/components/Blog7';
// Map slugs to blog components
const blogComponents = {
  'buyers-content-help': <Blog1 />,
  'buyer-journey': <Blog2 />,
  'AI-in-HR-Payroll': <Blog3 />,
  'VoIP': <Blog4 />,
  'fleet-management-system-2025': <Blog5 />,
  'salesforce-vs-hubspot-vs-zoho': <Blog6 />,
  'crm-gdpr-compliance-guide': <Blog7 />
};

export default function BlogPost({ params }) {
  const content = blogComponents[params.slug];

  if (!content) return notFound();

  return content;
}