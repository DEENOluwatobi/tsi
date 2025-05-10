import { LucideIcon } from 'lucide-react';

export interface Skill {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  longDescription?: string;
  benefits?: string[];
  modules?: {
    title: string;
    description: string;
  }[];
  pricing?: {
    regular: number;
    discount: number;
    discountEnds?: Date;
  };
  testimonials?: {
    quote: string;
    name: string;
    title: string;
  }[];
  startDate?: string;
}