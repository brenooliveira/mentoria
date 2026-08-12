import assert from "node:assert/strict";
import test from "node:test";
import { setTrackingAdapter, trackEvent } from "../lib/tracking.ts";

test("gera evento interno apenas com propriedades não pessoais", () => {
  const originalWindow = globalThis.window;
  const fakeWindow = Object.assign(new EventTarget(), {
    location: { pathname: "/mentoria" },
  });
  globalThis.window = fakeWindow;

  let captured;
  setTrackingAdapter((event) => {
    captured = event;
  });

  try {
    trackEvent("application_submission_attempt", {
      step: "step_2",
      priceMode: "after-application",
      investmentOptionId: "private_2500_to_5000",
    });

    assert.equal(captured.name, "application_submission_attempt");
    assert.equal(captured.path, "/mentoria");
    assert.match(captured.occurredAt, /^\d{4}-\d{2}-\d{2}T/);
    assert.deepEqual(Object.keys(captured.properties).sort(), [
      "investmentOptionId",
      "priceMode",
      "step",
    ]);
    for (const forbiddenKey of ["name", "email", "whatsapp", "linkedin", "challenge", "goal90Days"]) {
      assert.equal(Object.hasOwn(captured.properties, forbiddenKey), false);
    }
  } finally {
    setTrackingAdapter(null);
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
