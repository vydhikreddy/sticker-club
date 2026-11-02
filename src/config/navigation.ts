/**
 * MAIN MENU & EXPANDING NAVIGATION
 * Original navigation structure (Stickers, Posters, Collectibles, Create your own, Vibes, About)
 * enhanced with rich visual metadata and expanding-card animations.
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
  /** Link for the menu's own "shop all" entry. */
  allLink: MenuLink;
  formats: MenuLink[];
  /** Small pill links, e.g. sizes. */
  pills?: { title: string; links: MenuLink[] };
  /** Product slug shown as a picture card in the menu. */
  promoSlug: string;
  promoLabel: string;
}

export interface NavItemConfig {
  id: string;
  label: string;
  to: string;
  subtitle: string;
  badge?: string;
  image: string;
  iconType: 'stickers' | 'posters' | 'collectibles' | 'create' | 'vibes' | 'about';
  isMegaMenu?: boolean;
}

export const originalNavItems: NavItemConfig[] = [
  {
    id: 'stickers',
    label: 'Stickers',
    to: shopUrl({ category: 'stickers' }),
    subtitle: '600+ Contour Die-Cuts',
    badge: '600 Designs',
    image: '/category-art/stickers-cluster.jpg',
    iconType: 'stickers',
    isMegaMenu: true,
  },
  {
    id: 'posters',
    label: 'Posters',
    to: shopUrl({ category: 'posters' }),
    subtitle: 'A5 · A4 · A3 Wall Art',
    badge: '166 Prints',
    image: '/category-art/posters-cluster.jpg',
    iconType: 'posters',
    isMegaMenu: true,
  },
  {
    id: 'collectibles',
    label: 'Collectibles',
    to: '/collectibles',
    subtitle: 'Mystery & Duos',
    badge: 'Series 01',
    image: '/category-art/stickers.webp',
    iconType: 'collectibles',
  },
  {
    id: 'create',
    label: 'Create',
    to: '/create-your-stickers',
    subtitle: 'Your Own Design',
    badge: 'From 1 pc',
    image: '/category-art/custom.webp',
    iconType: 'create',
  },
  {
    id: 'vibes',
    label: 'Vibes',
    to: '/vibes',
    subtitle: 'Anime, Cinema & Gaming',
    badge: 'Trending',
    image: '/products/posters/pst-anime-001.webp',
    iconType: 'vibes',
  },
  {
    id: 'about',
    label: 'About',
    to: '/about',
    subtitle: 'Our Studio Story',
    badge: 'Our Story',
    image: '/category-art/gifts.webp',
    iconType: 'about',
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
    promoSlug: 'stk-anime-001-shadow-shinobi-die-cut',
    promoLabel: 'Featured 600 Die-Cuts',
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
    promoSlug: 'pst-anime-001-shinobi-legends',
    promoLabel: 'Featured 166 Wall Prints',
  },
];

export function vibeLinks(category: Category): MenuLink[] {
  return collections.map((c) => ({ label: c.name, to: shopUrl({ category, collections: [c.id] }) }));
}

export const plainLinks: MenuLink[] = [
  { label: 'Collectibles', to: '/collectibles' },
  { label: 'Create your own', to: '/create-your-stickers' },
  { label: 'Vibes', to: '/vibes' },
  { label: 'About', to: '/about' },
];
