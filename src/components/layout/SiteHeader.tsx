import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  LuChevronDown,
  LuCompass,
  LuHeartHandshake,
  LuImage,
  LuImagePlus,
  LuMenu,
  LuPackage,
  LuSearch,
  LuShoppingBag,
  LuSparkles,
  LuX,
} from 'react-icons/lu';
import { brand } from '../../config/brand';
import {
  megaMenus,
  originalNavItems,
  vibeLinks,
  type MegaMenu,
  type NavItemConfig,
} from '../../config/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from '../../router/router';
import { getProductBySlug, shopUrl } from '../../utils/catalogue';
import { formatPrice } from '../../utils/format';
import { ProductImage } from '../art/ProductArt';

function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-2.5 shrink-0" aria-label={`${brand.displayName} home`}>
      <div className="relative size-9 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
        <svg viewBox="0 0 64 64" className="size-full -rotate-6" aria-hidden>
          <circle cx="32" cy="32" r="30" fill="#fff" stroke="#121212" strokeWidth="2" />
          <circle cx="32" cy="32" r="24" fill="#D4FF3A" />
          <path d="M40 16 L26 34 h9 l-5 14 l16 -19 h-9 z" fill="#121212" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-display text-lg font-extrabold leading-none tracking-tight text-ink sm:text-xl">
          {brand.name}
        </span>
        <span className="text-[10px] font-mono tracking-widest text-mint uppercase leading-tight">
          STUDIO · HYD
        </span>
      </div>
    </Link>
  );
}

function NavIcon({ type, className = 'size-3.5' }: { type: NavItemConfig['iconType']; className?: string }) {
  switch (type) {
    case 'stickers':
      return <LuSparkles className={className} />;
    case 'posters':
      return <LuImage className={className} />;
    case 'collectibles':
      return <LuPackage className={className} />;
    case 'create':
      return <LuImagePlus className={className} />;
    case 'vibes':
      return <LuCompass className={className} />;
    case 'about':
      return <LuHeartHandshake className={className} />;
    default:
      return <LuSparkles className={className} />;
  }
}

function SearchForm({ onDone, autoFocus }: { onDone?: () => void; autoFocus?: boolean }) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(shopUrl({ query: q.trim() }));
      onDone?.();
    }
  };
  return (
    <form role="search" onSubmit={submit} className="relative w-full">
      <label htmlFor="site-search" className="sr-only">
        Search stickers and posters
      </label>
      <LuSearch aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft" />
      <input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Search chai, coding, cars, A3 posters…"
        className="w-full rounded-full border border-mint/20 bg-paper px-4 py-2.5 pl-11 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-mint focus:ring-1 focus:ring-mint"
      />
    </form>
  );
}

/** Original mega dropdown panel for Stickers or Posters on desktop */
function MegaPanel({ menu }: { menu: MegaMenu }) {
  const promo = getProductBySlug(menu.promoSlug);
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-7 lg:grid-cols-[1fr_1.4fr_260px]">
      <div>
        <p className="eyebrow mb-3">Formats</p>
        <ul className="space-y-1">
          <li>
            <Link
              to={menu.allLink.to}
              className="block rounded-xl px-3 py-2 font-display text-xl font-extrabold hover:bg-lime text-ink transition-colors"
            >
              {menu.allLink.label} →
            </Link>
          </li>
          {menu.formats.map((f) => (
            <li key={f.label}>
              <Link to={f.to} className="block rounded-xl px-3 py-2 hover:bg-paper text-ink transition-colors">
                <span className="font-bold text-sm">{f.label}</span>
                {f.note && <span className="block text-xs text-ink-soft">{f.note}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {menu.pills && (
          <div className="mb-6">
            <p className="eyebrow mb-3">{menu.pills.title}</p>
            <div className="flex flex-wrap gap-2">
              {menu.pills.links.map((l) => (
                <Link key={l.label} to={l.to} className="chip px-4">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
        <p className="eyebrow mb-3">Shop {menu.label.toLowerCase()} by vibe</p>
        <div className="flex flex-wrap gap-2">
          {vibeLinks(menu.id).map((l) => (
            <Link key={l.label} to={l.to} className="chip">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {promo && (
        <Link
          to={`/product/${promo.slug}`}
          className="group block overflow-hidden rounded-[var(--radius-card)] border border-mint/20 bg-paper shadow-lg hover:border-mint/50 transition-all"
        >
          <ProductImage product={promo} className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.03]" />
          <div className="p-3">
            <p className="text-[10px] font-mono font-bold tracking-wide text-mint uppercase">{menu.promoLabel}</p>
            <p className="font-bold text-sm text-ink mt-0.5">
              {promo.name} · {formatPrice(promo.price)}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}

export function SiteHeader() {
  const { itemCount, openCart } = useCart();
  const { user } = useAuth();
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const navigate = useNavigate();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const hoverTimer = useRef<number | undefined>(undefined);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close everything on page change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setOpenMega(null);
    setHoveredId(null);
  }, [pathname, search]);

  // Handle escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
        setSearchOpen(false);
        setOpenMega(null);
        setHoveredId(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isItemActive = (item: NavItemConfig): boolean => {
    if (item.id === 'stickers') return pathname === '/shop' && params.get('category') === 'stickers';
    if (item.id === 'posters') return pathname === '/shop' && params.get('category') === 'posters';
    if (item.id === 'collectibles') return pathname === '/collectibles' || pathname.startsWith('/matching-duos') || pathname.startsWith('/secret-messages');
    if (item.id === 'create') return pathname === '/create-your-stickers' || pathname === '/build-your-wall' || pathname === '/build-your-pack';
    if (item.id === 'vibes') return pathname === '/vibes' || (pathname === '/shop' && Boolean(params.get('collections')));
    if (item.id === 'about') return pathname === '/about' || pathname === '/collector-passport' || pathname === '/vote-next-drop';
    return pathname === item.to;
  };

  const handleMouseEnter = (id: string) => {
    window.clearTimeout(hoverTimer.current);
    setHoveredId(id);
    const item = originalNavItems.find((n) => n.id === id);
    if (item?.isMegaMenu) {
      setOpenMega(id);
    } else {
      setOpenMega(null);
    }
  };

  const handleMouseLeave = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      setHoveredId(null);
      setOpenMega(null);
    }, 180);
  };

  const handleNavClick = (item: NavItemConfig) => {
    navigate(item.to);
    setOpenMega(null);
    setHoveredId(null);
  };

  const activeMega = megaMenus.find((m) => m.id === openMega);

  return (
    <header
      className="sticky top-2 z-40 mx-auto max-w-7xl px-3 transition-all sm:top-3.5 sm:px-6"
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Glass Navigation Capsule */}
      <div className="relative flex h-16 items-center justify-between gap-2 sm:gap-4 rounded-full border border-mint/20 bg-paper-deep/90 px-3 sm:px-5 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7),0_0_0_1px_rgba(168,240,220,0.08)] backdrop-blur-2xl">
        {/* Mobile menu hamburger toggle */}
        <button
          ref={menuButton}
          type="button"
          className="grid size-10 place-items-center rounded-full hover:bg-paper lg:hidden text-ink"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <LuX aria-hidden className="size-5" /> : <LuMenu aria-hidden className="size-5" />}
        </button>

        {/* Brand Wordmark */}
        <Wordmark />

        {/* DESKTOP INTERACTIVE EXPANDING NAVIGATION BAR (Original items: Stickers, Posters, Collectibles, Create, Vibes, About) */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-2"
        >
          <ul className="flex items-center gap-1.5 p-1 rounded-full border border-mint/15 bg-paper/70 backdrop-blur-xl shadow-inner">
            {originalNavItems.map((item) => {
              const active = isItemActive(item);
              const isHovered = hoveredId === item.id;
              const hasAnyHover = hoveredId !== null;
              const imgSrc =
                item.image.startsWith('http') || item.image.startsWith(import.meta.env.BASE_URL)
                  ? item.image
                  : `${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`;

              return (
                <li
                  key={item.id}
                  className="relative nav-expand-spring"
                  style={{
                    width: isHovered
                      ? '205px'
                      : hasAnyHover
                      ? '70px'
                      : '86px',
                  }}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onFocus={() => handleMouseEnter(item.id)}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    aria-current={active ? 'page' : undefined}
                    aria-expanded={openMega === item.id}
                    className={`group relative flex h-10 w-full items-center overflow-hidden rounded-full px-2.5 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] text-left outline-none ${
                      isHovered
                        ? 'border border-mint/45 bg-paper-deep/95 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(168,240,220,0.15)] ring-1 ring-mint/30'
                        : active
                        ? 'border border-mint/30 bg-white/10 text-ink shadow-sm'
                        : 'border border-transparent hover:bg-white/5 text-ink-soft hover:text-ink'
                    }`}
                  >
                    {/* Background image reveal on hover */}
                    <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                      <img
                        src={imgSrc}
                        alt=""
                        className={`size-full object-cover transition-all duration-500 ease-out ${
                          isHovered ? 'opacity-30 scale-110 rotate-1' : 'opacity-0 scale-100'
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-paper-deep via-paper-deep/80 to-transparent" />
                    </div>

                    {/* Left Icon */}
                    <span
                      className={`relative z-10 grid size-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isHovered
                          ? 'bg-mint text-on-light scale-105 -rotate-3 shadow-sm'
                          : active
                          ? 'bg-white/15 text-mint'
                          : 'text-mint/80 group-hover:text-mint'
                      }`}
                    >
                      <NavIcon type={item.iconType} className="size-3.5" />
                    </span>

                    {/* Text Label & Animated Subtitle */}
                    <div className="relative z-10 ml-2 min-w-0 flex-1 overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-display text-xs font-bold leading-none tracking-tight truncate transition-colors duration-200 ${
                            isHovered ? 'text-ink font-extrabold' : active ? 'text-ink' : 'text-ink-soft group-hover:text-ink'
                          }`}
                        >
                          {item.label}
                        </span>

                        {/* Active dot indicator */}
                        {active && !isHovered && (
                          <span
                            aria-hidden
                            className="size-1.5 rounded-full bg-cinema-red shadow-[0_0_8px_#ff1026] animate-pulse shrink-0"
                          />
                        )}

                        {/* Badge chip on hover */}
                        {item.badge && isHovered && (
                          <span className="shrink-0 rounded-full bg-cinema-red/90 px-1.5 py-0.2 text-[8px] font-mono font-extrabold text-ink uppercase tracking-wider animate-fade-in">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Subtitle that slides up & fades in */}
                      <p
                        className={`text-[9px] font-mono tracking-wider text-mint/90 uppercase truncate transition-all duration-300 ease-out ${
                          isHovered
                            ? 'max-h-4 opacity-100 translate-y-0 mt-0.5'
                            : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none'
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Chevron for mega menu items */}
                    {item.isMegaMenu && isHovered && (
                      <LuChevronDown
                        aria-hidden
                        className={`relative z-10 size-3 shrink-0 text-mint/80 transition-transform duration-200 ${
                          openMega === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right utility buttons: Search, Account, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            className="grid size-9 sm:size-10 place-items-center rounded-full hover:bg-paper text-ink transition-colors"
            aria-label={searchOpen ? 'Close search' : 'Search stickers and posters'}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((o) => !o)}
          >
            {searchOpen ? <LuX aria-hidden className="size-4 sm:size-5" /> : <LuSearch aria-hidden className="size-4 sm:size-5" />}
          </button>

          <Link
            to={user?.role === 'ADMIN' ? '/admin' : user ? '/account' : '/login'}
            className="hidden sm:inline-flex shrink-0 items-center rounded-full border border-mint/20 px-3 py-1.5 text-xs font-bold text-mint transition-all hover:bg-paper hover:border-mint/50"
          >
            {user ? 'Account' : 'Log in'}
          </Link>

          <button
            type="button"
            onClick={openCart}
            className="group relative flex h-9 sm:h-10 items-center gap-2 rounded-full bg-ink px-3.5 sm:px-4 text-xs sm:text-sm font-bold text-paper transition-all hover:scale-105 active:scale-95 shadow-md"
            aria-label={`Open shopping cart with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          >
            <LuShoppingBag aria-hidden className="size-3.5 sm:size-4 transition-transform group-hover:-rotate-12" />
            <span className="hidden md:inline">Cart</span>
            <span className="grid min-w-5 place-items-center rounded-full bg-lime px-1.5 text-xs font-mono font-bold leading-5 text-ink tabular-nums shadow-sm">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Mega Dropdown Panel (for Stickers or Posters) */}
      {activeMega && (
        <div
          id="mega-panel"
          className="fade-in absolute inset-x-3 sm:inset-x-6 top-[calc(100%+0.5rem)] hidden rounded-2xl border border-mint/20 bg-paper-deep/95 shadow-2xl backdrop-blur-2xl lg:block overflow-hidden z-50"
          onMouseEnter={() => setOpenMega(activeMega.id)}
          onMouseLeave={handleMouseLeave}
        >
          <MegaPanel menu={activeMega} />
        </div>
      )}

      {/* Search Bar Flyout */}
      {searchOpen && (
        <div className="fade-in absolute inset-x-3 sm:inset-x-6 top-[calc(100%+0.5rem)] rounded-2xl border border-mint/20 bg-paper-deep/95 p-3.5 shadow-2xl backdrop-blur-2xl z-50">
          <div className="mx-auto max-w-2xl">
            <SearchForm autoFocus onDone={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* MOBILE INTERACTIVE ACCORDION DRAWER (Original Items) */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile Navigation"
          className="fade-in absolute inset-x-3 top-[calc(100%+0.5rem)] max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-3xl border border-mint/20 bg-paper-deep/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden z-50"
        >
          <div className="space-y-2">
            <div className="mb-3 px-1">
              <SearchForm onDone={() => setMenuOpen(false)} />
            </div>

            {originalNavItems.map((item) => {
              const active = isItemActive(item);
              const isExpanded = mobileExpandedId === item.id;
              const mega = megaMenus.find((m) => m.id === item.id);
              const imgSrc =
                item.image.startsWith('http') || item.image.startsWith(import.meta.env.BASE_URL)
                  ? item.image
                  : `${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`;

              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-mint/20 bg-white/5 transition-all duration-200"
                >
                  {/* Card Header Row */}
                  <div className="relative flex items-center justify-between p-3">
                    {/* Background thumbnail */}
                    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                      <img src={imgSrc} alt="" className="size-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-paper-deep via-paper-deep/80 to-transparent" />
                    </div>

                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="relative z-10 flex items-center gap-3 min-w-0 flex-1"
                    >
                      <span className="grid size-9 place-items-center rounded-full bg-mint text-on-light shrink-0">
                        <NavIcon type={item.iconType} className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base font-extrabold text-ink truncate">
                            {item.label}
                          </span>
                          {active && (
                            <span className="size-1.5 rounded-full bg-cinema-red animate-pulse" />
                          )}
                          {item.badge && (
                            <span className="rounded-full bg-cinema-red px-2 py-0.2 text-[9px] font-mono font-bold text-ink uppercase">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-mono text-mint uppercase truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </Link>

                    {mega && (
                      <button
                        type="button"
                        onClick={() => setMobileExpandedId(isExpanded ? null : item.id)}
                        className="relative z-10 grid size-8 place-items-center rounded-full bg-white/10 text-mint"
                        aria-label={`Expand ${item.label} formats`}
                        aria-expanded={isExpanded}
                      >
                        <LuChevronDown
                          className={`size-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Expanded Submenu Accordion for Stickers / Posters */}
                  {mega && isExpanded && (
                    <div className="border-t border-mint/15 bg-paper/60 px-3 py-2.5 space-y-1.5 animate-fade-in">
                      <Link
                        to={mega.allLink.to}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg bg-lime px-3 py-1.5 text-xs font-extrabold text-ink"
                      >
                        {mega.allLink.label} →
                      </Link>
                      {mega.formats.map((f) => (
                        <Link
                          key={f.label}
                          to={f.to}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs font-bold text-ink hover:bg-white/10 hover:text-mint transition-colors"
                        >
                          <span>{f.label}</span>
                          {f.note && <span className="text-[10px] text-ink-soft">{f.note}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Account & Admin link */}
            <div className="pt-3 border-t border-mint/20 flex items-center justify-between px-2 text-xs">
              <Link
                to={user?.role === 'ADMIN' ? '/admin' : user ? '/account' : '/login'}
                onClick={() => setMenuOpen(false)}
                className="font-bold text-mint hover:underline"
              >
                {user ? `Signed in as ${user.name}` : 'Log in to your account →'}
              </Link>
              <span className="text-ink-soft font-mono">HYD · DROP 01</span>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
