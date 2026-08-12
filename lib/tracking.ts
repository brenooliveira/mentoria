export type FunnelEventName =
  | "application_cta_click"
  | "application_section_view"
  | "application_form_start"
  | "application_step_one_complete"
  | "application_step_back"
  | "application_submission_attempt"
  | "application_validation_error"
  | "application_endpoint_error"
  | "application_submission_success";

export type FunnelEventProperties = {
  step?: "step_1" | "step_2";
  priceMode?: "after-application" | "initial-price";
  investmentOptionId?: string;
  ctaSource?: "header" | "hero" | "mobile_menu" | "final" | "mobile_fixed";
  errorType?: "spam_protection" | "required_fields" | "endpoint";
};

export type FunnelEvent = {
  name: FunnelEventName;
  properties: FunnelEventProperties;
  occurredAt: string;
  path: string;
};

export type TrackingAdapter = (event: FunnelEvent) => void;

let trackingAdapter: TrackingAdapter | null = null;

export function setTrackingAdapter(adapter: TrackingAdapter | null) {
  trackingAdapter = adapter;
}

export function trackEvent(name: FunnelEventName, properties: FunnelEventProperties = {}) {
  if (typeof window === "undefined") return;

  const event: FunnelEvent = {
    name,
    properties,
    occurredAt: new Date().toISOString(),
    path: window.location.pathname,
  };

  trackingAdapter?.(event);
  window.dispatchEvent(new CustomEvent("coderszoom:funnel-event", { detail: event }));
}
