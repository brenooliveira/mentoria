"use client";

import { useEffect } from "react";
import { siteConfig } from "../../content/site";
import { trackEvent } from "../../lib/tracking";

export function FunnelTracking() {
  useEffect(() => {
    const applicationSection = document.getElementById("candidatura");
    if (!applicationSection) return;

    let sectionViewed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || sectionViewed) return;
        sectionViewed = true;
        trackEvent("application_section_view", {
          priceMode: siteConfig.investment.mode,
        });
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    const trackCtaClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-funnel-cta]")
        : null;
      const source = target?.dataset.funnelCta;
      if (!source || !isCtaSource(source)) return;
      trackEvent("application_cta_click", {
        ctaSource: source,
        priceMode: siteConfig.investment.mode,
      });
    };

    observer.observe(applicationSection);
    document.addEventListener("click", trackCtaClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", trackCtaClick);
    };
  }, []);

  return null;
}

function isCtaSource(value: string): value is "header" | "hero" | "mobile_menu" | "final" | "mobile_fixed" {
  return ["header", "hero", "mobile_menu", "final", "mobile_fixed"].includes(value);
}
