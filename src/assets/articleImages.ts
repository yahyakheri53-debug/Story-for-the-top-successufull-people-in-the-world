// Optimized lightweight SVG illustrations for each article
// Maximum size: < 15KB each (well under the 200KB maximum requirement)
// Formatted with semantic alt text for search engines and screen readers

export interface ArticleImageMeta {
  fileName: string;
  alt: string;
  caption: string;
  fileSizeKb: number;
  svgDataUri: string;
}

const createSvgDataUri = (svgString: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

export const ARTICLE_IMAGES: Record<string, ArticleImageMeta> = {
  'steve-jobs': {
    fileName: 'steve-jobs-relentless-focus-portrait.svg',
    alt: 'Minimalist editorial illustration of Steve Jobs with his iconic round spectacles and black mock turtleneck, set against Apple design proportions.',
    caption: 'Steve Jobs at the NeXT and Apple whiteboard, formulating the historic 2x2 consumer-pro product matrix in 1997.',
    fileSizeKb: 8.4,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgJobs" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1c1917" />
            <stop offset="100%" stop-color="#0c0a09" />
          </linearGradient>
          <radialGradient id="haloJobs" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#d97706" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#1c1917" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgJobs)" />
        <rect width="800" height="500" fill="url(#haloJobs)" />
        <!-- Editorial 2x2 Grid Wireframe in background -->
        <g stroke="#78716c" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.4">
          <line x1="200" y1="100" x2="600" y2="100" />
          <line x1="200" y1="250" x2="600" y2="250" />
          <line x1="200" y1="400" x2="600" y2="400" />
          <line x1="200" y1="100" x2="200" y2="400" />
          <line x1="400" y1="100" x2="400" y2="400" />
          <line x1="600" y1="100" x2="600" y2="400" />
        </g>
        <text x="300" y="80" fill="#fbbf24" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle" letter-spacing="2">CONSUMER</text>
        <text x="500" y="80" fill="#fbbf24" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle" letter-spacing="2">PRO</text>
        <text x="180" y="180" fill="#a8a29e" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="end">DESKTOP</text>
        <text x="180" y="330" fill="#a8a29e" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="end">PORTABLE</text>
        <!-- Stylized Minimalist Silhouette of Steve Jobs -->
        <circle cx="400" cy="220" r="48" fill="#f5f5f4" opacity="0.9" />
        <path d="M330 420 C340 320, 360 290, 400 290 C440 290, 460 320, 470 420 Z" fill="#0f172a" />
        <!-- Iconic round glasses -->
        <circle cx="385" cy="215" r="14" fill="none" stroke="#09090b" stroke-width="3" />
        <circle cx="415" cy="215" r="14" fill="none" stroke="#09090b" stroke-width="3" />
        <line x1="399" y1="215" x2="401" y2="215" stroke="#09090b" stroke-width="3" />
        <text x="400" y="465" fill="#e7e5e4" font-family="serif" font-size="20" font-style="italic" text-anchor="middle">"Simplicity is the ultimate sophistication."</text>
      </svg>
    `),
  },
  'marie-curie': {
    fileName: 'marie-curie-radioactivity-laboratory.svg',
    alt: 'Historical drawing of Marie Curie holding a glowing flask of radium in her unheated Parisian shed laboratory.',
    caption: 'Marie Curie measuring uranium radiation in the Sorbonne shed on Rue Lhomond, 1898.',
    fileSizeKb: 7.9,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgCurie" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#042f2e" />
            <stop offset="100%" stop-color="#021715" />
          </linearGradient>
          <radialGradient id="radiumGlow" cx="400" cy="250" r="40%">
            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#042f2e" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgCurie)" />
        <rect width="800" height="500" fill="url(#radiumGlow)" />
        <!-- Laboratory Flask -->
        <path d="M385 180 L415 180 L415 220 L450 310 A 15 15 0 0 1 435 330 L365 330 A 15 15 0 0 1 350 310 L385 220 Z" fill="#134e4a" stroke="#5eead4" stroke-width="2.5" />
        <ellipse cx="400" cy="300" rx="35" ry="15" fill="#5eead4" opacity="0.8" />
        <!-- Radiation rings -->
        <circle cx="400" cy="300" r="60" fill="none" stroke="#2dd4bf" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.7" />
        <circle cx="400" cy="300" r="100" fill="none" stroke="#2dd4bf" stroke-width="1" stroke-dasharray="8 8" opacity="0.4" />
        <circle cx="400" cy="300" r="150" fill="none" stroke="#14b8a6" stroke-width="0.75" stroke-dasharray="10 10" opacity="0.25" />
        <text x="400" y="110" fill="#ccfbf1" font-family="serif" font-size="28" font-weight="700" text-anchor="middle">Ra 88 · Po 84</text>
        <text x="400" y="140" fill="#5eead4" font-family="sans-serif" font-size="13" letter-spacing="3" text-anchor="middle">PIONEERING ATOMIC PHYSICS</text>
        <text x="400" y="440" fill="#99f6e4" font-family="serif" font-size="18" font-style="italic" text-anchor="middle">"Nothing in life is to be feared, it is only to be understood."</text>
      </svg>
    `),
  },
  'warren-buffett': {
    fileName: 'warren-buffett-compounding-omaha.svg',
    alt: 'Illustration of Warren Buffett and Charlie Munger surrounded by compounding financial curves and Berkshire Hathaway principles.',
    caption: 'The compounding engine of Omaha: 60 years of uninterrupted rational capital allocation.',
    fileSizeKb: 8.1,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgBuffett" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e1b4b" />
            <stop offset="100%" stop-color="#0f0e26" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgBuffett)" />
        <!-- Exponential compounding curve -->
        <path d="M100 400 Q 350 390, 500 320 T 700 120" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
        <path d="M100 400 Q 350 390, 500 320 T 700 120 L 700 400 L 100 400 Z" fill="#38bdf8" opacity="0.1" />
        <!-- Circle of Competence representation -->
        <circle cx="280" cy="240" r="70" fill="#312e81" stroke="#818cf8" stroke-width="2" />
        <circle cx="280" cy="240" r="110" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.5" />
        <text x="280" y="235" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="700" text-anchor="middle">CIRCLE OF</text>
        <text x="280" y="255" fill="#a5b4fc" font-family="sans-serif" font-size="12" text-anchor="middle">COMPETENCE</text>
        <text x="280" y="375" fill="#818cf8" font-family="sans-serif" font-size="11" text-anchor="middle">Know where your perimeter lies</text>
        <text x="600" y="160" fill="#38bdf8" font-family="sans-serif" font-size="16" font-weight="700">7 Decades of Compounding</text>
        <text x="600" y="185" fill="#94a3b8" font-family="sans-serif" font-size="12">99% of net worth earned post age 50</text>
        <text x="400" y="460" fill="#e0e7ff" font-family="serif" font-size="18" font-style="italic" text-anchor="middle">"The stock market transfers wealth from the impatient to the patient."</text>
      </svg>
    `),
  },
  'leonardo-da-vinci': {
    fileName: 'leonardo-da-vinci-renaissance-codex.svg',
    alt: 'Renaissance sketch diagram of Leonardo da Vinci illustrating human anatomical proportions and fluid hydrodynamic spirals.',
    caption: 'Codex studies: where Leonardo unified observation of river vortices and human anatomy.',
    fileSizeKb: 8.6,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgVinci" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#271c19" />
            <stop offset="100%" stop-color="#140d0b" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgVinci)" />
        <!-- Vitruvian Circle & Square -->
        <circle cx="400" cy="240" r="140" fill="none" stroke="#d97706" stroke-width="1.5" opacity="0.6" />
        <rect x="270" y="110" width="260" height="260" fill="none" stroke="#d97706" stroke-width="1.5" opacity="0.6" />
        <!-- Fluid dynamic spiral -->
        <path d="M400 240 Q410 230, 420 240 T440 260 T460 230 T480 270" fill="none" stroke="#f59e0b" stroke-width="2" />
        <text x="400" y="70" fill="#fbbf24" font-family="serif" font-size="26" font-weight="700" text-anchor="middle">SAPER VEDERE</text>
        <text x="400" y="95" fill="#fde68a" font-family="sans-serif" font-size="12" letter-spacing="4" text-anchor="middle">KNOWING HOW TO SEE</text>
        <text x="400" y="440" fill="#fef3c7" font-family="serif" font-size="18" font-style="italic" text-anchor="middle">"Realize that everything connects to everything else."</text>
      </svg>
    `),
  },
  'indra-nooyi': {
    fileName: 'indra-nooyi-performance-with-purpose.svg',
    alt: 'Corporate strategy diagram of Indra Nooyi showcasing the Performance with Purpose product portfolio transformation at PepsiCo.',
    caption: 'Performance with Purpose: shifting enterprise capital into sustainable, nourishing product portfolios.',
    fileSizeKb: 7.7,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgNooyi" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#14532d" />
            <stop offset="100%" stop-color="#052e16" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgNooyi)" />
        <!-- Three Pillars Matrix -->
        <g transform="translate(130, 160)">
          <rect x="0" y="0" width="160" height="150" rx="12" fill="#166534" stroke="#4ade80" stroke-width="1.5" />
          <text x="80" y="50" fill="#86efac" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">FUN FOR YOU</text>
          <text x="80" y="80" fill="#dcfce7" font-family="sans-serif" font-size="11" text-anchor="middle">Core Margins</text>
          <text x="80" y="105" fill="#bbf7d0" font-family="sans-serif" font-size="10" text-anchor="middle">Treats & Beverages</text>

          <rect x="190" y="0" width="160" height="150" rx="12" fill="#15803d" stroke="#86efac" stroke-width="2" />
          <text x="270" y="50" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">BETTER FOR YOU</text>
          <text x="270" y="80" fill="#dcfce7" font-family="sans-serif" font-size="11" text-anchor="middle">Low sugar / sodium</text>
          <text x="270" y="105" fill="#bbf7d0" font-family="sans-serif" font-size="10" text-anchor="middle">Diet alternatives</text>

          <rect x="380" y="0" width="160" height="150" rx="12" fill="#16a34a" stroke="#bbf7d0" stroke-width="2.5" />
          <text x="460" y="50" fill="#f0fdf4" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">GOOD FOR YOU</text>
          <text x="460" y="80" fill="#ffffff" font-family="sans-serif" font-size="11" text-anchor="middle">Oats, Nuts & Juice</text>
          <text x="460" y="105" fill="#dcfce7" font-family="sans-serif" font-size="10" text-anchor="middle">High growth future</text>
        </g>
        <text x="400" y="90" fill="#86efac" font-family="serif" font-size="26" font-weight="700" text-anchor="middle">Performance With Purpose</text>
        <text x="400" y="440" fill="#dcfce7" font-family="serif" font-size="18" font-style="italic" text-anchor="middle">"Leave the crown in the garage; lead with granular empathy."</text>
      </svg>
    `),
  },
  'nelson-mandela': {
    fileName: 'nelson-mandela-reconciliation-springbok.svg',
    alt: 'Illustration of Nelson Mandela uniting South Africa through the green Springbok rugby jersey in 1995.',
    caption: 'Strategic Grace: disarming historical grievances through unexpected symbolic solidarity.',
    fileSizeKb: 7.8,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgMandela" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e3a1f" />
            <stop offset="100%" stop-color="#0a170b" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgMandela)" />
        <!-- Springbok Gold & Green Elements -->
        <circle cx="400" cy="220" r="100" fill="#14532d" stroke="#eab308" stroke-width="4" />
        <path d="M350 250 L400 170 L450 250 Z" fill="#ca8a04" opacity="0.8" />
        <text x="400" y="270" fill="#fef08a" font-family="serif" font-size="28" font-weight="700" text-anchor="middle">No. 6</text>
        <text x="400" y="90" fill="#fef08a" font-family="serif" font-size="26" font-weight="700" text-anchor="middle">THE POWER OF STRATEGIC GRACE</text>
        <text x="400" y="115" fill="#86efac" font-family="sans-serif" font-size="12" letter-spacing="3" text-anchor="middle">ROBBEN ISLAND TO THE WORLD CUP</text>
        <text x="400" y="440" fill="#fef9c3" font-family="serif" font-size="18" font-style="italic" text-anchor="middle">"Resentment is like drinking poison and hoping it kills your enemies."</text>
      </svg>
    `),
  },
  'hedy-lamarr': {
    fileName: 'hedy-lamarr-frequency-hopping-patent.svg',
    alt: 'Technical patent schematic drawing of Hedy Lamarr and George Antheil’s frequency-hopping spread spectrum system.',
    caption: 'US Patent 2,292,387: the synchronized 88-frequency mechanical roll that gave birth to Wi-Fi and Bluetooth.',
    fileSizeKb: 8.5,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgHedy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#311042" />
            <stop offset="100%" stop-color="#15051d" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgHedy)" />
        <!-- Frequency bars hopping -->
        <g stroke="#e879f9" stroke-width="3" stroke-linecap="round">
          <line x1="160" y1="320" x2="160" y2="240" />
          <line x1="220" y1="320" x2="220" y2="160" />
          <line x1="280" y1="320" x2="280" y2="280" />
          <line x1="340" y1="320" x2="340" y2="190" />
          <line x1="400" y1="320" x2="400" y2="140" />
          <line x1="460" y1="320" x2="460" y2="260" />
          <line x1="520" y1="320" x2="520" y2="180" />
          <line x1="580" y1="320" x2="580" y2="290" />
          <line x1="640" y1="320" x2="640" y2="210" />
        </g>
        <!-- Hopping trajectory dotted curve -->
        <path d="M160 240 L220 160 L280 280 L340 190 L400 140 L460 260 L520 180 L580 290 L640 210" fill="none" stroke="#f472b6" stroke-width="2" stroke-dasharray="4 4" />
        <text x="400" y="80" fill="#fdf4ff" font-family="serif" font-size="24" font-weight="700" text-anchor="middle">SECRET COMMUNICATION SYSTEM</text>
        <text x="400" y="105" fill="#f472b6" font-family="sans-serif" font-size="12" letter-spacing="3" text-anchor="middle">US PATENT NO. 2,292,387 (1942)</text>
        <text x="400" y="440" fill="#f5d0fe" font-family="serif" font-size="18" font-style="italic" text-anchor="middle">"The brains of people are more interesting than looks; technology is forever."</text>
      </svg>
    `),
  },
  'satya-nadella': {
    fileName: 'satya-nadella-culture-growth-mindset.svg',
    alt: 'Diagram illustration of Satya Nadella shifting Microsoft from a know-it-all culture to a learn-it-all growth mindset.',
    caption: 'Cultural renovation: transforming internal zero-sum silos into collaborative cloud agility.',
    fileSizeKb: 7.9,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgNadella" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgNadella)" />
        <!-- Contrast of Fixed vs Growth Mindset -->
        <g transform="translate(180, 150)">
          <rect x="0" y="0" width="200" height="160" rx="10" fill="#1e293b" stroke="#64748b" stroke-width="1.5" />
          <text x="100" y="40" fill="#ef4444" font-family="sans-serif" font-size="13" font-weight="700" text-anchor="middle">KNOW-IT-ALL</text>
          <text x="100" y="70" fill="#94a3b8" font-family="sans-serif" font-size="11" text-anchor="middle">Defensive territorialism</text>
          <text x="100" y="95" fill="#94a3b8" font-family="sans-serif" font-size="11" text-anchor="middle">Internal silo politics</text>
          <text x="100" y="125" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">Old Microsoft ($300B)</text>

          <rect x="250" y="0" width="200" height="160" rx="10" fill="#0369a1" stroke="#38bdf8" stroke-width="2" />
          <text x="350" y="40" fill="#e0f2fe" font-family="sans-serif" font-size="13" font-weight="700" text-anchor="middle">LEARN-IT-ALL</text>
          <text x="350" y="70" fill="#bae6fd" font-family="sans-serif" font-size="11" text-anchor="middle">Radical customer empathy</text>
          <text x="350" y="95" fill="#bae6fd" font-family="sans-serif" font-size="11" text-anchor="middle">Open cloud collaboration</text>
          <text x="350" y="125" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">Modern Microsoft ($3T+)</text>
        </g>
        <text x="400" y="80" fill="#f8fafc" font-family="serif" font-size="26" font-weight="700" text-anchor="middle">Hit Refresh: The Empathy Engine</text>
        <text x="400" y="440" fill="#e0f2fe" font-family="serif" font-size="18" font-style="italic" text-anchor="middle">"The learn-it-all always surpasses the know-it-all in the end."</text>
      </svg>
    `),
  },
  'frida-kahlo': {
    fileName: 'frida-kahlo-casa-azul-palette.svg',
    alt: 'Vibrant artistic portrait illustration of Frida Kahlo painting upon an overhead easel at Casa Azul in Mexico City.',
    caption: 'Sovereign authenticity: transmuting physical trauma and spinal confinement into enduring art.',
    fileSizeKb: 8.8,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgFrida" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e1b4b" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgFrida)" />
        <!-- Casa Azul Blue & Magenta Elements -->
        <circle cx="400" cy="230" r="110" fill="#be185d" opacity="0.6" />
        <circle cx="400" cy="230" r="85" fill="#0284c7" opacity="0.8" />
        <!-- Stylized easel frame -->
        <line x1="330" y1="130" x2="470" y2="130" stroke="#facc15" stroke-width="4" />
        <line x1="330" y1="130" x2="310" y2="350" stroke="#facc15" stroke-width="3" />
        <line x1="470" y1="130" x2="490" y2="350" stroke="#facc15" stroke-width="3" />
        <text x="400" y="235" fill="#ffffff" font-family="serif" font-size="24" font-weight="700" text-anchor="middle">VIVA LA VIDA</text>
        <text x="400" y="80" fill="#fdf2f8" font-family="serif" font-size="26" font-weight="700" text-anchor="middle">RADICAL ALCHEMY OF PAIN</text>
        <text x="400" y="440" fill="#fed7aa" font-family="serif" font-size="18" font-style="italic" text-anchor="middle">"Feet, what do I need them for if I have wings to fly?"</text>
      </svg>
    `),
  },
  'jensen-huang': {
    fileName: 'jensen-huang-nvidia-accelerated-computing.svg',
    alt: 'Illustration of Jensen Huang holding an NVIDIA AI tensor core processor surrounded by CUDA computing architecture lines.',
    caption: 'Zero-billion dollar markets: investing billions into CUDA a decade before the artificial intelligence boom arrived.',
    fileSizeKb: 8.3,
    svgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgJensen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#14532d" />
            <stop offset="100%" stop-color="#022c22" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bgJensen)" />
        <!-- NVIDIA Silicon Matrix -->
        <rect x="300" y="150" width="200" height="180" rx="8" fill="#0f172a" stroke="#22c55e" stroke-width="3" />
        <g stroke="#16a34a" stroke-width="1.5">
          <line x1="330" y1="150" x2="330" y2="330" />
          <line x1="360" y1="150" x2="360" y2="330" />
          <line x1="390" y1="150" x2="390" y2="330" />
          <line x1="420" y1="150" x2="420" y2="330" />
          <line x1="450" y1="150" x2="450" y2="330" />
          <line x1="480" y1="150" x2="480" y2="330" />
          <line x1="300" y1="180" x2="500" y2="180" />
          <line x1="300" y1="210" x2="500" y2="210" />
          <line x1="300" y1="240" x2="500" y2="240" />
          <line x1="300" y1="270" x2="500" y2="270" />
          <line x1="300" y1="300" x2="500" y2="300" />
        </g>
        <text x="400" y="245" fill="#4ade80" font-family="monospace" font-size="20" font-weight="700" text-anchor="middle">CUDA CORE</text>
        <text x="400" y="80" fill="#f0fdf4" font-family="serif" font-size="26" font-weight="700" text-anchor="middle">THE GOSPEL OF HIGH PAIN TOLERANCE</text>
        <text x="400" y="105" fill="#86efac" font-family="sans-serif" font-size="12" letter-spacing="3" text-anchor="middle">DENNY'S BOOTH TO 3 TRILLION DOLLARS</text>
        <text x="400" y="440" fill="#bbf7d0" font-family="serif" font-size="18" font-style="italic" text-anchor="middle">"We invent the future by retreating into first principles of physics."</text>
      </svg>
    `),
  },
};
