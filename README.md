# Apple Select

Production React port of the **Apple Select** landing page, rebuilt
faithfully from `Apple Select (standalone).html`.

> Оригинальная техника — оригинальный подход.

## Stack

- **React 18** + **Vite 5**
- **Framer Motion** — hero entrance, scroll reveals, carousel slide
- **React Router v6** — single-route shell
- **Tailwind CSS 3** — tokens mapped in `tailwind.config.js`

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview
```

## Structure

```
src/
├── components/
│   ├── layout/      Navbar (glassmorphism on scroll), Footer
│   ├── sections/    Hero, ProductShowcase, AboutUs, Reviews, ContactInfo
│   └── ui/          Button, ProductCard, ReviewCard, StatCard
├── data/            content.js — all copy/products/reviews/stats (verbatim)
├── styles/          tokens.css — CSS variables from the source
├── App.jsx
└── main.jsx
```

## Fidelity notes

This is a faithful 1:1 port — text, colors, spacing and layout are
unchanged from the source HTML:

- **CSS** is ported verbatim into `src/index.css` (original class names)
  so the result is pixel-identical. Tailwind is configured with the same
  tokens for any future utility work.
- **Animations** are converted to Framer Motion as requested: the hero
  `heroRise` entrance → staggered variants; `.reveal` scroll effects →
  `whileInView` `fadeInUp`; the carousel `translateX` track → `useState`
  + `motion` `animate={{ x }}` (same easing), with dots, prev/next
  (disabled at ends) and touch-swipe preserved.
- Font **Manrope** is loaded from Google Fonts (the source bundled the
  same family).
- Telegram / contact `href`s are kept exactly as in the source (`#`).

## Design tokens

| Token | Value |
|-------|-------|
| --black | `#0a0a0a` |
| --ink | `#1d1d1f` |
| --paper | `#fbfbfd` |
| --card | `#f5f5f7` |
| --muted | `#86868b` |
| --blue | `#007aff` |
| --radius-card | `24px` |
| --radius-img | `20px` |
| --pill | `50px` |

Responsive at 1440 / 768 / 375. Respects `prefers-reduced-motion`.
