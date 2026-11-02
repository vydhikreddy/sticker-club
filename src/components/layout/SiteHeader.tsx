import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  LuArrowRight,
  LuClapperboard,
  LuCompass,
  LuHeartHandshake,
  LuHouse,
  LuMenu,
  LuMessageCircle,
  LuSearch,
  LuShoppingBag,
  LuSparkles,
  LuX,
  LuChevronDown,
} from 'react-icons/lu';
import { brand } from '../../config/brand';
import { expandingNavItems, type ExpandingNavItem } from '../../config/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from '../../router/router';
import { shopUrl } from '../../utils/catalogue';

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

function NavIcon({ type, className = 'size-4' }: { type: ExpandingNavItem['iconType']; className?: string }) {
  switch (type) {
    case 'home':
      return <LuHouse className={className} />;
    case 'shop':
      return <LuShoppingBag className={className} />;
    case 'video':
      return <LuClapperboard className={className} />;
    case 'vibes':
      return <LuCompass className={className} />;
    case 'about':
      return <LuHeartHandshake className={className} />;
    case 'contact':
      return <LuMessageCircle className={className} />;
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
        Search stickers, posters and collections
      </label>
      <LuSearch aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft" />
      <input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Search anime, chai, coding, cars, A3 posters…"
        className="w-full rounded-full border border-mint/20 bg-paper px-4 py-2.5 pl-11 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-mint focus:ring-1 focus:ring-mint"
      />
    </form>
  );
}

export function SiteHeader() {
  const { itemCount, openCart } = useCart();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tappedId, setTappedId] = useState<string | null>(null);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const hoverTimer = useRef<number | undefined>(undefined);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close menus and panels on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setHoveredId(null);
    setTappedId(null);
    setOpenSubmenuId(null);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
        setSearchOpen(false);
        setHoveredId(null);
        setTappedId(null);
        setOpenSubmenuId(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isItemActive = (item: ExpandingNavItem): boolean => {
    if (item.id === 'home') return pathname === '/';
    if (item.id === 'shop') {
      return (
        pathname === '/shop' ||
        pathname.startsWith('/product') ||
        pathname === '/build-your-pack' ||
        pathname === '/build-your-wall' ||
        pathname === '/create-your-stickers' ||
        pathname === '/collectibles'
      );
    }
    if (item.id === 'video') return pathname === '/shop-by-video';
    if (item.id === 'vibes') return pathname === '/vibes';
    if (item.id === 'about') return pathname === '/about' || pathname === '/collector-passport' || pathname === '/vote-next-drop';
    if (item.id === 'contact') return pathname === '/contact' || pathname === '/faq' || pathname.startsWith('/policies');
    return pathname === item.to;
  };

  const handleMouseEnter = (id: string) => {
    window.clearTimeout(hoverTimer.current);
    setHoveredId(id);
    const item = expandingNavItems.find((n) => n.id === id);
    if (item?.sublinks?.length) {
      setOpenSubmenuId(id);
    } else {
      setOpenSubmenuId(null);
    }
  };

  const handleMouseLeave = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      setHoveredId(null);
      setTappedId(null);
      setOpenSubmenuId(null);
    }, 180);
  };

  const handleNavClick = (item: ExpandingNavItem, e: React.MouseEvent) => {
    // If on a touch-first device and not yet expanded, expand on first tap
    if (hoveredId === item.id || tappedId === item.id || !item.sublinks?.length) {
      navigate(item.to);
      setOpenSubmenuId(null);
      setHoveredId(null);
      setTappedId(null);
    } else {
      e.preventDefault();
      setTappedId(item.id);
      setHoveredId(item.id);
      setOpenSubmenuId(item.id);
    }
  };

  const activeSubmenuItem = expandingNavItems.find((item) => item.id === openSubmenuId && item.sublinks?.length);

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

        {/* DESKTOP INTERACTIVE EXPANDING NAVIGATION BAR */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-2"
        >
          <ul className="flex items-center gap-1.5 p-1 rounded-full border border-mint/15 bg-paper/70 backdrop-blur-xl shadow-inner">
            {expandingNavItems.map((item) => {
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
                      ? '215px'
                      : hasAnyHover
                      ? '70px'
                      : '84px',
                  }}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onFocus={() => handleMouseEnter(item.id)}
                >
                  <button
                    type="button"
                    onClick={(e) => handleNavClick(item, e)}
                    aria-current={active ? 'page' : undefined}
                    aria-expanded={openSubmenuId === item.id}
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

                    {/* Chevron for items with sublinks */}
                    {item.sublinks?.length && isHovered && (
                      <LuChevronDown
                        aria-hidden
                        className={`relative z-10 size-3 shrink-0 text-mint/80 transition-transform duration-200 ${
                          openSubmenuId === item.id ? 'rotate-180' : ''
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

      {/* Floating Submenu Dropdown Card (Desktop) */}
      {activeSubmenuItem && (
        <div
          role="region"
          aria-label={`${activeSubmenuItem.label} sub-navigation`}
          className="fade-in absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.5rem)] z-50 w-full max-w-xl rounded-2xl border border-mint/25 bg-paper-deep/95 p-4 shadow-[0_20px_48px_-10px_rgba(0,0,0,0.8),0_0_24px_rgba(168,240,220,0.12)] backdrop-blur-2xl"
          onMouseEnter={() => setOpenSubmenuId(activeSubmenuItem.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-between border-b border-mint/15 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-mint text-on-light">
                <NavIcon type={activeSubmenuItem.iconType} className="size-3" />
              </span>
              <span className="font-display text-sm font-bold text-ink">
                {activeSubmenuItem.label} Destinations
              </span>
              <span className="rounded-full bg-cinema-red px-2 py-0.2 text-[9px] font-mono font-bold text-ink uppercase">
                {activeSubmenuItem.badge}
              </span>
            </div>
            <Link
              to={activeSubmenuItem.to}
              className="text-xs font-bold text-mint hover:underline inline-flex items-center gap-1"
            >
              Explore all {activeSubmenuItem.label.toLowerCase()} <LuArrowRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {activeSubmenuItem.sublinks?.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex flex-col rounded-xl border border-mint/10 bg-white/5 p-2.5 transition-all duration-200 hover:border-mint/40 hover:bg-white/10 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-ink group-hover:text-mint transition-colors">
                    {link.label}
                  </span>
                  <LuArrowRight className="size-3 text-ink-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {link.note && (
                  <span className="text-[10px] text-ink-soft mt-0.5 line-clamp-1">{link.note}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar Flyout */}
      {searchOpen && (
        <div className="fade-in absolute inset-x-3 sm:inset-x-6 top-[calc(100%+0.5rem)] rounded-2xl border border-mint/20 bg-paper-deep/95 p-3.5 shadow-2xl backdrop-blur-2xl">
          <div className="mx-auto max-w-2xl">
            <SearchForm autoFocus onDone={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* MOBILE INTERACTIVE ACCORDION DRAWER */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile Navigation"
          className="fade-in absolute inset-x-3 top-[calc(100%+0.5rem)] max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-3xl border border-mint/20 bg-paper-deep/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <div className="space-y-2">
            <div className="mb-3 px-1">
              <SearchForm onDone={() => setMenuOpen(false)} />
            </div>

            {expandingNavItems.map((item) => {
              const active = isItemActive(item);
              const isExpanded = mobileExpandedId === item.id;
              const imgSrc =
                item.image.startsWith('http') || item.image.startsWith(import.meta.env.BASE_URL)
                  ? item.image
                  : `${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`;

              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-mint/20 bg-white/5 transition-all duration-200"
                >
                  {/* Item Header Button */}
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

                    {item.sublinks?.length && (
                      <button
                        type="button"
                        onClick={() => setMobileExpandedId(isExpanded ? null : item.id)}
                        className="relative z-10 grid size-8 place-items-center rounded-full bg-white/10 text-mint"
                        aria-label={`Expand ${item.label} submenu`}
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

                  {/* Expanded Submenu Accordion */}
                  {item.sublinks?.length && isExpanded && (
                    <div className="border-t border-mint/15 bg-paper/60 px-3 py-2.5 space-y-1.5 animate-fade-in">
                      {item.sublinks.map((sublink) => (
                        <Link
                          key={sublink.to}
                          to={sublink.to}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between rounded-xl p-2 text-xs font-bold text-ink hover:bg-white/10 hover:text-mint transition-colors"
                        >
                          <div>
                            <p>{sublink.label}</p>
                            {sublink.note && (
                              <p className="text-[10px] text-ink-soft font-normal">{sublink.note}</p>
                            )}
                          </div>
                          <LuArrowRight className="size-3 text-mint shrink-0" />
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
