import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
	loader: glob({ pattern: '**/*.mdoc', base: './src/content/products' }),
	schema: z.object({
		name: z.string(),
		type: z.enum(['emblem', 'transfer']),
		description: z.string(),
		applications: z.array(z.string()),
		finishes: z.array(z.string()),
		industries: z.array(z.string()),
		categories: z.array(z.enum(['textiles', 'promotional', 'automotive', 'equipment', 'bottles'])).optional().default([]),
		featured: z.boolean().optional().default(false),
	}),
});

const productAssets = defineCollection({
	loader: glob({ pattern: '*.yaml', base: './src/content/product-assets' }),
	schema: ({ image }) => z.object({
		slug: z.string(),
		featuredImage1: image().optional(),
		featuredImage2: image().optional(),
		gallery: z.array(image()).optional().default([]),
	}),
});

const howToStartImages = defineCollection({
	loader: glob({ pattern: '*.yaml', base: './src/content/start' }),
	schema: ({ image }) => z.object({
		images: z.array(image()).optional().default([]),
	}),
});

const legal = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/legal' }),
	schema: z.object({
		title: z.string(),
		locale: z.enum(['es', 'en']),
		lastUpdated: z.date(),
	}),
});

export const collections = { products, productAssets, howToStartImages, legal };
