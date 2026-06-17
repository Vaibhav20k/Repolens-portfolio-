# BRAND GUIDELINES
## RepoLens AI Portfolio — Vaibhav

---

## 1. Brand Identity

**Portfolio Name:** RepoLens AI Portfolio
**Owner:** Vaibhav
**Tagline:** Building intelligent systems at the intersection of AI & Full Stack
**GitHub:** https://github.com/Vaibhav20k
**Role:** B.Tech Computer Science Undergraduate | AI Engineer | Full Stack Developer

---

## 2. Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Primary background |
| `--color-bg-secondary` | `#111111` | Cards, elevated surfaces |
| `--color-accent` | `#E8472A` | Primary orange accent, CTAs, highlights |
| `--color-accent-hover` | `#FF5733` | Hover state for accent |
| `--color-text-primary` | `#F5F0E8` | Primary text (warm off-white) |
| `--color-text-secondary` | `#8A8474` | Secondary text, labels |
| `--color-text-muted` | `#3D3D3D` | Ghost text, disabled |
| `--color-terminal-bg` | `#000000` | Terminal background |
| `--color-terminal-text` | `#00FF41` | Terminal green text |
| `--color-cursor` | `#E8472A` | Custom cursor orb |

---

## 3. Typography

### Primary Font
- **Font:** Space Grotesk
- **Usage:** Headings, nav, labels, hero text
- **Weights:** 300, 400, 500, 700

### Secondary Font
- **Font:** Roboto Flex
- **Usage:** VariableProximity component (Work section only)
- **Weights:** Variable (100–1000)

### Terminal Font
- **Font:** JetBrains Mono / Courier New fallback
- **Usage:** Terminal window only
- **Weights:** 400

### Body Font
- **Font:** Inter
- **Usage:** Body text, descriptions, about section
- **Weights:** 300, 400

### Scale
| Token | Size | Usage |
|---|---|---|
| `--text-hero` | `clamp(4rem, 10vw, 9rem)` | Hero name |
| `--text-display` | `clamp(3rem, 7vw, 7rem)` | Section oversized text |
| `--text-heading` | `clamp(1.5rem, 3vw, 2.5rem)` | Section headings |
| `--text-body` | `1rem` | Body text |
| `--text-label` | `0.75rem` | Labels, nav, badges |
| `--text-terminal` | `0.875rem` | Terminal text |

---

## 4. Cursor Design

- **Style:** Custom orange glowing orb
- **Default size:** 12px diameter
- **Hover size:** 60px diameter (expands on text hover)
- **Color:** `#E8472A` with soft glow
- **Behavior:** Follows mouse with ~80ms smooth lag (lerp)
- **Text interaction:** Expands and partially blends with text on hover
- **Transition:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

---

## 5. Mascot

- **Design:** Same cat creature as reference site
- **Placement during loading:** Centered / prominent
- **Placement after START:** Top left corner (persistent)
- **Behavior:**
  - Continuous idle float animation
  - Random head turn intervals (every 3–7 seconds)
  - Random eye direction changes
  - Subtle breathing/scale pulse
  - Reacts to cursor proximity
- **Click behavior:** Navigates back to loading/start page
- **Orange dot:** Sits on mascot's head, glows softly

---

## 6. Motion & Animation Philosophy

- **Feel:** Cinematic, premium, intentional — never cheap
- **Easing:** `cubic-bezier(0.76, 0, 0.24, 1)` for most transitions
- **Scroll:** Lenis smooth scroll throughout
- **Page transitions:** Smooth, no hard cuts
- **Loading:** System boot feel — sequential, purposeful
- **Hover states:** Subtle, never jarring
- **Framer Motion:** Primary animation library
- **GSAP:** Scroll-triggered animations, complex sequences

---

## 7. 3D Side Elements

- **Objects:** Coffee cup (left/right edge) + Mouse/cursor device (opposite edge)
- **Placement:** Partially cropped at screen edges, visible as user scrolls
- **Depth effect:** Elements appear to pass behind social icons
- **Social icon reaction:** Become translucent when 3D element passes behind them
- **Rendering:** React Three Fiber / Three.js or high-quality CSS 3D

---

## 8. Section Label Style

- Uppercase, spaced tracking
- Small font size (`0.75rem`)
- Color: `--color-text-secondary`
- Example: `A B O U T   M E`

---

## 9. Card Design

- Background: `--color-bg-secondary`
- Border: `1px solid rgba(255,255,255,0.06)`
- Hover: Pixel/glitch transition effect
- Tech badges: Small pill style, bottom of card
- Badge colors: Muted dark bg + orange or white text

---

## 10. Terminal Brand

- **Name inside terminal:** Portfolio Copilot
- **Prompt style:** `vaibhav@repolens:~$`
- **Color:** Green `#00FF41` on black `#000000`
- **Font:** JetBrains Mono
- **Window controls:** Top left — minimize, close (macOS style but custom)
- **Minimized label:** Small button on right side replacing "SOUND ON" position
