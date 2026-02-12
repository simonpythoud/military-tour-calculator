## 2024-05-23 - Brittle React Testing Selectors and Map Performance
**Learning:** React Testing Library selectors like `closest('div')` can be brittle when components switch to semantic HTML (e.g., `<section>`). Always prefer roles or specific test IDs.
**Action:** When writing tests for drag-and-drop zones or containers, verify the semantic element used and use appropriate selectors (e.g., `closest('section')` or `getByRole('region')`).

**Learning:** Leaflet maps in React (`react-leaflet`) are expensive to re-render. If they are children of a frequent-update component (like a calculator with inputs), they MUST be memoized with `React.memo` and receive stable props.
**Action:** Always wrap `MapContainer` components in `React.memo` and ensure `sections` or `route` props are stable via `useMemo` or state stability.
