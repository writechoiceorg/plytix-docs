/**
 * Login and Book a demo, as in the Knowledge Base header (knowledge.plytix.com):
 * plain bold text links that turn purple on hover. Plugged into the navbar
 * (and the mobile menu) through `links` in lib/layout.shared.tsx.
 */

const linkClassName =
  'text-[15px] leading-[1.2] font-bold text-(--plytix-header-action) transition-colors duration-200 ease-out hover:text-(--plytix-link)';

export function HeaderActions() {
  // lg:ms-3 keeps them apart from the theme toggle in the home navbar; the docs
  // navbar moves them onto its tabs row (global.css). Below lg they sit in the
  // menu, padded like its items.
  return (
    <div data-header-actions="" className="flex items-center gap-3 max-lg:px-2 lg:ms-3">
      <a
        href="https://auth.plytix.com/auth/login"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        Login
      </a>
      <a href="https://www.plytix.com/get-started/demo/" className={linkClassName}>
        Book a demo
      </a>
    </div>
  );
}
