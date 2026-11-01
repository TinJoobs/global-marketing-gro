# Interactive hero objects — November 1, 2026

Inspected and preserved latest remote base `a14355748c8aa0d83c0700c9100e6b39cda49388`, including headline spacing, CRM forms, integration logos and the approved industry stacking deck.

## What changed

Every canonical page now has one content-specific interactive CSS 3D object. Database cylinders support CRM, a neural cube supports AI, layered browser windows support digital/portfolio/media, calendar and conversation solids support appointments/follow-up, network hubs support integrations and referrals, buildings support industries, rising tier columns support pricing, a globe supports About, headsets/briefcases support VA/careers, books support resources and guides, and shield/document/coin objects support legal pages. The calculator, confirmation, booking alias and 404 are covered too. See `HERO-3D-COVERAGE.json` for the visited route/variant/object/headline matrix.

Home's map reuses the repository's Natural Earth-derived geographic outline rather than the partial implementation's three arbitrary blobs. Seven depth layers form extruded island shapes; native buttons select Luzon, Visayas and Mindanao and update a geographic caption. These are geographic island-group markers, not claimed office locations. The silhouette is a simplified decorative map, not a boundary reference. Original provenance remains in `philippines-map-source.md`.

## Interaction and accessibility

- Drag to rotate; touch users can drag horizontally while vertical page scrolling remains available.
- Focus the object and use arrow keys; Home resets its orientation. Native 44px arrow/reset buttons provide an alternative.
- Camera angles are bounded. Pointer capture, cancellation, observers, media/visibility listeners and pending animation frames clean up on unmount.
- Geometry stays visible with reduced motion. Automatic accents stop under reduced motion, offscreen and while the document is hidden; deliberate rotation controls still work without animation.
- No WebGL/context dependency, new runtime package, remote 3D asset or continuous JavaScript animation loop. The existing hero atmosphere/canvas and glass palette remain.

## Verified results

- Initial keyboard/reset, geographic selection and cleanup regressions failed before replacement and passed after. Final strict production build and ESLint passed; **105 tests across 17 files** passed, including every scene variant and unique map gradient IDs.
- Chrome visited **32 canonical pages plus booking alias and 404 at 320/390/768/1440px: 136 checks**. Exactly one correct scene and working control set per hero; no horizontal overflow or browser page errors. Desktop hero screenshots and the route matrix were saved during the run.
- Real Chrome mouse, touch and keyboard tests passed: drag, bounded rotation, Home/reset, region selection, retained orientation, touch reset, native vertical touch scroll, offscreen stop and reduced-motion/static geometry.
- Existing 32-route/36-layout browser suite and cinematic/popup suite passed: logo strip, calculator arithmetic/validation, mocked submission failure, legacy links, crawler files, workflow stages, availability retry and popup focus. No live forms or bookings were submitted.
- The inherited glass browser script was aligned with the newer approved industry stack; its old carousel assertions no longer described the current repository.
- Independent code review reported no actionable findings. Representative final previews are in `docs/previews/hero-objects/`.

Build output remains subject to the repository's existing >500kB chunk advisory (565.05kB JS, 174.50kB gzip; baseline 564.33kB / 174.05kB). Route splitting, Safari/device-specific rendering and screen-reader testing are not asserted here. Pushing source does not itself verify deployment of the separately hosted domain.
