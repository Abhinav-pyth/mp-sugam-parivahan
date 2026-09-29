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
  horizontal: { minHeight: 300, maxWidth: 970 },
  vertical: { minHeight: 300, maxWidth: 160 }, // Adsterra 160x300 banner
  inline: { minHeight: 300, maxWidth: '100%' },
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
      <AdSlot placement="sticky_bottom" snippet={snippet} format="sticky" className="my-0 max-w-none" />
    </div>
  );
}

export default function AdSlot({ placement, snippet, format = 'horizontal', className = '' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const code = snippet ?? (placement ? ADSTERRA_SNIPPETS[placement] : undefined);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !code) return;

    // Render the snippet HTML inside the container
    el.innerHTML = code;

    // Manually execute any inline <script> tags injected via innerHTML
    el.querySelectorAll('script').forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (oldScript.src) {
        // async external ad script
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      } else {
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      }
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
