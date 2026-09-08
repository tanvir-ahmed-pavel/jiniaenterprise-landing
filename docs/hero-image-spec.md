# Hero cutout spec — Jinia depth stage

The hero renders each vehicle as a free-floating object with the headline
passing *behind* it. That only works with a real alpha channel. A white-plate
JPEG re-introduces the box the layout exists to remove.

## Hard requirements (every image)

| Property | Value |
|---|---|
| Format | PNG with alpha, or flat-key source (see below) |
| Width | 2400 px minimum (renders up to 1040 CSS px at 2×) |
| Aspect | ~24:10 landscape |
| Background | Fully transparent. **No floor, no reflection, no cast shadow.** |
| Framing | Subject spans the full canvas width, edge to edge |
| Baseline | Tyres touch the bottom edge of the canvas — no gap, no crop |
| Camera | Eye level, ~1.2 m off the ground. Not a low hero angle. |
| Lighting | Soft, even, key from front-left. Same across all six. |
| Plates | Blank number plates. No text, no watermark, no badges. |

The site draws its own contact shadow under every vehicle, which is why the
photographic one must be absent — two shadows read as a paste-up.

## If the generator cannot output transparency

Do **not** render on white. A white studio plate cannot be keyed off a white or
silver vehicle: the fill leaks through the bodywork. Render on flat
**`#FF00FF` magenta** instead, with no shadow and no reflection. That colour
appears nowhere on a car, so keying is exact for every paint colour. Send those
files over and they can be keyed and dropped in.

## Per-scene prompts

**1 — Toyota Alphard (the flagship)**
> Studio product photograph of a pearl-white Toyota Alphard luxury MPV, front
> three-quarter view facing left, eye-level camera at 1.2 m, soft even lighting
> keyed from the front-left, blank number plate, isolated on a fully transparent
> background with no ground shadow and no floor reflection, the vehicle floating
> free, full vehicle in frame spanning the full width, wheels touching the
> bottom edge, ultra sharp, commercial automotive photography, 2400px wide

**2 — Toyota Harrier (executive SUV)**
> Same treatment, graphite-grey Toyota Harrier crossover SUV, front
> three-quarter view facing left.

**3 — Land Cruiser Prado (the handoff)**
> Side view of a graphite Toyota Land Cruiser Prado with the rear door open, a
> uniformed chauffeur in a black suit and white gloves holding the door, a male
> passenger in a navy suit stepping out. Eye-level camera, soft even lighting
> from the front-left, blank plate, fully transparent background, no ground
> shadow, no floor reflection, figures and vehicle floating free, everything in
> frame, feet and tyres on the bottom edge.

**4 — Airport arrival (meet & greet)**
> Side view of a black executive SUV with the rear door open, a chauffeur in a
> black suit greeting an arriving passenger in a light grey blazer who is
> pulling a carry-on suitcase. Same lighting, framing and transparency rules.

**5 — Daily chauffeur**
> Side view of a silver executive sedan with the rear door open, a chauffeur in
> a black suit holding the door for a businesswoman in a cream trouser suit.
> Same lighting, framing and transparency rules.

**6 — Delegation convoy**
> Two black executive SUVs parked in echelon, two chauffeurs in dark uniforms
> standing between them at attention. Same lighting, framing and transparency
> rules. Wider composition — both vehicles fully in frame.

## Consistency notes

The six read as a set only if the camera height, the key-light direction and
the vehicle size in frame stay fixed. If the generator drifts, regenerate
rather than correcting in post — the hero crossfades between them in place, so
any mismatch in scale or eye level shows up as a jump.
