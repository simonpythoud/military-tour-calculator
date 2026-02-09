## 2025-05-21 - [Accessibility] Saved Calculations Accessibility
**Learning:** Icon-only buttons (Remove, Settings) lacked accessible names and interactive feedback. This makes them unusable for screen readers and confusing for sighted users.
**Action:** When adding icon-only buttons, always include `aria-label` and `title`, and ensure hover/focus states provide clear visual feedback.
