import React, { useEffect, useRef } from 'react';

/**
 * AdSlot — Adsterra ad placement component.
 *
 * How to use with Adsterra:
 * 1. Log in to https://my.adsterra.com → Publishers → Websites → Add your site.
 * 2. Create a placement (Banner / IAB Banner / Native / Pop) and copy its SNIPPET CODE.
 * 3. Paste the snippet code into the `snippet` prop below (or set a default in ADSTERRA_SNIPPETS).
 *
 * The component renders a responsive container with an "Advertisement" label so it
 * complies with ad-disclosure guidelines, and injects the Adsterra script/iframe
 * snippet into the container at runtime.
 */

export type AdFormat = 'horizontal' | 'vertical' | 'inline' | 'sticky';

// Your Adsterra placement codes, keyed by placement name.
const ad567 = `
<script>
  atOptions = {
    'key' : 'ad567f5559551e4def9b3876d07b41ee',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/ad567f5559551e4def9b3876d07b41ee/invoke.js"></script>
`;

export const ADSTERRA_SNIPPETS: Record<string, string> = {
  // 160x300 banner (Adsterra key: ad567f5559551e4def9b3876d07b41ee)
  leaderboard_top:       ad567,
  footer_banner:         ad567,
  sticky_bottom:         ad567,
  in_content_1:          ad567,
  mid_page:              ad567,
  in_content_2:          ad567,
  routes_above_results:  ad567,

  // --- Site-wide Adsterra formats (JS SYNC — load once per page view) ---
  // Popunder: triggers on first user interaction; no visible container.
  popunder: '<script src="https://pl31570075.profitableratecpmnetwork.com/5c/12/0b/5c120b40889aa54e5b3353d9f3da9fb1.js"></script>',
  // SocialBar: floating social bar overlay from Adsterra.
  socialbar: '<script src="https://pl31570074.profitableratecpmnetwork.com/bb/e8/39/bbe839be5a627e331c21e7c3c5b1160e.js"></script>',
};

interface AdSlotProps {
  /** Key into ADSTERRA_SNIPPETS, or pass the raw snippet via `snippet` */
  placement?: string;
  /** Raw Adsterra snippet code (script tag / iframe / HTML) */
  snippet?: string;
  format?: AdFormat;
  className?: string;
}

const formatStyles: Record<AdFormat, React.CSSProperties> = {
  // The container must be exactly 160x300 — Adsterra's invoke.js writes the
  // iframe using the width/height from atOptions, so any larger reserved box
  // would show empty gray space around a single small ad.
  horizontal: { minHeight: 300, height: 300, width: 160 },
  vertical: { minHeight: 300, height: 300, width: 160 }, // Adsterra 160x300 banner
  inline: { minHeight: 300, height: 300, width: 160 },
  sticky: { minHeight: 60, maxWidth: '100%' },
};

const loadExternalScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });

/** Sticky bottom banner (mobile-friendly) — render once near the end of the layout */
export function AdStickyBottom({ snippet }: { snippet?: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur">
      {/* 160x300 is too tall for a sticky bar; hide it until a dedicated
          horizontal/sticky Adsterra code is added to ADSTERRA_SNIPPETS. */}
      <AdSlot placement="sticky_bottom" snippet={snippet} format="sticky" className="my-0 max-w-none hidden" />
    </div>
  );
}

/**
 * AdFormats — site-wide Adsterra overlays that are NOT placed inside a box:
 *   • Popunder  (loaded from pl31570075.profitableratecpmnetwork.com)
 *   • SocialBar (loaded from pl31570074.profitableratecpmnetwork.com)
 *
 * These JS-SYNC snippets call document.write(), which only works during the
 * initial HTML parsing of a full page load. So we inject them into a hidden
 * iframe whose document we write into once it loads — the same technique
 * Adsterra's own sync tags use. Each script loads at most once per page view.
 */
const OVERLAY_LOADED = new Set<string>();

function SyncOverlayScript({ src }: { src: string }) {
  useEffect(() => {
    if (OVERLAY_LOADED.has(src)) return;
    OVERLAY_LOADED.add(src);

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('title', 'ad-overlay');
    document.body.appendChild(iframe);

    try {
      const doc = iframe.contentDocument;
      if (!doc) throw new Error('no iframe document');
      doc.open();
      doc.write(`<script src="${src}"><\/script>`);
      doc.close();
    } catch {
      // Fallback: append as a normal async script (works for scripts that
      // don't rely on document.write, e.g. some popunder versions).
      loadExternalScript(src).catch(() => {});
    }
  }, [src]);

  return null;
}

export function AdFormats() {
  return (
    <>
      <SyncOverlayScript src="https://pl31570075.profitableratecpmnetwork.com/5c/12/0b/5c120b40889aa54e5b3353d9f3da9fb1.js" />
      <SyncOverlayScript src="https://pl31570074.profitableratecpmnetwork.com/bb/e8/39/bbe839be5a627e331c21e7c3c5b1160e.js" />
    </>
  );
}

export default function AdSlot({ placement, snippet, format = 'horizontal', className = '' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const code = snippet ?? (placement ? ADSTERRA_SNIPPETS[placement] : undefined);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !code) return;

    // IMPORTANT: Adsterra's invoke.js writes its iframe with document.write(),
    // which only works when the script runs during initial page parsing. In a
    // React SPA it would be blocked, so we use the official async workaround:
    // load invoke.js via XHR and inject the ad HTML into this container.
    const keyMatch = code.match(/'key'\s*:\s*'([a-f0-9]+)'/);
    const srcMatch = code.match(/https:\/\/[^"']+\/invoke\.js/);

    if (keyMatch && srcMatch) {
      const key = keyMatch[1];
      const src = srcMatch[0];
      // Set atOptions exactly as Adsterra's snippet defines it (160x300 iframe)
      (window as any).atOptions = {
        key: key,
        format: 'iframe',
        height: 300,
        width: 160,
        params: {},
      };

      let cancelled = false;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', src, true);
      xhr.withCredentials = true;
      xhr.responseType = 'text';
      xhr.onload = () => {
        if (cancelled || !el.isConnected) return;
        el.innerHTML = xhr.responseText || '';
        // Execute any <script> tags that came back in the ad markup
        el.querySelectorAll('script').forEach((oldScript) => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          if (!oldScript.src) newScript.textContent = oldScript.textContent;
          oldScript.parentNode?.replaceChild(newScript, oldScript);
        });
      };
      xhr.onerror = () => {
        if (!cancelled && el.isConnected) el.innerHTML = '';
      };
      xhr.send();
      return () => {
        cancelled = true;
      };
    }

    // Fallback: render the snippet HTML directly and execute its scripts
    el.innerHTML = code;
    el.querySelectorAll('script').forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (!oldScript.src) {
        newScript.textContent = oldScript.textContent;
      }
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [code]);

  return (
    <aside
      aria-label="Advertisement"
      className={`adsterra-slot my-4 flex w-full flex-col items-center justify-center ${className}`}
    >
      <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gray-400">
        Advertisement
      </span>
      <div
        ref={containerRef}
        data-ad-format={format}
        data-placement={placement ?? 'custom'}
        className="flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50"
        style={formatStyles[format]}
      >
        {!code && (
          <span className="text-xs text-gray-300 select-none">
            Ad space reserved — Adsterra ({placement ?? format})
          </span>
        )}
      </div>
    </aside>
  );
}

export { loadExternalScript };
