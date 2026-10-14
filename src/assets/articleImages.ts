// Authentic historical and documentary portraits of each world-shaping achiever
// Compressed to under 200KB for fast loading and maximum visual fidelity
// Includes descriptive filenames, alt text for Google and screen-reader/blind users, and local static assets

export interface ArticleImageMeta {
  fileName: string;
  src: string;
  fallbackSrc: string;
  alt: string;
  caption: string;
  categoryTag: string;
  fileSizeKb: number;
}

const createSvgFallback = (name: string, subtitle: string, accentColor: string): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
    <rect width="800" height="500" fill="#1c1917"/>
    <circle cx="400" cy="220" r="140" fill="${accentColor}" opacity="0.15"/>
    <text x="400" y="210" fill="#f5f5f4" font-family="serif" font-size="32" font-weight="bold" text-anchor="middle">${name}</text>
    <text x="400" y="255" fill="${accentColor}" font-family="sans-serif" font-size="14" letter-spacing="3" text-anchor="middle">${subtitle.toUpperCase()}</text>
    <rect x="250" y="280" width="300" height="1" fill="#44403c"/>
    <text x="400" y="315" fill="#a8a29e" font-family="serif" font-size="16" font-style="italic" text-anchor="middle">Apex Minds · Curated Case Study</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const ARTICLE_IMAGES: Record<string, ArticleImageMeta> = {
  'steve-jobs': {
    fileName: 'steve-jobs.jpg',
    src: '/images/steve-jobs.jpg',
    fallbackSrc: createSvgFallback('Steve Jobs', 'The Art of Relentless Reduction', '#d97706'),
    alt: 'Authentic historical portrait of Steve Jobs wearing black mock turtleneck and round glasses looking directly at camera.',
    caption: 'Steve Jobs: Iconic portrait by Matthew Yohe (CC BY-SA 3.0)',
    categoryTag: 'Historical Documentary Portrait',
    fileSizeKb: 95,
  },
  'marie-curie': {
    fileName: 'marie-curie.jpg',
    src: '/images/marie-curie.jpg',
    fallbackSrc: createSvgFallback('Marie Curie', 'The Anatomy of Relentless Inquiry', '#14b8a6'),
    alt: 'Historical photograph of two-time Nobel laureate Marie Curie seated in her Paris laboratory study, circa 1920.',
    caption: 'Marie Curie: Authentic historical portrait, c. 1920 (Bibliothèque nationale de France / Public Domain)',
    categoryTag: 'Historical Documentary Portrait',
    fileSizeKb: 129,
  },
  'warren-buffett': {
    fileName: 'warren-buffett.jpg',
    src: '/images/warren-buffett.jpg',
    fallbackSrc: createSvgFallback('Buffett & Munger', 'The Compounding of Rationality', '#6366f1'),
    alt: 'Authentic documentary photograph of Warren Buffett speaking at an economic forum in a business suit and tie.',
    caption: 'Warren Buffett: Documentary press portrait (U.S. Department of Commerce / Public Domain)',
    categoryTag: 'Historical Documentary Portrait',
    fileSizeKb: 92,
  },
  'leonardo-da-vinci': {
    fileName: 'leonardo-da-vinci.jpg',
    src: '/images/leonardo-da-vinci.jpg',
    fallbackSrc: createSvgFallback('Leonardo da Vinci', 'Boundless Polymath Curiosity', '#f59e0b'),
    alt: 'Historical red chalk self-portrait drawing of Renaissance polymath Leonardo da Vinci with long flowing beard, circa 1512.',
    caption: 'Leonardo da Vinci: Authentic red chalk self-portrait, c. 1512 (Royal Library of Turin / Public Domain)',
    categoryTag: 'Historical Fine Art Portrait',
    fileSizeKb: 176,
  },
  'indra-nooyi': {
    fileName: 'indra-nooyi.jpg',
    src: '/images/indra-nooyi.jpg',
    fallbackSrc: createSvgFallback('Indra Nooyi', 'Performance with Purpose', '#22c55e'),
    alt: 'Authentic documentary photograph of former PepsiCo CEO Indra Nooyi addressing global delegates at the World Economic Forum in Davos.',
    caption: 'Indra Nooyi: Press portrait at World Economic Forum (World Economic Forum / CC BY-SA 2.0)',
    categoryTag: 'Executive Leadership Portrait',
    fileSizeKb: 100,
  },
  'nelson-mandela': {
    fileName: 'nelson-mandela.jpg',
    src: '/images/nelson-mandela.jpg',
    fallbackSrc: createSvgFallback('Nelson Mandela', 'The Mastery of Strategic Grace', '#eab308'),
    alt: 'Official historical color portrait photograph of South African President Nelson Mandela smiling warmly, 1994.',
    caption: 'Nelson Mandela: Official presidential portrait, 1994 (Government of South Africa / Public Domain)',
    categoryTag: 'Historical Presidential Portrait',
    fileSizeKb: 193,
  },
  'hedy-lamarr': {
    fileName: 'hedy-lamarr.jpg',
    src: '/images/hedy-lamarr.jpg',
    fallbackSrc: createSvgFallback('Hedy Lamarr', 'Secret Communication System', '#d946ef'),
    alt: 'Authentic 1944 studio photograph of actress and spread-spectrum wireless co-inventor Hedy Lamarr during the patent era.',
    caption: 'Hedy Lamarr: 1944 studio portrait during the WWII wireless patent era (Public Domain)',
    categoryTag: 'Historical Studio Portrait',
    fileSizeKb: 129,
  },
  'satya-nadella': {
    fileName: 'satya-nadella.jpg',
    src: '/images/satya-nadella.jpg',
    fallbackSrc: createSvgFallback('Satya Nadella', 'Hit Refresh & Growth Mindset', '#0ea5e9'),
    alt: 'Authentic documentary executive portrait of Microsoft CEO Satya Nadella smiling against a clean background.',
    caption: 'Satya Nadella: Official executive portrait (Photo: Brian Smale / Microsoft, CC BY-SA 4.0)',
    categoryTag: 'Executive Tech Portrait',
    fileSizeKb: 166,
  },
  'frida-kahlo': {
    fileName: 'frida-kahlo.jpg',
    src: '/images/frida-kahlo.jpg',
    fallbackSrc: createSvgFallback('Frida Kahlo', 'The Radical Alchemy of Pain', '#ec4899'),
    alt: 'Historical photograph of Mexican painter Frida Kahlo with traditional hair arrangement, taken by Guillermo Kahlo in 1932.',
    caption: 'Frida Kahlo: Authentic portrait by Guillermo Kahlo, 1932 (Museo Frida Kahlo / Public Domain)',
    categoryTag: 'Historical Artist Portrait',
    fileSizeKb: 163,
  },
  'jensen-huang': {
    fileName: 'jensen-huang.jpg',
    src: '/images/jensen-huang.jpg',
    fallbackSrc: createSvgFallback('Jensen Huang', 'Enduring Pain & First Principles', '#10b981'),
    alt: 'Authentic documentary photograph of NVIDIA CEO Jensen Huang speaking on stage in his signature black leather jacket.',
    caption: 'Jensen Huang: Press photograph at global tech keynote (CC BY-SA 4.0)',
    categoryTag: 'Executive Tech Portrait',
    fileSizeKb: 158,
  },
};
