import { useState } from 'react';
import { LuCheck, LuEye, LuPlay, LuPlus, LuShoppingBag, LuSparkles, LuX } from 'react-icons/lu';
import { Link } from '../router/router';
import { useCart } from '../context/CartContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { products } from '../data/products';
import { formatPrice } from '../utils/format';
import { ProductImage } from '../components/art/ProductArt';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

interface VideoReel {
  id: string;
  title: string;
  creator: string;
  handle: string;
  duration: string;
  views: string;
  tag: string;
  description: string;
  coverImage: string;
  badge: string;
  productIds: string[];
}

const reels: VideoReel[] = [
  {
    id: 'macbook-bomb',
    title: 'MacBook Pro Sticker Bombing: 20 Contour Cuts',
    creator: 'Rohan Sharma',
    handle: '@rohan.dev',
    duration: '0:42',
    views: '48.2K',
    tag: 'Tech & Laptop Look',
    description: 'Transforming an M3 MacBook Pro with high-pigment, residue-free vinyl stickers that survive daily backpack friction.',
    coverImage: '/category-art/stickers-cluster.jpg',
    badge: 'Trending Reel',
    productIds: ['stk-real-001', 'stk-real-002', 'stk-001', 'stk-002', 'stk-003'],
  },
  {
    id: 'hostel-room-wall',
    title: 'Dorm & Hostel Wall Setup: 300 GSM Anime Gallery',
    creator: 'Ananya Varma',
    handle: '@ananya_aesthetic',
    duration: '0:58',
    views: '62.4K',
    tag: 'Hostel Room Decor',
    description: 'Mounting matte A3 and A4 archival posters without wall damage using washi tape and corner tabs. Total cinematic room glow-up.',
    coverImage: '/category-art/posters-cluster.jpg',
    badge: 'Staff Pick',
    productIds: ['pst-real-001', 'pst-real-002', 'pst-real-003', 'pst-001'],
  },
  {
    id: 'water-bottle-test',
    title: 'Hydro Flask 7-Day Dishwasher & Water Scratch Test',
    creator: 'Karthik Rao',
    handle: '@karthik.cycles',
    duration: '0:35',
    views: '31.9K',
    tag: 'Durability Proof',
    description: 'Testing waterproof lamination against scalding water, iced condensation, and daily campus drops. Zero peeling or color bleed.',
    coverImage: '/hero-stickers/WhatsApp%20Image%202026-10-29%20at%205.20.03%20PM.jpeg',
    badge: 'Waterproof Test',
    productIds: ['stk-real-003', 'stk-real-004', 'stk-005', 'stk-007'],
  },
  {
    id: 'mystery-unboxing',
    title: 'Cracking the 5+1 Mystery Pack Foil Seal',
    creator: 'Sneha Patel',
    handle: '@sneha_journal',
    duration: '0:48',
    views: '89.1K',
    tag: 'Unboxing Mystery',
    description: 'Unboxing the silver foil mystery envelope: 5 guaranteed anime & retro stickers plus one ultra-rare holographic bonus card.',
    coverImage: '/category-art/stickers.webp',
    badge: 'Unboxing',
    productIds: ['mys-001', 'stk-real-005', 'stk-real-006'],
  },
  {
    id: 'biker-helmets',
    title: 'Superbike & GT Helmet Custom Vinyl Wraps',
    creator: 'Vikram Reddy',
    handle: '@vikram_moto',
    duration: '0:50',
    views: '54.7K',
    tag: 'Moto & Helmets',
    description: 'Applying UV-resistant outdoor vinyl decals to an AGV helmet and fuel tank. Sun-proof inks tested under Hyderabad summer heat.',
    coverImage: '/products/posters/pst-bikes-001.webp',
    badge: 'Motorsport',
    productIds: ['pst-real-010', 'stk-real-007', 'stk-real-008'],
  },
  {
    id: 'chai-telugu-cinema',
    title: 'Street Style Hyderabad: Irani Chai & TFI Retro',
    creator: 'Deekshith & Vydhik',
    handle: '@stickerclub.hyd',
    duration: '1:02',
    views: '112.5K',
    tag: 'Hyderabad Vibe',
    description: 'Celebrating old-school Tollywood cinema dialogues and Niloufer Irani chai culture with die-cut matte laptop stickers.',
    coverImage: '/category-art/custom.webp',
    badge: 'Local Drop',
    productIds: ['stk-001', 'pst-real-020', 'stk-real-009'],
  },
];

export function ShopByVideoPage() {
  usePageMeta(
    'Shop by Video — Real Looks & Unboxings',
    'Watch real laptop sticker bombs, hostel room poster galleries, and durability stress tests. Tap any video to shop the exact items.',
  );

  const { addItem, openCart } = useCart();
  const [activeReel, setActiveReel] = useState<VideoReel | null>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAdd = (productId: string) => {
    addItem(productId, 1);
    setAddedIds((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [productId]: false }));
    }, 1500);
  };

  const handleAddAll = (reel: VideoReel) => {
    reel.productIds.forEach((id) => addItem(id, 1));
    openCart();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop by Video' }]} />

      {/* Header section */}
      <div className="relative mt-4 overflow-hidden rounded-[28px] border border-mint/20 bg-paper-deep p-6 sm:p-10 shadow-2xl">
        <div aria-hidden className="cinema-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-cinema-red/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 size-96 rounded-full bg-mint/15 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3.5 py-1 text-xs font-bold tracking-widest text-mint uppercase">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cinema-red opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-cinema-red" />
            </span>
            Interactive Video Commerce
          </div>

          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
            See them in action. <br className="hidden sm:inline" />
            <span className="text-mint">Shop the exact look.</span>
          </h1>

          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            Real campus setups, laptop sticker bombing sessions, water stress tests, and unboxings from our community. Tap any video to inspect and add individual designs straight to your cart.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/shop" className="btn-primary">
              <LuShoppingBag aria-hidden /> Browse All 760+ Products
            </Link>
            <Link to="/create-your-stickers" className="btn-ghost">
              <LuSparkles aria-hidden /> Custom Stickers
            </Link>
          </div>
        </div>
      </div>

      {/* Video Reel Cards Grid */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="eyebrow">COMMUNITY REELS</p>
            <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Featured Video Looks</h2>
          </div>
          <span className="text-sm font-bold text-mint">{reels.length} Interactive Reels</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reels.map((reel) => {
            const featuredItems = reel.productIds
              .map((id) => products.find((p) => p.id === id))
              .filter((p): p is (typeof products)[number] => Boolean(p));

            return (
              <article
                key={reel.id}
                className="group relative flex flex-col overflow-hidden rounded-[26px] border border-mint/20 bg-paper-deep shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5 hover:border-mint/50 hover:shadow-[0_24px_48px_-10px_rgba(0,0,0,0.8),0_0_24px_rgba(168,240,220,0.15)]"
              >
                {/* Video Preview Thumbnail */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer"
                  onClick={() => setActiveReel(reel)}
                >
                  <img
                    src={reel.coverImage}
                    alt={reel.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Play Trigger Overlay */}
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid size-14 place-items-center rounded-full border-2 border-mint bg-paper/85 text-mint shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:bg-cinema-red group-hover:border-cinema-red group-hover:text-ink">
                      <LuPlay className="size-6 translate-x-0.5 fill-current" />
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-cinema-red px-2.5 py-0.5 text-[11px] font-bold text-ink uppercase tracking-wider shadow">
                      {reel.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-ink-soft">
                    <span className="rounded-md bg-paper-deep/80 px-2 py-0.5 backdrop-blur">
                      {reel.duration}
                    </span>
                    <span className="flex items-center gap-1 rounded-md bg-paper-deep/80 px-2 py-0.5 backdrop-blur">
                      <LuEye className="size-3.5" /> {reel.views}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-mint uppercase tracking-wide">{reel.tag}</span>
                    <span className="text-ink-soft">{reel.handle}</span>
                  </div>

                  <h3
                    className="mt-1.5 font-display text-lg font-bold leading-snug text-ink group-hover:text-mint transition-colors cursor-pointer"
                    onClick={() => setActiveReel(reel)}
                  >
                    {reel.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-ink-soft line-clamp-2">
                    {reel.description}
                  </p>

                  {/* Embedded Products Strip */}
                  <div className="mt-4 pt-3 border-t border-mint/15">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-2">
                      Products in this video ({featuredItems.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuredItems.slice(0, 3).map((item) => {
                        const added = addedIds[item.id];
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 rounded-xl border border-mint/20 bg-white/5 p-1.5 pr-2.5 text-xs text-ink"
                          >
                            <span className="size-8 shrink-0 overflow-hidden rounded-lg bg-paper border border-mint/15">
                              <ProductImage product={item} className="size-full object-contain" />
                            </span>
                            <div className="min-w-0">
                              <p className="font-bold truncate max-w-[110px]">{item.name}</p>
                              <p className="text-[10px] text-mint font-mono">{formatPrice(item.price)}</p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAdd(item.id);
                              }}
                              className={`ml-1 grid size-6 shrink-0 place-items-center rounded-full transition-colors ${
                                added ? 'bg-mint text-on-light' : 'bg-lime text-ink hover:bg-mint hover:text-on-light'
                              }`}
                              aria-label={`Add ${item.name} to cart`}
                            >
                              {added ? <LuCheck className="size-3.5" /> : <LuPlus className="size-3.5" />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveReel(reel)}
                      className="text-xs font-bold text-mint hover:underline flex items-center gap-1"
                    >
                      <LuPlay className="size-3" /> Watch Reel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddAll(reel)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3.5 py-1.5 text-xs font-bold text-on-light hover:bg-ink hover:text-paper transition-colors"
                    >
                      <LuShoppingBag className="size-3.5" /> Shop Look
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal Reel Player */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fade-in absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveReel(null)}
            aria-hidden
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeReel.title}
            className="relative z-10 flex w-full max-w-4xl flex-col md:flex-row overflow-hidden rounded-[28px] border border-mint/30 bg-paper shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActiveReel(null)}
              aria-label="Close video"
              className="absolute top-4 right-4 z-20 grid size-10 place-items-center rounded-full bg-paper-deep/80 text-ink hover:bg-paper hover:text-cinema-red transition-colors"
            >
              <LuX className="size-5" />
            </button>

            {/* Video Playback Simulator */}
            <div className="relative aspect-[9/16] max-h-[75vh] w-full md:w-[380px] shrink-0 bg-black overflow-hidden flex items-center justify-center">
              <img
                src={activeReel.coverImage}
                alt={activeReel.title}
                className="size-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

              <div className="absolute inset-0 grid place-items-center">
                <span className="grid size-16 place-items-center rounded-full bg-cinema-red/90 text-ink shadow-2xl animate-pulse">
                  <LuPlay className="size-8 translate-x-0.5 fill-current" />
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-ink">
                <span className="rounded-full bg-cinema-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Playing Look #{activeReel.id}
                </span>
                <p className="mt-1 font-bold text-sm drop-shadow">{activeReel.title}</p>
                <p className="text-xs text-mint drop-shadow">{activeReel.handle}</p>
              </div>
            </div>

            {/* Attached Shoppable Products Panel */}
            <div className="flex flex-1 flex-col p-6 sm:p-8 overflow-y-auto max-h-[75vh]">
              <span className="eyebrow">{activeReel.tag}</span>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-ink">{activeReel.title}</h2>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{activeReel.description}</p>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-ink">Featured in this Look</h3>
                  <button
                    type="button"
                    onClick={() => handleAddAll(activeReel)}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    <LuShoppingBag /> Add All to Cart
                  </button>
                </div>

                <div className="space-y-3">
                  {activeReel.productIds.map((id) => {
                    const item = products.find((p) => p.id === id);
                    if (!item) return null;
                    const added = addedIds[item.id];
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-mint/20 bg-paper-deep p-3.5 transition-colors hover:border-mint/50"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="size-12 shrink-0 overflow-hidden rounded-xl bg-paper border border-mint/15">
                            <ProductImage product={item} className="size-full object-contain" />
                          </span>
                          <div className="min-w-0">
                            <Link
                              to={`/product/${item.slug}`}
                              className="font-bold text-sm text-ink hover:text-mint transition-colors truncate block"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-mint font-mono font-bold">{formatPrice(item.price)}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAdd(item.id)}
                          className={`btn ${
                            added
                              ? 'bg-mint text-on-light border border-mint'
                              : 'bg-lime text-ink hover:bg-mint hover:text-on-light'
                          } text-xs py-2 px-3.5 shrink-0`}
                        >
                          {added ? (
                            <>
                              <LuCheck className="size-3.5" /> Added
                            </>
                          ) : (
                            <>
                              <LuPlus className="size-3.5" /> Add
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
