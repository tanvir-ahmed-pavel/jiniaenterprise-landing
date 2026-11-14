# Jinia homepage: image prompt pack

Run these in your image tool (Midjourney v7, ChatGPT / gpt-image, Imagen 4, Flux). Save each file under the **exact filename** shown, as PNG at the size given, into:

```
public/images/v3/
├── vehicles/   ← section A
├── people/     ← section B
└── hero/       ← section C
```

I'll convert to WebP, wire them in, and rebuild the hero around section C.

---

## Shared art direction (paste at the end of every prompt)

> Premium automotive catalogue photograph. Seamless pure white studio (#FFFFFF), no visible floor line or horizon. Soft, even, high-key lighting from a large overhead softbox, gentle fill from both sides. One soft, realistic contact shadow directly under the tyres only, no mirror reflection on the floor. Shot on a full-frame camera, 85 mm lens, camera at 1 m height, f/8, everything tack sharp. Neutral, true-to-life colour. Clean, freshly detailed car. **Blank number plates with no characters. No text, no watermarks, no dealer stickers.** Photorealistic, not CGI, not illustration.

**Negative prompt** (for tools that take one):

> text, letters, numbers on plate, watermark, logo overlay, reflection on floor, glossy floor, grey background, gradient background, horizon line, vignette, motion blur, people (unless asked), extra wheels, warped badges, distorted grille, cartoon, render, CGI look

**Consistency rules (they keep the grid looking like one shoot):**
- Every car **faces left**.
- Car fills **80% of the frame width**, centred, with **12% empty white space below the tyres**.
- Same lighting, lens and camera height for every vehicle.
- If a tool drifts, generate one car, then use it as the style reference for the rest (Midjourney `--sref`, ChatGPT "match this image's lighting and framing").

---

## A. Vehicles (32 images, plus 2 optional)

**Size:** 2400 × 1600 px (3:2). Two angles per model:

- **`-side.png`**: *exact side profile, car facing left, wheels level, all four doors closed.*
- **`-front.png`**: *front three-quarter view from the driver's-side front corner, car angled facing left, front wheels turned slightly toward camera.*

**Template:** `[MODEL LINE] [ANGLE LINE] [SHARED ART DIRECTION]`

| # | Filename base | Model line (paste as the start of the prompt) |
|---|---|---|
| 1 | `toyota-f-premio-2012-15` | A champagne-silver Toyota Premio T260 sedan (2012–2015 model), Japanese-market executive sedan. |
| 2 | `toyota-allion-2012-15` | A pearl-white Toyota Allion T260 sedan (2012–2015 model). |
| 3 | `toyota-axio-2012-15` | A pearl-white Toyota Corolla Axio E160 sedan (2012–2015 model). |
| 4 | `toyota-corolla-2001-06` | A light gold-beige Toyota Corolla E120 sedan (2001–2006 model), immaculate condition. |
| 5 | `toyota-corolla-cross` | A pearl-white Toyota Corolla Cross compact SUV (2021 model). |
| 6 | `toyota-x-noah-2012-14` | A pearl-white Toyota Noah R70 minivan (2012–2014 model) with sliding rear doors. |
| 7 | `toyota-x-noah-2015-18` | A pearl-white Toyota Noah R80 minivan (2015–2018 model) with sliding rear doors. |
| 8 | `toyota-alphard-2017-19` | A pearl-white Toyota Alphard AH30 facelift luxury MPV (2018 model), large chrome grille. |
| 9 | `nissan-x-trail-2017` | A pearl-white Nissan X-Trail T32 SUV (2017 model). |
| 10 | `toyota-land-cruiser-prado-2012-15` | A pearl-white Toyota Land Cruiser Prado J150 SUV (2013 model), roof rails. |
| 11 | `toyota-land-cruiser-prado-2016-20` | A pearl-white Toyota Land Cruiser Prado J150 facelift SUV (2018 model), vertical-bar chrome grille, roof rails. |
| 12 | `hilux-double-cabin-2016` | A silver Toyota Hilux AN120 double-cab pickup (2016 model), empty clean load bed. |
| 13 | `hyundai-h1-2017-18` | A white Hyundai H-1 (Grand Starex) 12-seat van, pre-facelift (2017 model). |
| 14 | `hyundai-h1-2019-20` | A silver Hyundai H-1 (Grand Starex) 12-seat van, facelift with wide grille (2019 model). |
| 15 | `toyota-hiace-2012-15` | A white Toyota HiAce H200 high-roof commuter van (2013 model). |
| 16 | `nissan-civilian-29-seater` | A white Nissan Civilian W41 29-seat minibus coach with a thin grey side stripe. |
| — | `mercedes-executive-2020-22` *(optional)* | An obsidian-black Mercedes-Benz E-Class W213 facelift sedan (2021 model). |
| — | `bmw-executive-2017-20` *(optional)* | A mineral-grey BMW 5 Series G30 sedan (2019 model). |

**Worked example** (row 11, side view):

> A pearl-white Toyota Land Cruiser Prado J150 facelift SUV (2018 model), vertical-bar chrome grille, roof rails. Exact side profile, car facing left, wheels level, all four doors closed. Premium automotive catalogue photograph. Seamless pure white studio (#FFFFFF)… *(rest of the shared block)*

Midjourney suffix: `--ar 3:2 --style raw --v 7`

---

## B. People and service scenes (5 images)

**Size:** 2400 × 1600 px (3:2), same white studio. These appear on the five service cards and must match the vehicle shots.

**People rules:**
- Bangladeshi chauffeurs, aged 30–45, well-groomed.
- Charcoal or navy two-piece suit, white shirt, plain dark tie, black polished shoes.
- No badges, no logos, no caps.
- Passengers are mixed (Bangladeshi and international), dressed in business attire.
- Natural, candid posture, not looking at the camera.
- Full body, feet visible, standing on the white floor with soft contact shadows.

| Filename | Prompt (then add the shared art direction) |
|---|---|
| `people/airport.png` | A Bangladeshi chauffeur in a charcoal suit loads a hard-shell suitcase into the open boot of a pearl-white Toyota Land Cruiser Prado (2018). A business traveller in a navy blazer stands beside him holding a passport and phone. Car seen from the rear three-quarter, facing left. |
| `people/executive.png` | A Bangladeshi chauffeur in a navy suit holds open the rear door of a pearl-white Toyota Alphard (2018) for a professional woman in a tailored grey suit carrying a slim laptop bag. Front three-quarter view, car facing left. |
| `people/delegation.png` | Three identical pearl-white Toyota Land Cruiser Prado (2018) SUVs parked nose to tail in a straight line, angled facing left. A chauffeur in a charcoal suit stands at attention beside each car's driver door. Calm, orderly, protocol feel. |
| `people/monthly.png` | A Bangladeshi chauffeur in a navy suit stands beside a pearl-white Toyota Noah (2017), sliding door open, greeting a family: a father in a shirt, a mother in a modest salwar kameez, a school-age child with a backpack. Side three-quarter, car facing left. |
| `people/outstation.png` | A pearl-white Toyota Land Cruiser Prado (2018) with two soft weekend bags beside the open boot, and a chauffeur in a charcoal suit checking a printed itinerary. Rear three-quarter, car facing left, relaxed travel feel. |

---

## C. Hero (2 images)

The hero becomes a large photograph beside the trip planner, replacing the drawn "drive preview" scene.

| Filename | Size | Prompt |
|---|---|---|
| `hero/hero-desktop.png` | 2000 × 2400 px (5:6 portrait) | Portrait-format premium automotive photograph on a seamless pure white studio. A Bangladeshi chauffeur in a perfectly fitted charcoal suit and white shirt holds open the rear door of a pearl-white Toyota Land Cruiser Prado (2018), seen front three-quarter, car facing left, filling the lower two-thirds of the frame. He looks toward the open door, with a calm, attentive posture and white gloves. Generous empty white space in the top third. Soft high-key light, single soft contact shadow, no floor reflection, blank number plate, no text, photorealistic, 85 mm, f/8. |
| `hero/hero-mobile.png` | 1600 × 1200 px (4:3 landscape) | Same scene and styling as `hero-desktop`, landscape crop. Car and chauffeur centred, filling 85% of the width, empty white space above. |

Generate `hero-desktop` first, then use it as the style reference for `hero-mobile` so they match.

---

## D. Social share image (optional, 1 image)

| Filename | Size | Prompt |
|---|---|---|
| `hero/og.png` | 1200 × 630 px | Wide premium studio photograph on pure white: three cars side by side, facing left, evenly spaced: a champagne-silver Toyota Premio sedan, a pearl-white Toyota Alphard, and a pearl-white Toyota Land Cruiser Prado. Single soft contact shadows, no reflections, blank plates, no text, empty white space at left for a headline. |

---

## Quality checklist before you send them over

- [ ] Background is pure white: the corner pixels read #FFFFFF, or within 2–3 values of it.
- [ ] Every car faces left; side views are true side-on.
- [ ] Plates are blank, with no text anywhere.
- [ ] No floor reflection, only a soft shadow under the tyres.
- [ ] Badges and grilles aren't warped (zoom in on the front shots).
- [ ] People's hands and faces look natural (regenerate any with odd fingers).
- [ ] Filenames match the tables exactly.

Drop the folder in and tell me. I'll optimise the files, wire every slot, and rebuild the hero layout around `hero-desktop` / `hero-mobile`.
