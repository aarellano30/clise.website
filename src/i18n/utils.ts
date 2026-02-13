import { ui, defaultLang, routes } from './ui';

export type Locale = keyof typeof ui;
export type RouteKey = keyof (typeof routes)[typeof defaultLang];

/**
 * Get the current locale from a URL.
 * Uses the first path segment to determine locale.
 */
export function getLangFromUrl(url: URL): Locale {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as Locale;
	return defaultLang;
}

/**
 * Returns a translation function for the given locale.
 * Falls back to the default language if a key is missing.
 */
export function useTranslations(lang: Locale) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/**
 * Build a localized path with translated route segments.
 *
 * getLocalePath('es', 'products') → '/productos'
 * getLocalePath('en', 'products') → '/en/products'
 * getLocalePath('es', 'products', 'trimflex') → '/productos/trimflex'
 */
export function getLocalePath(lang: Locale, route: RouteKey, slug?: string): string {
	const segment = routes[lang][route];
	const base = lang === defaultLang ? `/${segment}` : `/${lang}/${segment}`;
	return slug ? `${base}/${slug}` : base;
}

/**
 * Get the home path for a locale.
 */
export function getHomePath(lang: Locale): string {
	return lang === defaultLang ? '/' : `/${lang}/`;
}

/**
 * Get the alternate language path for language switching.
 * Maps current path to its equivalent in the other locale.
 */
export function getAlternatePath(currentPath: string, targetLang: Locale): string {
	const sourceLang: Locale = currentPath.startsWith('/en') ? 'en' : 'es';

	// Strip locale prefix and leading slash
	const stripped = sourceLang === 'en'
		? currentPath.replace(/^\/en\/?/, '')
		: currentPath.replace(/^\//, '');

	// Home page
	if (!stripped) return getHomePath(targetLang);

	// Find which canonical route matches the first segment
	const segments = stripped.split('/');
	const firstSegment = segments[0];

	const sourceRoutes = routes[sourceLang];
	const canonicalRoute = (Object.keys(sourceRoutes) as RouteKey[]).find(
		(key) => sourceRoutes[key] === firstSegment,
	);

	if (canonicalRoute) {
		const slug = segments.slice(1).join('/');
		return getLocalePath(targetLang, canonicalRoute, slug || undefined);
	}

	// Fallback: just swap prefix
	return targetLang === defaultLang ? `/${stripped}` : `/${targetLang}/${stripped}`;
}
