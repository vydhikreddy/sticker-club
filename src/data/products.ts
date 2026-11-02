import type { Product, StickerDesign, Variant } from '../types/product';
import { series } from './rarity';
import { realStickerProducts, realPosterProducts } from './realProducts';

/**
 * DEMO CATALOGUE — stickers and posters
 * ---------------------------------------------------------------------------
 * Every product, price and description lives in this one file.
 * - Prices are TEST prices from the pricing plan, not final selling prices.
 * - Size, material and finish are intentionally left out: add them only once
 *   a supplier has confirmed them (the product page then shows them).
 * - All artwork is original and drawn in SVG from the `art` descriptions.
 *   To use real photos, add an `images` array to a product.
 */

// Colour shortcuts so the designs below stay readable.
const ink = '#121212';
const paper = '#F5F0E6';
const white = '#FFFFFF';
const lime = '#D4FF3A';
const tomato = '#FF5B2E';
const bubble = '#FFB3D1';
const sky = '#8FD3FF';
const grape = '#8A6CFF';
const sun = '#FFD447';
const mint = '#7FE0B5';
const kraft = '#D9B98C';

// ---------- Individual sticker designs (reused inside sheets and packs) ----------
const d = {
  chaiFirst: { name: 'Chai First', motif: 'chai', label: 'CHAI FIRST', shape: 'circle', bg: sun, fg: ink, accent: tomato },
  worksOnMyMachine: { name: 'Works On My Machine', label: 'WORKS ON\nMY MACHINE', shape: 'pill', bg: ink, fg: lime, accent: lime },
  seventyFive: { name: '75% Club', label: '75%\nCLUB', shape: 'badge', bg: tomato, fg: white, accent: sun },
  jugaad: { name: 'Jugaad Certified', label: 'JUGAAD\nCERTIFIED', shape: 'badge', bg: lime, fg: ink, accent: ink },
  pixelHeart: { name: 'Pixel Heart', motif: 'pixelHeart', shape: 'rounded', bg: grape, fg: tomato, accent: white },
  redline: { name: 'Redline Coupe', motif: 'car', shape: 'pill', bg: sky, fg: ink, accent: tomato },
  sleepyCloud: { name: 'Sleepy Cloud', motif: 'cloud', shape: 'blob', bg: bubble, fg: white, accent: tomato },
  cassette: { name: 'Side A', motif: 'cassette', shape: 'rounded', bg: mint, fg: ink, accent: sun },
  sparkle: { name: 'Tiny Sparkle', motif: 'sparkle', shape: 'circle', bg: ink, fg: paper, accent: lime },
  doItScared: { name: 'Do It Scared', motif: 'bolt', label: 'DO IT SCARED', shape: 'circle', bg: paper, fg: ink, accent: sun },
  apex: { name: 'Apex Flag', motif: 'flag', shape: 'rounded', bg: lime, fg: ink, accent: white },
  bug: { name: 'Little Bug', motif: 'bug', shape: 'circle', bg: lime, fg: ink, accent: tomato },
  code: { name: 'Angle Brackets', motif: 'code', shape: 'rounded', bg: sky, fg: ink, accent: tomato },
  deadline: { name: 'Deadline Clock', motif: 'clock', label: 'BAS 5 MIN', shape: 'circle', bg: white, fg: ink, accent: tomato },
  books: { name: 'Book Stack', motif: 'books', shape: 'blob', bg: sky, fg: ink, accent: sun },
  backbencher: { name: 'Backbencher', label: 'BACK\nBENCHER', shape: 'pill', bg: grape, fg: white, accent: sun },
  oneMoreEp: { name: 'One More Episode', motif: 'moon', label: 'ONE MORE EP', shape: 'circle', bg: ink, fg: sun, accent: white },
  samosa: { name: 'Samosa Hour', motif: 'samosa', shape: 'blob', bg: mint, fg: ink, accent: sun },
  ekNumber: { name: 'Ek Number', label: 'EK\nNUMBER', shape: 'circle', bg: tomato, fg: white, accent: ink },
  adjust: { name: 'Adjust Kar Lo', label: 'ADJUST\nKAR LO', shape: 'pill', bg: sun, fg: ink, accent: ink },
  helmet: { name: 'Lid On', motif: 'helmet', shape: 'circle', bg: tomato, fg: ink, accent: white },
  flagTwo: { name: 'Chequered', motif: 'flag', shape: 'pill', bg: white, fg: ink, accent: lime },
  pitLane: { name: 'Pit Lane', label: 'PIT\nLANE', shape: 'badge', bg: ink, fg: lime, accent: lime },
  controller: { name: 'Pocket Controller', motif: 'controller', shape: 'rounded', bg: lime, fg: ink, accent: tomato },
  pressStart: { name: 'Press Start', label: 'PRESS\nSTART', shape: 'pill', bg: ink, fg: tomato, accent: tomato },
  lifeUp: { name: '1-Up Heart', motif: 'pixelHeart', shape: 'circle', bg: sun, fg: tomato, accent: white },
  cat: { name: 'Window Cat', motif: 'cat', shape: 'blob', bg: sun, fg: ink, accent: bubble },
  smiley: { name: 'Soft Smile', motif: 'smiley', shape: 'circle', bg: bubble, fg: ink, accent: sun },
  headphones: { name: 'Headphones On', motif: 'headphones', shape: 'rounded', bg: bubble, fg: ink, accent: grape },
  softDays: { name: 'Soft Days', label: 'SOFT\nDAYS', shape: 'blob', bg: mint, fg: ink, accent: white },
  // rare (demo classification)
  midnightChai: { name: 'Midnight Chai', motif: 'chai', shape: 'badge', bg: ink, fg: lime, accent: sun },
  ghostBug: { name: 'Ghost Bug', motif: 'bug', shape: 'rounded', bg: grape, fg: white, accent: lime },
  goldenCassette: { name: 'Golden Hour Tape', motif: 'cassette', shape: 'rounded', bg: sun, fg: ink, accent: tomato },
  polePosition: { name: 'Pole Position', motif: 'flag', shape: 'badge', bg: tomato, fg: ink, accent: white },
  // limited edition concepts
  foundersBolt: { name: 'Founders’ Bolt', motif: 'bolt', shape: 'badge', bg: ink, fg: lime, accent: lime },
  dropOne: { name: 'Drop 01', label: 'DROP\n01', shape: 'circle', bg: lime, fg: ink, accent: ink },
  // matching duos
  dayCat: { name: 'Window Cat (awake)', motif: 'cat', shape: 'blob', bg: sun, fg: ink, accent: bubble },
  napCat: { name: 'Window Cat (napping)', motif: 'catNap', shape: 'blob', bg: sky, fg: ink, accent: bubble },
  plug: { name: 'Plug', motif: 'plug', shape: 'rounded', bg: lime, fg: ink, accent: tomato },
  socket: { name: 'Socket', motif: 'socket', shape: 'rounded', bg: ink, fg: lime, accent: tomato },
  halfHeart: { name: 'Half a Heart', motif: 'pixelHeart', shape: 'circle', bg: bubble, fg: tomato, accent: white },
  nightShiftLaptop: { name: 'Night Shift (laptop)', motif: 'moon', label: 'NIGHT SHIFT', shape: 'circle', bg: ink, fg: sun, accent: lime },
  nightShiftPhone: { name: 'Night Shift (phone)', motif: 'moon', shape: 'pill', bg: ink, fg: sun, accent: lime },
  // secret message stickers (original phrases)
  mainCharacter: { name: 'Main Character Energy', label: 'MAIN\nCHARACTER\nENERGY', shape: 'circle', bg: sun, fg: ink, accent: tomato },
  loading: { name: 'Loading…', motif: 'loading', label: 'LOADING…', shape: 'pill', bg: ink, fg: lime, accent: lime },
  doNotDisturb: { name: 'Do Not Disturb', label: 'DO NOT\nDISTURB', shape: 'rounded', bg: tomato, fg: white, accent: sun },
  socialBattery: { name: 'Social Battery Low', motif: 'battery', label: 'SOCIAL BATTERY', shape: 'circle', bg: mint, fg: ink, accent: tomato },
  itCompiled: { name: 'It Compiled', label: 'IT\nCOMPILED.', shape: 'pill', bg: sky, fg: ink, accent: tomato },
  tinySteps: { name: 'Tiny Steps Count', label: 'TINY\nSTEPS\nCOUNT', shape: 'blob', bg: bubble, fg: ink, accent: white },
  // anime-inspired (original characters and props)
  sparkleEyes: { name: 'Sparkle Eyes', motif: 'animeFace', shape: 'circle', bg: bubble, fg: grape, accent: tomato },
  ramenBreak: { name: 'Ramen Break', motif: 'ramen', shape: 'blob', bg: sun, fg: ink, accent: tomato },
  speedStar: { name: 'Speed Star', motif: 'speedStar', shape: 'badge', bg: ink, fg: sun, accent: white },
  plotTwist: { name: 'Plot Twist!?', label: 'PLOT\nTWIST!?', shape: 'rounded', bg: tomato, fg: white, accent: sun },
  // movies (original props, no film titles or posters)
  takeOne: { name: 'Take One', motif: 'clapper', shape: 'rounded', bg: white, fg: ink, accent: tomato },
  admitOne: { name: 'Admit One', motif: 'ticket', label: 'ADMIT ONE', shape: 'pill', bg: sun, fg: ink, accent: tomato },
  popcorn: { name: 'Popcorn Hour', motif: 'popcorn', shape: 'circle', bg: sky, fg: tomato, accent: white },
  // life quotes (original phrases)
  kindOverCool: { name: 'Kind Over Cool', label: 'KIND\nOVER\nCOOL', shape: 'circle', bg: mint, fg: ink, accent: white },
  stillBecoming: { name: 'Still Becoming', motif: 'quoteMarks', label: 'STILL BECOMING', shape: 'rounded', bg: paper, fg: ink, accent: tomato },
  // superhero-inspired: ORIGINAL characters and marks only (no licensed characters or logos)
  capeMode: { name: 'Cape Mode', motif: 'hero', shape: 'rounded', bg: grape, fg: ink, accent: tomato },
  kaPow: { name: 'Ka-Pow!', label: 'KA-\nPOW!', shape: 'badge', bg: sun, fg: tomato, accent: ink },
  heroEmblem: { name: 'Hero Emblem', motif: 'emblem', shape: 'circle', bg: tomato, fg: ink, accent: sun },
} satisfies Record<string, StickerDesign>;

// ---------- Poster sizes ----------
// Standard ISO paper sizes. Prices are TEST prices — update once a printer quotes you.
export const posterSizes: Variant[] = [
  { id: 'a5', label: 'A5', detail: '14.8 × 21 cm', price: 59 },
  { id: 'a4', label: 'A4', detail: '21 × 29.7 cm', price: 89 },
  { id: 'a3', label: 'A3', detail: '29.7 × 42 cm', price: 149 },
];

// ---------- Products ----------
export const products: Product[] = [
// ===== Matching Duos: two coordinated stickers, one product =====
  {
    id: 'duo-001', slug: 'window-cat-day-and-night', name: 'Window Cat: Day & Night', images: [{ src: '/category-art/stickers.webp', alt: 'Window Cat: Day & Night' }],
    shortDescription: 'One original cat in two poses — awake and napping.',
    description: 'Our window cat, twice: wide awake on sunny yellow and fast asleep on sky blue. Put one on your laptop and one on your phone, or split them with a friend.',
    price: 39, category: 'stickers', productType: 'duo', collections: ['cute'],
    tags: ['duo', 'pair', 'cat', 'cute', 'friends'], featured: true, isNew: true, displayOrder: 50, status: 'demo', seriesId: 'S03', rarity: 'common',
    duo: { pairing: 'two-poses', partA: 'Awake', partB: 'Napping', pairNote: 'The same character in two poses. They make sense on their own and tell a little story together.' },
    art: { kind: 'duo', backdrop: '#FFF0B8', designs: [d.dayCat, d.napCat], pairing: 'two-poses' },
  },
  {
    id: 'duo-002', slug: 'plug-and-socket', name: 'Plug & Socket', images: [{ src: '/category-art/stickers.webp', alt: 'Plug & Socket' }],
    shortDescription: 'Two complementary symbols that only make sense together.',
    description: 'A lime plug and a black socket. Give one to your best friend, your project partner or your roommate — you’re the other half of the circuit.',
    price: 39, category: 'stickers', productType: 'duo', collections: [],
    tags: ['duo', 'pair', 'friends', 'tech'], featured: true, isNew: true, displayOrder: 51, status: 'demo', seriesId: 'S02', rarity: 'common',
    duo: { pairing: 'complementary', partA: 'Plug', partB: 'Socket', pairNote: 'Complementary symbols: each sticker is complete, and they connect when placed side by side.' },
    art: { kind: 'duo', backdrop: '#EEFFC2', designs: [d.plug, d.socket], pairing: 'complementary' },
  },
  {
    id: 'duo-003', slug: 'half-a-heart', name: 'Half a Heart', images: [{ src: '/category-art/stickers.webp', alt: 'Half a Heart' }],
    shortDescription: 'One pixel heart, cut into two halves.',
    description: 'A single original pixel-heart illustration split down the middle. Keep one half, give the other away — the picture is only complete when both are together.',
    price: 39, category: 'stickers', productType: 'duo', collections: ['cute', 'gaming'],
    tags: ['duo', 'pair', 'friends', 'heart', 'pixel'], featured: false, isNew: true, displayOrder: 52, status: 'demo', seriesId: 'S04', rarity: 'uncommon',
    duo: { pairing: 'halves', partA: 'Left half', partB: 'Right half', pairNote: 'Two halves of one illustration. Each half is its own die-cut sticker.' },
    art: { kind: 'duo', backdrop: '#FFE0EC', designs: [d.halfHeart, d.halfHeart], pairing: 'halves' },
  },
  {
    id: 'duo-004', slug: 'night-shift-set', name: 'Night Shift Set', images: [{ src: '/category-art/stickers.webp', alt: 'Night Shift Set' }],
    shortDescription: 'A matching laptop sticker and phone-case sticker.',
    description: 'The same moon design in two formats: a round sticker sized for a laptop lid and a slim pill for a phone case, so your devices match.',
    price: 45, category: 'stickers', productType: 'duo', collections: ['minimal'],
    tags: ['duo', 'pair', 'laptop', 'phone case', 'moon'], featured: false, isNew: false, displayOrder: 53, status: 'demo', seriesId: 'S02', rarity: 'common',
    duo: { pairing: 'laptop-phone', partA: 'Laptop sticker', partB: 'Phone-case sticker', pairNote: 'One design in two formats — a larger one for a laptop lid and a slimmer one for a phone case. Exact sizes will be confirmed after printer samples.' },
    art: { kind: 'duo', backdrop: '#E9E3D6', designs: [d.nightShiftLaptop, d.nightShiftPhone], pairing: 'laptop-phone' },
  },
  {
    id: 'duo-005', slug: 'chai-and-samosa', name: 'Chai & Samosa', images: [{ src: '/category-art/stickers.webp', alt: 'Chai & Samosa' }],
    shortDescription: 'The original pair. Better together.',
    description: 'A chai cup and a samosa — two complementary stickers for you and the friend who always joins the canteen run.',
    price: 39, category: 'stickers', productType: 'duo', collections: [],
    tags: ['duo', 'pair', 'friends', 'chai', 'samosa', 'desi'], featured: false, isNew: false, displayOrder: 54, status: 'demo', seriesId: 'S01', rarity: 'common',
    duo: { pairing: 'complementary', partA: 'Chai', partB: 'Samosa', pairNote: 'Complementary symbols: a classic combination, one sticker each.' },
    art: { kind: 'duo', backdrop: '#FFE9A8', designs: [d.chaiFirst, d.samosa], pairing: 'complementary' },
  },

  // ===== Secret Message stickers: each comes with a sealed message card =====
  {
    id: 'sec-001', slug: 'main-character-energy', name: 'Main Character Energy', images: [{ src: '/category-art/gifts.webp', alt: 'Main Character Energy' }],
    shortDescription: 'A loud little sticker, plus a sealed message card.',
    description: 'A sunny round sticker for people who walk into the canteen like it’s their scene. It comes with a sealed card from our Student Life series — the message inside stays a surprise.',
    price: 29, category: 'stickers', productType: 'secret', collections: ['motivation'],
    tags: ['secret message', 'text', 'funny', 'card'], featured: true, isNew: true, displayOrder: 60, status: 'demo', seriesId: 'S01', rarity: 'common',
    messageCardId: 'mc-student-life', messageCardCount: 1,
    art: { kind: 'secret', backdrop: '#FFF0B8', design: d.mainCharacter, envelope: kraft },
  },
  {
    id: 'sec-002', slug: 'loading', name: 'Loading…', images: [{ src: '/category-art/gifts.webp', alt: 'Loading…' }],
    shortDescription: 'For when your brain is still buffering.',
    description: 'A black pill sticker with a lime progress bar. Comes with a sealed card from our Coding & Tech series.',
    price: 29, category: 'stickers', productType: 'secret', collections: [],
    tags: ['secret message', 'coding', 'text', 'card'], featured: true, isNew: true, displayOrder: 61, status: 'demo', seriesId: 'S02', rarity: 'common',
    messageCardId: 'mc-tech', messageCardCount: 1,
    art: { kind: 'secret', backdrop: '#EEFFC2', design: d.loading, envelope: kraft },
  },
  {
    id: 'sec-003', slug: 'do-not-disturb', name: 'Do Not Disturb', images: [{ src: '/category-art/gifts.webp', alt: 'Do Not Disturb' }],
    shortDescription: 'A clear sign for headphones-on hours.',
    description: 'A tomato rounded-square sticker for your laptop lid or door. Comes with a sealed card from our Introvert Hours series.',
    price: 29, category: 'stickers', productType: 'secret', collections: ['minimal', 'music'],
    tags: ['secret message', 'introvert', 'text', 'card'], featured: false, isNew: true, displayOrder: 62, status: 'demo', seriesId: 'S03', rarity: 'common',
    messageCardId: 'mc-introvert', messageCardCount: 1,
    art: { kind: 'secret', backdrop: '#FFD9CC', design: d.doNotDisturb, envelope: kraft },
  },
  {
    id: 'sec-004', slug: 'social-battery-low', name: 'Social Battery Low', images: [{ src: '/category-art/gifts.webp', alt: 'Social Battery Low' }],
    shortDescription: 'A polite way to say you need a minute.',
    description: 'A mint circle sticker with a low battery. Comes with a sealed card from our Introvert Hours series.',
    price: 29, category: 'stickers', productType: 'secret', collections: ['cute'],
    tags: ['secret message', 'introvert', 'battery', 'card'], featured: false, isNew: false, displayOrder: 63, status: 'demo', seriesId: 'S03', rarity: 'common',
    messageCardId: 'mc-introvert', messageCardCount: 1,
    art: { kind: 'secret', backdrop: '#D3F6E6', design: d.socialBattery, envelope: kraft },
  },
  {
    id: 'sec-005', slug: 'it-compiled', name: 'It Compiled.', images: [{ src: '/category-art/gifts.webp', alt: 'It Compiled.' }],
    shortDescription: 'Small victories deserve stickers.',
    description: 'A sky-blue pill for the rare first-try build. Comes with a sealed card from our Coding & Tech series.',
    price: 29, category: 'stickers', productType: 'secret', collections: [],
    tags: ['secret message', 'coding', 'text', 'card'], featured: false, isNew: false, displayOrder: 64, status: 'demo', seriesId: 'S02', rarity: 'common',
    messageCardId: 'mc-tech', messageCardCount: 1,
    art: { kind: 'secret', backdrop: '#D6F0FF', design: d.itCompiled, envelope: kraft },
  },
  {
    id: 'sec-006', slug: 'tiny-steps-count', name: 'Tiny Steps Count', images: [{ src: '/category-art/gifts.webp', alt: 'Tiny Steps Count' }],
    shortDescription: 'A gentle push for slow weeks.',
    description: 'A pink blob sticker for progress you can’t see yet. Comes with a sealed card from our Motivation series.',
    price: 29, category: 'stickers', productType: 'secret', collections: ['motivation', 'cute'],
    tags: ['secret message', 'motivation', 'text', 'card'], featured: false, isNew: false, displayOrder: 65, status: 'demo', seriesId: 'S03', rarity: 'common',
    messageCardId: 'mc-motivation', messageCardCount: 1,
    art: { kind: 'secret', backdrop: '#FFE0EC', design: d.tinySteps, envelope: kraft },
  },
  {
    id: 'sec-007', slug: 'sealed-notes-pack', name: 'Sealed Notes Pack', images: [{ src: '/category-art/gifts.webp', alt: 'Sealed Notes Pack' }],
    shortDescription: 'Four message stickers and four sealed cards.',
    description: 'Main Character Energy, Loading…, Do Not Disturb and Tiny Steps Count, each with its own sealed message card from a different series. A good gift — or open one a week.',
    price: 99, category: 'stickers', productType: 'secret', collections: ['motivation'],
    tags: ['secret message', 'pack', 'gift', 'card', 'bundle'], featured: true, isNew: true, displayOrder: 66, status: 'demo',
    messageCardId: 'mc-mixed', messageCardCount: 4,
    art: { kind: 'secret-pack', backdrop: '#E9E3D6', designs: [d.mainCharacter, d.loading, d.doNotDisturb, d.tinySteps], envelope: kraft },
  },

  // ===== Mini sticker sheets =====
  {
    id: 'sht-001', slug: 'campus-survival-sheet', name: 'Campus Survival Sheet', images: [{ src: '/category-art/stickers-cluster.jpg', alt: 'Campus Survival Sheet' }],
    shortDescription: 'Eight small stickers for the full college experience.',
    description: 'Everything a semester feels like, on one sheet: attendance maths, deadline panic, last-bench pride and the chai that holds it together. Peel them one at a time or keep the sheet whole.',
    price: 99, category: 'stickers', productType: 'sheet', collections: [],
    tags: ['sheet', 'college', 'funny', 'bundle'], featured: true, isNew: true, displayOrder: 12, status: 'demo',
    art: { kind: 'sheet', backdrop: '#FFE9A8', designs: [d.seventyFive, d.deadline, d.books, d.chaiFirst, d.backbencher, d.oneMoreEp, d.samosa, d.sparkle] },
  },
  {
    id: 'sht-002', slug: 'dev-mode-sheet', name: 'Dev Mode Sheet', images: [{ src: '/category-art/stickers-cluster.jpg', alt: 'Dev Mode Sheet' }],
    shortDescription: 'Bugs, brackets and excuses — eight to a sheet.',
    description: 'A sheet of tech stickers for the laptop that compiles your projects and your excuses. Mix of icons and one-liners.',
    price: 99, category: 'stickers', productType: 'sheet', collections: [],
    tags: ['sheet', 'coding', 'developer'], featured: true, isNew: false, displayOrder: 13, status: 'demo',
    art: { kind: 'sheet', backdrop: '#D6F0FF', designs: [d.worksOnMyMachine, d.bug, d.code, d.jugaad, d.deadline, d.pixelHeart, d.oneMoreEp, d.sparkle] },
  },
  {
    id: 'sht-003', slug: 'soft-days-sheet', name: 'Soft Days Sheet', images: [{ src: '/category-art/stickers-cluster.jpg', alt: 'Soft Days Sheet' }],
    shortDescription: 'Nine pastel minis for journals and phone cases.',
    description: 'A gentle sheet of clouds, cats and small smiles. Made for journaling, gifting, and decorating without shouting.',
    price: 89, category: 'stickers', productType: 'sheet', collections: ['cute'],
    tags: ['sheet', 'cute', 'pastel', 'journal'], featured: false, isNew: true, displayOrder: 14, status: 'demo',
    art: { kind: 'sheet', backdrop: '#FFE0EC', designs: [d.sleepyCloud, d.cat, d.smiley, d.softDays, d.pixelHeart, d.sparkle, d.headphones, d.lifeUp, d.cassette] },
  },

  // ===== Curated packs =====
  {
    id: 'pck-001', slug: 'desi-starter-pack', name: 'Desi Starter Pack', images: [{ src: '/category-art/stickers-cluster.jpg', alt: 'Desi Starter Pack' }],
    shortDescription: 'Six separate stickers with maximum desi energy.',
    description: 'A curated pack of six individual stickers: chai, samosa, jugaad and a few phrases you’ve definitely heard at home. A good first pack or an easy gift for a roommate.',
    price: 129, category: 'stickers', productType: 'pack', collections: [],
    tags: ['pack', 'desi', 'gift', 'bundle'], featured: true, isNew: false, displayOrder: 15, status: 'demo',
    art: { kind: 'pack', backdrop: '#FFD9CC', card: kraft, designs: [d.chaiFirst, d.samosa, d.jugaad, d.ekNumber, d.adjust, d.deadline] },
  },
  {
    id: 'pck-002', slug: 'garage-pack', name: 'Garage Pack', images: [{ src: '/category-art/stickers-cluster.jpg', alt: 'Garage Pack' }],
    shortDescription: 'Six original car and bike stickers.',
    description: 'A pack for the automotive crowd: an original coupe, a helmet, chequered flags and pit-lane type. Everything drawn from scratch, nothing borrowed from real brands.',
    price: 139, category: 'stickers', productType: 'pack', collections: ['quotes'],
    tags: ['pack', 'cars', 'bikes', 'motorsport', 'bundle'], featured: true, isNew: true, displayOrder: 16, status: 'demo',
    art: { kind: 'pack', backdrop: '#EEFFC2', card: '#2A2A2A', designs: [d.redline, d.helmet, d.apex, d.flagTwo, d.pitLane, d.doItScared] },
  },
  {
    id: 'pck-003', slug: 'press-start-pack', name: 'Press Start Pack', images: [{ src: '/category-art/stickers-cluster.jpg', alt: 'Press Start Pack' }],
    shortDescription: 'Five original gaming-inspired stickers.',
    description: 'Pixel hearts, a pocket controller and a couple of arcade-style lines. All original artwork — no characters or game logos.',
    price: 119, category: 'stickers', productType: 'pack', collections: ['gaming'],
    tags: ['pack', 'gaming', 'pixel', 'bundle'], featured: false, isNew: false, displayOrder: 17, status: 'demo',
    art: { kind: 'pack', backdrop: '#E2DAFF', card: grape, designs: [d.controller, d.pixelHeart, d.pressStart, d.lifeUp, d.oneMoreEp] },
  },
  {
    id: 'mys-001', slug: 'mystery-pack', name: 'Mystery Sticker Pack', images: [{ src: '/category-art/stickers-cluster.jpg', alt: 'Mystery Sticker Pack' }],
    shortDescription: 'Five guaranteed stickers from your theme, plus one mystery sticker.',
    description: 'Pick a series theme and get a sealed pack of six stickers: five different designs from that theme, plus one extra mystery sticker chosen by us. You always know what the five are drawn from — only the sixth is a surprise.',
    price: 129, category: 'stickers', productType: 'mystery', collections: ['cute'],
    tags: ['mystery', 'surprise', 'bundle', 'gift', 'collectible'], featured: true, isNew: true, displayOrder: 18, status: 'demo',
    variantLabel: 'Theme',
    // One option per series. Same provisional price for every theme.
    variants: series.map((s) => ({ id: s.id.toLowerCase(), label: s.name, detail: `Series ${s.id}`, price: 129 })),
    packQuantity: 6,
    mystery: {
      guaranteedCount: 5,
      mysteryCount: 1,
      guaranteedRule: 'Five different designs from the theme you choose, picked from the list shown on this page. No duplicates within the five.',
      mysteryRule: 'One extra sticker chosen by us from any series. It’s a surprise — not a guaranteed rare, and it could be a design you already own.',
      packaging: 'A sealed kraft envelope printed with the series code and a pack number.',
      // Holographic stock doesn't exist yet, so it is NOT part of the pack and no chance is advertised.
      specialVariants: [{ id: 'holo-sparkle', name: 'Holographic special design', inventoryConfirmed: false }],
      odds: null,
    },
    art: { kind: 'mystery', backdrop: '#E9E3D6', card: kraft, peek: [d.chaiFirst, d.worksOnMyMachine, d.sleepyCloud] },
  },

  // ----- Poster sets (fixed A4 size) -----
  {
    id: 'pst-002', slug: 'room-reset-poster-set', name: 'Room Reset Set', images: [{ src: '/category-art/posters-cluster.jpg', alt: 'Room Reset Set' }],
    shortDescription: 'Three matching A4 prints for a quick room refresh.',
    description: 'Three coordinated prints in matching colours, designed to hang together above a desk or bed. Sold as a set of A4 posters.',
    price: 229, category: 'posters', productType: 'poster-set', collections: ['minimal', 'motivation'],
    tags: ['poster set', 'wall art', 'bundle', 'A4'], featured: true, isNew: false, displayOrder: 120, status: 'demo',
    wallLayoutId: 'pack-trio-a4',
    art: {
      kind: 'poster-set', backdrop: '#FFE9A8',
      posters: [
        { title: 'SLOW\nMORNINGS', bg: tomato, fg: paper, accent: sun, motif: 'chai', pattern: 'sun' },
        { title: 'STAY\nCURIOUS', bg: sky, fg: ink, accent: paper, motif: 'sparkle', pattern: 'dots' },
        { title: 'KEEP\nGOING', bg: lime, fg: ink, accent: tomato, motif: 'bolt', pattern: 'stripes' },
      ],
    },
  },
  {
    id: 'pst-013', slug: 'desk-wall-pack', name: 'Desk Wall Pack', images: [{ src: '/category-art/posters-cluster.jpg', alt: 'Desk Wall Pack' }],
    shortDescription: 'Five A4 posters for the wall above your desk.',
    description: 'A ready-made wall setup: five A4 prints across tech, music and motivation that look good side by side. The easiest way to fill an empty wall.',
    price: 329, category: 'posters', productType: 'poster-set', collections: ['music', 'motivation'],
    tags: ['wall pack', 'poster set', 'bundle', 'A4'], featured: true, isNew: true, displayOrder: 121, status: 'demo',
    wallLayoutId: 'pack-five-a4',
    art: {
      kind: 'poster-set', backdrop: '#D6F0FF',
      posters: [
        { title: 'SHIP\nIT', bg: sky, fg: ink, accent: tomato, motif: 'code', pattern: 'grid' },
        { title: 'SIDE\nA', bg: mint, fg: ink, accent: sun, motif: 'cassette', pattern: 'sun' },
        { title: 'DO IT\nSCARED', bg: ink, fg: sun, accent: sun, motif: 'bolt', pattern: 'stripes' },
        { title: 'PRESS\nSTART', bg: grape, fg: paper, accent: lime, motif: 'controller', pattern: 'dots' },
        { title: 'TINY\nSPARKS', bg: paper, fg: ink, accent: tomato, motif: 'sparkle', pattern: 'grid' },
      ],
    },
  },

  // ----- Coming later -----
  {
    id: 'pst-003', slug: 'photo-collage', name: 'Your Photos, Collaged', images: [{ src: '/category-art/custom.webp', alt: 'Your Photos, Collaged' }],
    shortDescription: 'A personalised collage from your own photos.',
    description: 'A future custom product: a single printed collage made from your photos. It can’t be ordered yet — to try the idea now, use Build your own wall, which lets you place your photos on separate posters.',
    price: 199, category: 'posters', productType: 'collage', collections: ['cute'],
    tags: ['personalised', 'photo', 'gift'], featured: false, isNew: false, displayOrder: 130, status: 'coming-soon',
    art: { kind: 'collage', backdrop: '#D3F6E6' },
  },

  ...realStickerProducts,
  ...realPosterProducts,
];
