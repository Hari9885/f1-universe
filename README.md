# F1 UNIVERSE

A cinematic, single-page WebGL experience for the 2025 Formula 1 season — 24 races, 20 drivers, one championship. Built with vanilla JavaScript, Three.js, and GSAP; no build step.

## Features

- Rev-counter loading screen with animated RPM gauge
- Three.js hero scene with scroll-driven camera work
- GSAP ScrollTrigger section choreography (cars, drivers, circuits, telemetry)
- Film grain + scanline overlays for the broadcast look
- Fully static — a single `index.html` plus one CSS and one JS file

## Run

No install. Serve the folder (ES-module import maps need HTTP, not `file://`):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Stack

- [Three.js](https://threejs.org/) 0.162 (CDN import map)
- [GSAP](https://gsap.com/) 3.12 + ScrollTrigger (CDN)
- Fonts: Barlow Condensed, DM Mono, Inter

## License

MIT — see [LICENSE](LICENSE). Not affiliated with Formula 1; team and driver names are used as fan-made illustrative content.

Built with help of Claude.
