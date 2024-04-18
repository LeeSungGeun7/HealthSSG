import { MetadataRoute } from 'next';
 

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://health-ssg.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://health-ssg.vercel.app/post',
      lastModified: new Date(),
    },
    {
      url: 'https://health-ssg.vercel.app/contact',
      lastModified: new Date(),
    },
  ];
}