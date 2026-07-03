"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { modules, navigation } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { motionConfig } from "@/lib/motion";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeDropdownTimer = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("nav-open");
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], summary, button:not([disabled])'));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("nav-open");
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileFeaturesOpen(pathname.startsWith("/features") || pathname.startsWith("/modules"));
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
    window.setTimeout(() => toggleRef.current?.focus(), 0);
  }

  function openServices() {
    if (closeDropdownTimer.current) window.clearTimeout(closeDropdownTimer.current);
    setServicesOpen(true);
  }

  function scheduleCloseServices() {
    if (closeDropdownTimer.current) window.clearTimeout(closeDropdownTimer.current);
    closeDropdownTimer.current = window.setTimeout(() => setServicesOpen(false), 180);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-island glass">
          <Logo />

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => {
              if (item.href === "/features") {
                return (
                  <div
                    className="nav-dropdown"
                    key={item.href}
                    ref={dropdownRef}
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                  >
                    <button
                      type="button"
                      className={`nav-dropdown__trigger${isActive(item.href) || pathname.startsWith("/modules") ? " active" : ""}${servicesOpen ? " is-open" : ""}`}
                      aria-expanded={servicesOpen}
                      aria-controls="modules-menu"
                      onClick={() => setServicesOpen((value) => !value)}
                      onFocus={openServices}
                      onMouseEnter={openServices}
                    >
                      Features
                      <span className="nav-dropdown__chevron" aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {servicesOpen ? (
                        <motion.div
                          className="dropdown-panel glass"
                          id="modules-menu"
                          onMouseEnter={openServices}
                          onMouseLeave={scheduleCloseServices}
                          initial={reduceMotion ? false : { opacity: 0, x: "-50%", y: 12, scale: 0.98, filter: "blur(8px)" }}
                          animate={{ opacity: 1, x: "-50%", y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={reduceMotion ? undefined : { opacity: 0, x: "-50%", y: 8, scale: 0.98, filter: "blur(8px)" }}
                          transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
                        >
                          <div>
                            <span className="dropdown-kicker">Learning modules</span>
                            <Link href="/features" className="dropdown-feature">
                              Explore all MRI Plan features
                            </Link>
                          </div>
                          <div className="dropdown-grid">
                            {modules.map((module) => (
                              <Link href={`/modules/${module.slug}`} key={module.slug}>
                                <strong>{module.title}</strong>
                                <span>{module.summary}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link className={isActive(item.href) ? "active" : ""} href={item.href} key={item.href}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <Button href="/launch" variant="glass" className="header-cta">
              Get Notified
            </Button>
            <button
              ref={toggleRef}
              className={`burger${menuOpen ? " open" : ""}`}
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-menu open"
            id="mobile-menu"
            aria-hidden={!menuOpen}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: motionConfig.fast }}
          >
            <button className="mobile-menu__backdrop" type="button" aria-label="Close menu" onClick={closeMenu} />
            <motion.div
              className="mobile-menu__panel glass"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              ref={panelRef}
              initial={reduceMotion ? false : { opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.42, ease: motionConfig.softEase }}
            >
              <nav className="mobile-menu__nav" aria-label="Mobile primary navigation">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.045, duration: 0.42, ease: motionConfig.ease }}
                  >
                    {item.href === "/features" ? (
                      <div className={`mobile-menu__details${mobileFeaturesOpen ? " is-open" : ""}`}>
                        <button
                          type="button"
                          className={isActive(item.href) || pathname.startsWith("/modules") ? "active" : ""}
                          aria-expanded={mobileFeaturesOpen}
                          aria-controls="mobile-features-subnav"
                          onClick={() => setMobileFeaturesOpen((value) => !value)}
                        >
                          {item.label}
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileFeaturesOpen ? (
                            <motion.div
                              id="mobile-features-subnav"
                              className="mobile-menu__subnav"
                              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
                              style={{ overflow: "hidden" }}
                            >
                              <Link href="/features">All features</Link>
                              {modules.map((module) => (
                                <Link
                                  className={pathname === `/modules/${module.slug}` ? "active" : ""}
                                  href={`/modules/${module.slug}`}
                                  key={module.slug}
                                >
                                  {module.title}
                                </Link>
                              ))}
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link className={isActive(item.href) ? "active" : ""} href={item.href}>
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
              <div className="mobile-menu__footer">
                <Button href="/launch" full>
                  Get Notified
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
