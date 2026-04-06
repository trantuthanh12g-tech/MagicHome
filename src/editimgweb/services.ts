// ================================================================
// MAGIC HOME — FILE CHỈNH SỬA NỘI DUNG DỊCH VỤ
// ================================================================
// Files in /public are served as static assets — reference them as
// URL strings (never import them). Use import.meta.env.BASE_URL so
// paths work correctly regardless of the Vite `base` config.
// ================================================================

// ── LOGO ─────────────────────────────────────────────────────────
export const logoImg = `/logo/logo.png`;

// ── HERO SLIDESHOW ───────────────────────────────────────────────
export const heroImages: string[] = [
  `/Photos/cover.jpg`,
  `/DaytoDusk/cover.jpg`,
  `/Retouch/cover.jpg`,
  `/VirtualHomeStaging/cover.jpg`,
  `/Floorplan/cover.jpg`,
  `/cover_video/covervideo.jpg`,
];

// ── STEP BY STEP IMAGES ──────────────────────────────────────────
// Thêm ảnh vào thư mục /public/StepByStep/ và khai báo đường dẫn ở đây
export const stepByStepImages: string[] = [
  `/StepByStep/StepByStep.jpg`,
];

// ── PORTFOLIO IMAGES ─────────────────────────────────────────────
// Thêm ảnh vào thư mục /public/Portfolio/ và khai báo đường dẫn ở đây
export const portfolioImages: string[] = [
 `/Portfolio/Portfolio1.jpg`,
  `/Portfolio/Portfolio2.jpg`,
  `/Portfolio/Portfolio3.jpg`,
  `/Portfolio/Portfolio4.jpg`,
  `/Portfolio/Portfolio5.jpg`,
  `/Portfolio/Portfolio6.jpg`,
  `/Portfolio/Portfolio7.jpg`,
  `/Portfolio/Portfolio8.jpg`, 
  `/Portfolio/Portfolio9.jpg`,
  `/Portfolio/Portfolio10.jpg`,
  `/Portfolio/Portfolio11.jpg`,
  `/Portfolio/Portfolio12.jpg`,
  `/Portfolio/Portfolio13.jpg`,
  `/Portfolio/Portfolio14.jpg`,
  `/Portfolio/Portfolio15.jpg`,
  `/Portfolio/Portfolio16.jpg`,
  `/Portfolio/Portfolio17.jpg`,
  `/Portfolio/Portfolio18.jpg`,
  `/Portfolio/Portfolio19.jpg`,
  `/Portfolio/Portfolio20.jpg`,
  `/Portfolio/Portfolio21.jpg`,
  `/Portfolio/Portfolio22.jpg`,
  `/Portfolio/Portfolio23.jpg`,
  `/Portfolio/Portfolio24.jpg`,
  `/Portfolio/Portfolio25.jpg`,
  `/Portfolio/Portfolio26.jpg`,
  `/Portfolio/Portfolio27.jpg`,
  `/Portfolio/Portfolio28.jpg`,
  `/Portfolio/Portfolio29.jpg`,
  `/Portfolio/Portfolio30.jpg`,
  `/Portfolio/Portfolio31.jpg`,
  `/Portfolio/Portfolio32.jpg`,

];

// ================================================================
// DANH SÁCH DỊCH VỤ
// ================================================================
export const services = [

  // ── 1. PHOTOS ─────────────────────────────────────────────────
  {
    id: 'photos',
    name: 'Photos',
    subtitle: 'HDR – Single Exposure – Flambient',
    price: 'From $0.5',
    priceUnit: 'per image',
    deliveryTime: '<12 hours delivery',
    description: 'Professional real estate photo editing — color correction, sky replacement, HDR blending and exposure enhancement to make every property shine.',
    coverImage: `/Photos/cover.jpg`,
    images: [
      { id: '1', url: `/Photos/photos1.jpg`, caption: '' },
      { id: '2', url: `/Photos/photos2.jpg`, caption: '' },
      { id: '3', url: `/Photos/photos3.jpg`, caption: '' },
      { id: '4', url: `/Photos/photos4.jpg`, caption: '' },
      { id: '5', url: `/Photos/photos5.jpg`, caption: '' },
      { id: '6', url: `/Photos/photos6.jpg`, caption: '' },
      { id: '7', url: `/Photos/photos7.jpg`, caption: '' },
      { id: '8', url: `/Photos/photos8.jpg`, caption: '' },
      { id: '9', url: `/Photos/photos9.jpg`, caption: '' },
      { id: '10', url: `/Photos/photos10.jpg`, caption: '' },
      { id: '11', url: `/Photos/photos11.jpg`, caption: '' },
      { id: '12', url: `/Photos/photos12.jpg`, caption: '' },
      { id: '13', url: `/Photos/photos13.jpg`, caption: '' },
      { id: '14', url: `/Photos/photos14.jpg`, caption: '' },
      { id: '15', url: `/Photos/photos15.jpg`, caption: '' },
      { id: '16', url: `/Photos/photos16.jpg`, caption: '' },
      { id: '17', url: `/Photos/photos17.jpg`, caption: '' },
      { id: '18', url: `/Photos/photos18.jpg`, caption: '' },
      { id: '19', url: `/Photos/photos19.jpg`, caption: '' },
      { id: '20', url: `/Photos/photos20.jpg`, caption: '' },
 
    ],
    videos: [],
    beforeAfterPairs: [
      { id: 'ba1', before: `/BeforeAfterSlider/Photos/before1.jpg`,  after: `/BeforeAfterSlider/Photos/affter1.jpg`,  label: 'Before & After 1' },
      { id: 'ba2', before: `/BeforeAfterSlider/Photos/before2.jpg`, after: `/BeforeAfterSlider/Photos/affter2.jpg`, label: 'Before & After 2' },
    ],
  },

  // ── 2. DAY TO DUSK ────────────────────────────────────────────
  {
    id: 'day-to-dusk',
    name: 'Day To Dusk',
    subtitle: 'Twilight – Sunset Sky – Glow Effect',
    price: 'From $5',
    priceUnit: 'per image',
    deliveryTime: '<12 hours delivery',
    description: 'Turn flat daytime exteriors into dramatic twilight shots — glowing windows, vivid sunset skies and ambient lighting that captivates buyers.',
    coverImage: `/DaytoDusk/cover.jpg`,
    images: [
      { id: '1', url: `/DaytoDusk/DaytoDusk.jpg`, caption: '' },
      { id: '2', url: `/DaytoDusk/DaytoDusk1.jpg`, caption: '' },
      { id: '2', url: `/DaytoDusk/DaytoDusk2.jpg`, caption: '' },
      { id: '3', url: `/DaytoDusk/DaytoDusk3.jpg`, caption: '' },
      { id: '4', url: `/DaytoDusk/DaytoDusk4.jpg`, caption: '' },

    ],
    videos: [],
    beforeAfterPairs: [
      { id: 'ba1', before: `/BeforeAfterSlider/DayToDusk/before1.jpg`, after: `/BeforeAfterSlider/DayToDusk/affter1.jpg`, label: 'Before & After 1' },
      { id: 'ba2', before: `/BeforeAfterSlider/DayToDusk/before2.jpg`, after: `/BeforeAfterSlider/DayToDusk/affter2.jpg`, label: 'Before & After 2' },
    ],
  },

  // ── 3. RETOUCH ────────────────────────────────────────────────
  {
    id: 'retouch',
    name: 'Retouch',
    subtitle: 'Object Removal – Sky Enhancement – Cleanup',
    price: 'From $1',
    priceUnit: 'per image',
    deliveryTime: '<12 hours delivery',
    description: 'Remove distractions, fix imperfections and polish every detail. Object removal, sky enhancement and full-scene cleanup for flawless listings.',
    coverImage: `/Retouch/cover.jpg`,
    images: [
      { id: '1', url: `/Retouch/Retouch1.jpg`, caption: '' },
    ],
    videos: [],
    beforeAfterPairs: [
      { id: 'ba1', before: `/BeforeAfterSlider/Retouch/before1.jpg`, after: `/BeforeAfterSlider/Retouch/affter1.jpg`, label: 'Before & After 1' },
      { id: 'ba2', before: `/BeforeAfterSlider/Retouch/before2.jpg`, after: `/BeforeAfterSlider/Retouch/affter2.jpg`, label: 'Before & After 2' },
    ],
  },
  // ── 3. Grass Replacement ────────────────────────────────────────────────
  {
    id: 'grass-replacement',
    name: 'Grass Replacement',
    subtitle: 'Turf Repair – Patch Filling – Greener Lawns',
    price: 'From $1',
    priceUnit: 'per image',
    deliveryTime: '<12 hours delivery',
    description: 'Replace worn or patchy lawns with natural-looking grass replacement and patch repairs to boost curb appeal in listing photos.',
    coverImage: `/GrassReplacement/cover.jpg`,
    images: [
      { id: '1', url: `/GrassReplacement/GrassReplacement1.jpg`, caption: '' },
      { id: '2', url: `/GrassReplacement/GrassReplacement2.jpg`, caption: '' },
    ],
    videos: [],
    beforeAfterPairs: [
      { id: 'ba1', before: `/BeforeAfterSlider/GrassReplacement/before1.jpg`, after: `/BeforeAfterSlider/GrassReplacement/affter1.jpg`, label: 'Before & After 1' },
      { id: 'ba2', before: `/BeforeAfterSlider/GrassReplacement/before2.jpg`, after: `/BeforeAfterSlider/GrassReplacement/affter2.jpg`, label: 'Before & After 2' },
    ],
  },

  // ── 4. VIRTUAL HOME STAGING ───────────────────────────────────
  {
    id: 'virtual-staging',
    name: 'Virtual Home Staging',
    subtitle: 'High Quality – Furniture Placement – Renovation',
    price: 'From $15',
    priceUnit: 'per image',
    deliveryTime: '<12 hours delivery',
    description: 'Digitally furnish empty rooms with photorealistic furniture and décor. Help buyers visualise the full lifestyle potential of any property.',
    coverImage: `/VirtualHomeStaging/cover.jpg`,
    images: [
      { id: '1', url: `/VirtualHomeStaging/VirtualHomeStaging1.jpg`, caption: '' },
      { id: '2', url: `/VirtualHomeStaging/VirtualHomeStaging2.jpg`, caption: '' },
      { id: '3', url: `/VirtualHomeStaging/VirtualHomeStaging3.jpg`, caption: '' },
      { id: '4', url: `/VirtualHomeStaging/VirtualHomeStaging4.jpg`, caption: '' },
      { id: '5', url: `/VirtualHomeStaging/VirtualHomeStaging5.jpg`, caption: '' },
    ],
    videos: [],
    beforeAfterPairs: [
      { id: 'ba1', before: `/BeforeAfterSlider/VirtualHomeStaging/before1.jpg`, after: `/BeforeAfterSlider/VirtualHomeStaging/affter1.jpg`, label: 'Before & After 1' },
      { id: 'ba2', before: `/BeforeAfterSlider/VirtualHomeStaging/before2.jpg`, after: `/BeforeAfterSlider/VirtualHomeStaging/affter2.jpg`, label: 'Before & After 2' },
    ],
  },

  // ── 5. VIDEO ──────────────────────────────────────────────────
  {
    id: 'video',
    name: 'Video',
    subtitle: 'Cinematic – Drone Footage – Branded Films',
    price: 'From $20',
    priceUnit: 'per video',
    deliveryTime: '<12 hours delivery',
    description: 'Cinematic real estate video production and post-production. Smooth walkthroughs, drone footage editing and branded property films.',
    coverImage: `/cover_video/covervideo.jpg`,
    images: [],
    videos: [
      { id: '1', youtubeUrl: 'https://youtu.be/SQeRYv9Aa-4?si=X31hwivYgoJT-DkA', title: '' },
      { id: '2', youtubeUrl: 'https://youtu.be/qtTNSrZUwUg?si=pkMu8b7wt4EajwE7', title: '' },
      { id: '3', youtubeUrl: 'https://youtu.be/wzPvYNWmtFc?si=Y0QwgfSE0oRHlk0X', title: '' },
    ],
  },

  // ── 6. FLOORPLAN ──────────────────────────────────────────────
  {
    id: 'floorplan',
    name: 'Floorplan',
    subtitle: '2D & 3D – Precise Layout – Professional',
    price: 'From $10',
    priceUnit: 'per plan',
    deliveryTime: '<12 hours delivery',
    description: 'Precise 2D and 3D floor plans drawn from photos or rough sketches. Clean, professional layouts that help buyers understand every space.',
    coverImage: `/Floorplan/cover.jpg`,
    images: [
      { id: '1', url: `/Floorplan/Floorplan1.jpg`, caption: '' },
      { id: '2', url: `/Floorplan/Floorplan2.jpg`, caption: '' },
      { id: '3', url: `/Floorplan/Floorplan3.jpg`, caption: '' },
      { id: '4', url: `/Floorplan/Floorplan4.jpg`, caption: '' },
    ],
    videos: [],
  },

];
