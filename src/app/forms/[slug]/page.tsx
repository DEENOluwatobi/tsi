import React from 'react';
import { Metadata } from 'next';
import { doc, getDoc, query, collection, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/firebase.config';
import PublicFormDisplay from '@/features/components/PublicForm';
import { notFound } from 'next/navigation';

// Types
interface FormField {
    id: string;
    type: 'short_text' | 'long_text' | 'number' | 'checkbox' | 'radio' | 'file_upload';
    question: string;
    required: boolean;
    options?: string[];
}

interface FormData {
    id: string;
    title: string;
    description: string;
    fields: FormField[];
    slug: string;
    isActive: boolean;
    createdAt: any;
    responses: number;
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Helper function to get form data by ID or slug
async function getFormData(slug: string): Promise<FormData | null> {
  try {
    // First, try to get the form by document ID
    const formDoc = await getDoc(doc(db, 'forms', slug));
    if (formDoc.exists()) {
        const data = { id: formDoc.id, ...formDoc.data() } as FormData;
        return data.isActive ? data : null;
    }

    // If not found by ID, try to find by slug
    const q = query(
        collection(db, 'forms'),
        where('slug', '==', slug),
        where('isActive', '==', true),
        limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as FormData;
    }

        return null;
    } catch (error) {
        console.error('Error fetching form:', error);
        return null;
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const formData = await getFormData(slug);
    
    if (!formData) {
        return {
            title: 'Form Not Found',
            description: 'The requested form could not be found or is no longer available.',
        };
    }

    return {
        title: `${formData.title} | Forms`,
        description: formData.description || `Fill out the ${formData.title} form`,
        openGraph: {
            title: formData.title,
            description: formData.description || `Fill out the ${formData.title} form`,
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
        },
  };
}

// Main page component
export default async function FormPage({ params }: PageProps) {
    const { slug } = await params;
    const formData = await getFormData(slug);

    // If form not found or inactive, show 404
    if (!formData) {
        notFound();
    }

    return (
        <div>
            {/* Pass the form ID to the client component */}
            <PublicFormDisplay formId={formData.id} />
        </div>
    );
}

// Generate static params for known forms (for better performance)
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    try {
        const q = query(
            collection(db, 'forms'),
            where('isActive', '==', true)
        );
        
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                slug: data.slug || doc.id, // Use slug if available, otherwise use document ID
            };
        });
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}


// import React from 'react';
// import { Metadata } from 'next';
// import { doc, getDoc, query, collection, where, getDocs, limit } from 'firebase/firestore';
// import { db } from '@/firebase.config';
// import PublicFormDisplay from '@/features/components/PublicForm';
// import { notFound } from 'next/navigation';

// // Types
// interface FormField {
//     id: string;
//     type: 'short_text' | 'long_text' | 'number' | 'checkbox' | 'radio' | 'file_upload';
//     question: string;
//     required: boolean;
//     options?: string[];
// }

// interface FormData {
//     id: string;
//     title: string;
//     description: string;
//     fields: FormField[];
//     slug: string;
//     isActive: boolean;
//     createdAt: any;
//     responses: number;
// }

// interface PageProps {
//     params: {
//         slug: string;
//     };
// }

// // Helper function to get form data by ID or slug
// async function getFormData(slug: string): Promise<FormData | null> {
//     try {
//         // First, try to get the form by document ID
//         const formDoc = await getDoc(doc(db, 'forms', slug));
        
//         if (formDoc.exists()) {
//             const data = { id: formDoc.id, ...formDoc.data() } as FormData;
//             return data.isActive ? data : null;
//         }

//         // If not found by ID, try to find by slug
//         const q = query(
//             collection(db, 'forms'), 
//             where('slug', '==', slug),
//             where('isActive', '==', true),
//             limit(1)
//         );
        
//         const querySnapshot = await getDocs(q);
        
//         if (!querySnapshot.empty) {
//             const doc = querySnapshot.docs[0];
//             return { id: doc.id, ...doc.data() } as FormData;
//         }

//         return null;
//     } catch (error) {
//         console.error('Error fetching form:', error);
//         return null;
//     }
// }

// // Generate metadata for SEO
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//     const formData = await getFormData(params.slug);
    
//     if (!formData) {
//         return {
//             title: 'Form Not Found',
//             description: 'The requested form could not be found or is no longer available.',
//         };
//     }

//     return {
//         title: `${formData.title} | Forms`,
//         description: formData.description || `Fill out the ${formData.title} form`,
//         openGraph: {
//             title: formData.title,
//             description: formData.description || `Fill out the ${formData.title} form`,
//             type: 'website',
//         },
//         robots: {
//             index: true,
//             follow: true,
//         },
//     };
// }

// // Main page component
// export default async function FormPage({ params }: PageProps) {
//     const formData = await getFormData(params.slug);

//     // If form not found or inactive, show 404
//     if (!formData) {
//         notFound();
//     }

//     return (
//         <div>
//             {/* Pass the form ID to the client component */}
//             <PublicFormDisplay formId={formData.id} />
//         </div>
//     );
// }

// // Optional: Generate static params for known forms (for better performance)
// // Uncomment and modify this if you want to pre-generate pages for all active forms

// export async function generateStaticParams() {
//     try {
//         const q = query(
//             collection(db, 'forms'),
//             where('isActive', '==', true)
//         );
        
//         const querySnapshot = await getDocs(q);
        
//         return querySnapshot.docs.map((doc) => {
//             const data = doc.data();
//             return {
//                 slug: data.slug || doc.id, // Use slug if available, otherwise use document ID
//             };
//         });
//     } catch (error) {
//         console.error('Error generating static params:', error);
//         return [];
//     }
// }