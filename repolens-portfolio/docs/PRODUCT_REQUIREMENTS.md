# PRODUCT REQUIREMENTS DOCUMENT
## RepoLens AI Portfolio

---

## 1. Product Overview

An immersive AI-powered developer portfolio that combines premium interactive design with a conversational Portfolio Copilot. The site functions as a visually rich experience first, while exposing an intelligent terminal layer that represents the owner's engineering work.

---

## 2. Core User Experience Goals

- Visitor feels they are entering an experience, not viewing a resume
- Engineering depth is immediately signals through design choices
- Portfolio Copilot makes the site feel alive and interactive
- Every section feels handcrafted, not templated
- Mobile-first responsiveness (future phase)

---

## 3. Loading Screen

| Requirement | Detail |
|---|---|
| Trigger | Every time site loads |
| Style | Full dark screen, system boot feel |
| Progress | Circular progress animation to 100% |
| Messages | Sequential repo-themed boot messages |
| After 100% | START button appears |
| Mascot | Present from first frame of loading |
| Transition | START click → cinematic transition to hero |

**Boot Messages (in order):**
```
Initializing RepoLens AI...
Loading Portfolio...
Fetching Repository Data...
Building Knowledge Base...
Loading Projects...
Launching Portfolio Copilot...
Ready.
```

---

## 4. Navigation

| Element | Detail |
|---|---|
| Position | Top right, vertical stack |
| Items | ABOUT / WORK / RESUME / CONTACT |
| Hover | Same reaction as reference site |
| RESUME | Opens PDF in new tab |
| Behavior | Smooth scroll to section on click |

---

## 5. Hero Section

| Element | Detail |
|---|---|
| Name | Large, oversized, cinematic reveal after START |
| Style | Split-word bold typography same as reference |
| Tagline | "Building intelligent systems at the intersection of AI & Full Stack" |
| Terminal hint | Bottom left — blinking `>_ ask me anything` in green monospace |
| Terminal hint click | Opens terminal directly |
| Achievement strip | Below hero — NASA Space Apps Top 5 + Smart India Hackathon |

---

## 6. Social Icons

| Element | Detail |
|---|---|
| Position | Left side, vertical |
| Icons | GitHub, LinkedIn, Instagram (or as provided) |
| Behavior | Click → navigate to actual social site in new tab |
| Depth effect | Become translucent when 3D side element passes behind them |

---

## 7. About Section

| Element | Detail |
|---|---|
| Sub-sections | About Me / What I Do / Experience / History |
| Typography | Oversized bold, same as reference site |
| Scroll animation | Text highlights as user scrolls through |
| Cursor interaction | Text reacts to cursor proximity |
| Decorative element | Large orange circle overlapping text (same as reference) |
| Content | Placeholder — owner will provide final text |

---

## 8. Work Section

| Element | Detail |
|---|---|
| Layout | Left: project info / Right: stack cards |
| Cards | Draggable/swipeable deck |
| Card hover | Pixel/glitch transition → project text reveals |
| Tech badges | Visible on each card (pill style) |
| Left heading | VariableProximity component |
| Left description | TextType component |
| CTA button | "Ask RepoLens AI about my work" |
| Projects | OrbitAir, ORBIT-OPS + others from GitHub |

---

## 9. Terminal — Portfolio Copilot

| Element | Detail |
|---|---|
| Trigger | CTA button in work section OR blinking hint in hero |
| Opens | From center of screen (scale out animation) |
| Style | Black bg, green text, JetBrains Mono |
| Window | Floating, resizable from all sides, draggable |
| Controls | Top left: minimize + close |
| Minimize | Shrinks to small button on right side |
| Minimized click | Reopens terminal at same state |
| AI name | Portfolio Copilot |
| Prompt | `vaibhav@repolens:~$` |

**Supported Commands:**
```
help          — show all commands
about         — who is Vaibhav
projects      — list all projects
skills        — tech stack overview
experience    — work history
repos         — live GitHub repos
tech-stack    — detailed technology breakdown
ai-projects   — AI specific projects
ask [query]   — natural language question to Portfolio Copilot
clear         — clear terminal
```

---

## 10. Contact Section

| Element | Detail |
|---|---|
| Heading | CONNECT |
| Layout | Two column social links with arrow markers |
| Right side | Email + Phone |
| Social links | GitHub, LinkedIn, Instagram, (others as provided) |
| Bottom left icons | Same as left side social icons throughout site |
| Style | Exact same as reference site screenshot |

---

## 11. 3D Side Elements

| Element | Detail |
|---|---|
| Objects | Coffee cup + Mouse/cursor device |
| Position | Screen edges, partially cropped |
| Scroll behavior | Appear and move as user scrolls |
| Depth effect | Pass behind social icons → icons go translucent |
| Library | React Three Fiber or CSS 3D |

---

## 12. Achievement Strip

| Element | Detail |
|---|---|
| Position | Below hero section |
| Content | NASA Space Apps Challenge — Top 5 / Smart India Hackathon Participant |
| Style | Slim horizontal strip, subtle orange accents |
| Animation | Static or slow horizontal scroll ticker |

---

## 13. Resume

| Element | Detail |
|---|---|
| Nav button | RESUME (same style as other nav items) |
| Action | Opens PDF in new tab |
| Source | `VITE_RESUME_URL` in `.env` |

---

## 14. Environment Variables

```env
VITE_OPENROUTER_API_KEY=paste_your_key_here
VITE_RESUME_URL=paste_your_resume_pdf_link_here
VITE_GITHUB_USERNAME=Vaibhav20k
```

---

## 15. Performance Requirements

- First contentful paint < 2s
- Smooth 60fps animations
- No jank on scroll
- Lenis smooth scroll throughout
- Lazy load 3D elements
- Terminal AI responses streamed if possible
