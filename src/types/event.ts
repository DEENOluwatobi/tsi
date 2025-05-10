import type { StaticImageData } from 'next/image';

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  spots: number;
  image?: any
  link?: string;
  registration?: string;
  headertext?: string;
  paragraphtext?: string;
  twitter?: string;
}

// Helper function to convert title to slug - properly handling special characters
export const titleToSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\$/g, 'dollar')  // Replace $ with 'dollar'
    .replace(/[^\w\s-]/g, '')  // Remove all non-word chars except spaces and hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();                   // Trim leading/trailing spaces
};

// Helper function to get event by slug
export const getEventBySlug = (events: Event[], slug: string): Event | undefined => {
  return events.find(event => titleToSlug(event.title) === slug);
};

// Helper function to get event by ID
export const getEventById = (events: Event[], id: number): Event | undefined => {
  return events.find(event => event.id === id);
};