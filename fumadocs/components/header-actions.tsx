/**
 * plytix.com, Login and Book a demo, as in the Knowledge Base header (knowledge.plytix.com):
 * plain text links that turn purple on hover. plytix.com is medium weight in the
 * foreground color with an up-right arrow; Login and Book a demo are regular
 * weight and muted. Plugged into the navbar (and the mobile menu) through
 * `links` in lib/layout.shared.tsx.
 */

const linkClassName =
  'text-[15px] leading-[1.2] transition-colors duration-200 ease-out hover:text-(--plytix-link)';

export function HeaderActions() {
  // lg:ms-3 keeps them apart from the theme toggle in the home navbar; the docs
  // navbar moves them onto its tabs row (global.css). Below lg they sit in the
  // menu, padded like its items.
  return (
    <div data-header-actions="" className="flex items-center gap-3 max-lg:px-2 lg:ms-3">
      <a
        href="https://www.plytix.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkClassName} inline-flex items-center gap-1 font-medium text-fd-foreground`}
      >
        plytix.com
        {/* Font Awesome Free 6.7.2 arrow-up (CC BY 4.0), turned to point up-right as in the Knowledge Base. */}
        <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden className="size-3 rotate-45 translate-y-px">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </a>
      <a
        href="https://auth.plytix.com/auth/login"
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkClassName} text-(--plytix-header-action)`}
      >
        Login
      </a>
      <a href="https://www.plytix.com/get-started/demo/" className={`${linkClassName} text-(--plytix-header-action)`}>
        Book a demo
      </a>
    </div>
  );
}
