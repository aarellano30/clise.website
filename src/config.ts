// Central site configuration — edit this file to update business info, social links, etc.

export const siteConfig = {
	url: 'https://clise.com.mx',
	name: 'Clisé',
	fullName: 'Clise - Tecnología en Emblemas',

	address: {
		street: 'Carretera Córdoba-San Isidro Palotal #182',
		colony: 'Col. Guadalupe Barreal',
		locality: 'Córdoba',
		region: 'Veracruz',
		country: 'MX',
	},

	contact: {
		phone: '+52 (721) 717-2750',
		email: 'info@clise.com',
		whatsapp: '522711937295', // digits only, used for wa.me links
	},

	description: {
		es: 'Emblemas 3D premium personalizados para uniformes, artículos promocionales y más. Disponibles desde 50 unidades.',
		en: 'Premium custom 3D emblems for uniforms, promotional items, and more. Available from 50 units.',
	},

	shortDescription: {
		es: 'Emblemas 3D premium personalizados con tecnología de heat transfer.',
		en: 'Premium custom 3D emblems with heat transfer technology.',
	},

	hours: {
		es: 'Lun - Vie 8:00 am - 6:00 pm',
		en: 'Mon - Fri 8:00 am - 6:00 pm CST',
	},

	social: {
		facebook: 'https://www.facebook.com/cliseemblemtechnology',
		instagram: 'https://www.instagram.com/cliseemblemtechnology',
		youtube: 'https://www.youtube.com/@cliseemblemtechnology',
		tiktok: 'https://www.tiktok.com/@cliseemblemtechnology',
		pinterest: 'https://www.pinterest.com/cliseemblemtechnology/',
	},
} as const;
