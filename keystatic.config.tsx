import { config, collection, singleton, fields } from '@keystatic/core';

const isProd = import.meta.env.PROD;

const storage = isProd
	? {
			kind: 'github' as const,
			repo: 'aarellano30/clise.website',
		}
	: { kind: 'local' as const };

export default config({
	storage,
	collections: {
		products: collection({
			label: 'Productos',
			slugField: 'name',
			path: 'src/content/products/**',
			columns: ['name', 'type'],
			format: { contentField: 'content' },
			schema: {
				name: fields.slug({ name: { label: 'Product Name' } }),
				type: fields.select({
					label: 'Tipo',
					options: [
						{ label: 'Emblema', value: 'emblem' },
						{ label: 'Transfer', value: 'transfer' },
					],
					defaultValue: 'emblem',
				}),
				description: fields.text({
					label: 'Description',
					multiline: true,
					validation: { isRequired: true },
				}),
				applications: fields.array(fields.text({ label: 'Application' }), {
					label: 'Applications',
					itemLabel: (props) => props.value,
				}),
				finishes: fields.array(fields.text({ label: 'Finish' }), {
					label: 'Finishes',
					itemLabel: (props) => props.value,
				}),
				industries: fields.array(fields.text({ label: 'Industry' }), {
					label: 'Industries',
					itemLabel: (props) => props.value,
				}),
				categories: fields.multiselect({
					label: 'Categorías',
					options: [
						{ label: 'Textiles', value: 'textiles' },
						{ label: 'Promocionales', value: 'promotional' },
						{ label: 'Automotriz', value: 'automotive' },
						{ label: 'Equipos', value: 'equipment' },
						{ label: 'Botellas', value: 'bottles' },
					],
				}),
				featured: fields.checkbox({
					label: 'Featured',
					defaultValue: false,
				}),
				content: fields.markdoc({ label: 'Body Content' }),
			},
		}),

		productAssets: collection({
			label: 'Imágenes de productos',
			slugField: 'slug',
			path: 'src/content/product-assets/*',
			columns: ['slug'],
			format: { data: 'yaml' },
			schema: {
				slug: fields.slug({
					name: { label: 'Product Slug', description: 'Must match the product slug (e.g., trimflex, heritage-shield)' },
				}),
				featuredImage1: fields.image({
					label: 'Featured Image 1',
					directory: 'src/assets/images/products',
					publicPath: '../../assets/images/products/',
									}),
				featuredImage2: fields.image({
					label: 'Featured Image 2',
					directory: 'src/assets/images/products',
					publicPath: '../../assets/images/products/',
				}),
				gallery: fields.array(
					fields.image({
						label: 'Image',
						directory: 'src/assets/images/products',
						publicPath: '../../assets/images/products/',
					}),
					{
						label: 'Gallery Images',
						itemLabel: (props) => props.value?.filename ?? 'Image',
					},
				),
			},
		}),
	},
	singletons: {
		howToStartImages: singleton({
			label: 'Cómo comenzar - imágenes',
			path: 'src/content/start/images',
			format: { data: 'yaml' },
			schema: {
				images: fields.array(
					fields.image({
						label: 'Image',
						directory: 'src/assets/images/start',
						publicPath: '../../assets/images/start/',
					}),
					{
						label: 'Rotating Images',
						itemLabel: (props) => props.value?.filename ?? 'Image',
					},
				),
			},
		}),
	},
});
