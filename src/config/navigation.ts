/**
 * MAIN MENU & EXPANDING NAVIGATION
 * Interactive expanding navigation items with rich metadata and sub-destinations.
 */
import { collections } from '../data/collections';
import { allSizes, shopUrl } from '../utils/catalogue';
import type { Category } from '../types/product';

export interface MenuLink {
  label: string;
  to: string;
  note?: string;
}

export interface MegaMenu {
  id: Category;
  label: string;
  allLink: MenuLink;
  formats: MenuLink[];
  pills?: { title: string; links: MenuLink[] };
  promoSlug: string;
  promoLabel: string;
}

export interface ExpandingNavItem {
  id: string;
  label: string;
  to: string;
  subtitle: string;
  badge?: string;
  image: string;
  iconType: 'home' | 'shop' | 'video' | 'vibes' | 'about' | 'contact';
  sublinks?: MenuLink[];
}

export const expandingNavItems: ExpandingNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    to: '/',
    subtitle: 'Drops & Essentials',
    badge: 'Drop 01',
    image: '/category-art/stickers.webp',
    iconType: 'home',
  },
  {
    id: 'shop',
    label: 'Shop',
    to: '/shop',
    subtitle: '760+ Stickers & Art',
    badge: '760+ Items',
    image: '/category-art/stickers-cluster.jpg',
    iconType: 'shop',
    sublinks: [
      { label: 'All Stickers', to: shopUrl({ category: 'stickers' }), note: '600 contour die-cuts' },
      { label: 'All Posters', to: shopUrl({ category: 'posters' }), note: 'A5, A4, A3 wall prints' },
      { label: 'Build Your Pack', to: '/build-your-pack', note: 'Pick 5 or 10 + surprise' },
      { label: 'Build Your Wall', to: '/build-your-wall', note: 'Custom gallery walls' },
      { label: 'Create Custom Stickers', to: '/create-your-stickers', note: 'From 1 piece · custom cut' },
      { label: 'Collectibles & Mystery', to: '/collectibles', note: 'Duos, mystery & passport' },
    ],
  },
  {
    id: 'video',
    label: 'Shop by Video',
    to: '/shop-by-video',
    subtitle: 'Reels & Real Looks',
    badge: 'Live',
    image: '/category-art/posters-cluster.jpg',
    iconType: 'video',
    sublinks: [
      { label: 'Interactive Video Feed', to: '/shop-by-video', note: 'Watch & tap to buy' },
      { label: 'MacBook Sticker Bombing', to: '/shop-by-video', note: '20-sticker laptop setup' },
      { label: 'Hostel Room Wall Tour', to: '/shop-by-video', note: 'Anime gallery makeover' },
      { label: 'Hydro Flask Water Test', to: '/shop-by-video', note: 'Waterproof scratch demo' },
    ],
  },
  {
    id: 'vibes',
    label: 'Vibes',
    to: '/vibes',
    subtitle: 'Anime, Cinema & Tech',
    badge: 'Trending',
    image: '/products/posters/pst-anime-001.webp',
    iconType: 'vibes',
    sublinks: [
      { label: 'Anime & Manga', to: shopUrl({ collections: ['anime'] }), note: 'Expressive characters & shinobi' },
      { label: 'Cinema & Movies', to: shopUrl({ collections: ['movies'] }), note: 'Cinematic vibes & cult classics' },
      { label: 'Cars & Bikes', to: shopUrl({ collections: ['quotes'] }), note: 'Track-day & motorsport decals' },
      { label: 'Gaming-Inspired', to: shopUrl({ collections: ['gaming'] }), note: 'Pixel art & controller icons' },
      { label: 'Marvel & Superheroes', to: shopUrl({ collections: ['marvel'] }), note: 'Original hero emblems' },
      { label: 'Cute & Aesthetic', to: shopUrl({ collections: ['cute'] }), note: 'Pastel doodles & cozy pets' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    to: '/about',
    subtitle: 'Made in Hyderabad',
    badge: 'Our Story',
    image: '/category-art/custom.webp',
    iconType: 'about',
    sublinks: [
      { label: 'Our Story & Studio', to: '/about', note: 'Student-run brand from Hyderabad' },
      { label: 'Collector Passport', to: '/collector-passport', note: 'Collect stamps & unlock gifts' },
      { label: 'Vote for Next Drop', to: '/vote-next-drop', note: 'Decide our next artwork' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    to: '/contact',
    subtitle: 'WhatsApp & Help',
    badge: 'Online',
    image: '/category-art/gifts.webp',
    iconType: 'contact',
    sublinks: [
      { label: 'Direct WhatsApp Chat', to: '/contact', note: 'Instant responses from founders' },
      { label: 'Frequently Asked Questions', to: '/faq', note: 'Shipping, sizing & prints' },
      { label: 'Shipping & Delivery Policy', to: '/policies/shipping', note: 'Fast pan-India dispatch' },
    ],
  },
];

export const megaMenus: MegaMenu[] = [
  {
    id: 'stickers',
    label: 'Stickers',
    allLink: { label: 'All stickers', to: shopUrl({ category: 'stickers' }) },
    formats: [
      { label: 'Mini stickers', to: shopUrl({ types: ['single'] }), note: 'One design each' },
      { label: 'Sticker sheets', to: shopUrl({ types: ['sheet'] }), note: 'Many minis on one sheet' },
      { label: 'Sticker packs', to: shopUrl({ types: ['pack'] }), note: 'Themed bundles' },
      { label: 'Mystery pack', to: '/product/mystery-pack', note: '5 guaranteed + 1 mystery' },
      { label: 'Build your own pack', to: '/build-your-pack', note: 'Pick 5 or 10, get +1 surprise' },
      { label: 'Matching duos', to: '/matching-duos', note: 'Two stickers that go together' },
      { label: 'Secret messages', to: '/secret-messages', note: 'Sticker + sealed message card' },
      { label: 'Create your own stickers', to: '/create-your-stickers', note: 'Your image, made into a sticker' },
    ],
    promoSlug: 'mystery-pack',
    promoLabel: 'New · 5 guaranteed + 1 mystery',
  },
  {
    id: 'posters',
    label: 'Posters',
    allLink: { label: 'All posters', to: shopUrl({ category: 'posters' }) },
    formats: [
      { label: 'Single posters', to: shopUrl({ category: 'posters', types: ['poster'] }), note: 'Pick your size' },
      { label: 'Wall packs & sets', to: shopUrl({ category: 'posters', types: ['poster-set'] }), note: 'Matching prints, one price' },
      { label: 'Build your own wall', to: '/build-your-wall', note: 'Our designs + your photos' },
      { label: 'Photo collage', to: shopUrl({ types: ['collage'] }), note: 'Coming later' },
    ],
    pills: {
      title: 'Shop by size',
      links: allSizes().map((s) => ({ label: s, to: shopUrl({ category: 'posters', sizes: [s] }) })),
    },
    promoSlug: 'desk-wall-pack',
    promoLabel: 'Fill a wall',
  },
];

export function vibeLinks(category: Category): MenuLink[] {
  return collections.map((c) => ({ label: c.name, to: shopUrl({ category, collections: [c.id] }) }));
}

export const plainLinks: MenuLink[] = [
  { label: 'Shop by Video', to: '/shop-by-video' },
  { label: 'Collectibles', to: '/collectibles' },
  { label: 'Create your own', to: '/create-your-stickers' },
  { label: 'Vibes', to: '/vibes' },
  { label: 'About', to: '/about' },
];
