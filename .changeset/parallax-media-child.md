---
'unocss-preset-quasar': patch
---

QParallax renders again: the media child gets the block the reference states.

`components/parallax/rules.ts` yielded a third child, `q-parallax__image`, with a
comment where the declarations should be. Quasar never renders that class — the
markup is `.q-parallax__media > img|video` — so the block came out empty, was
dropped, and the image kept the UA's `position: static`.

That is fatal for this component rather than merely off-spec: QParallax drives the
image from script, writing `transform: translate3d(-50%, <y>px, 0)` on load. The
reference pairs that transform with

```css
.q-parallax__media > img, .q-parallax__media > video {
  position: absolute;
  left: 50%;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  will-change: transform;
  display: none;
}
```

Without it the translate moved an in-flow 1024×845 image 425px below the top of a
200px `overflow: hidden` box, and the component came out an empty white panel in all
three styles — the flattest capture of the 219-dump visual pass, with **0** non-white
pixels. The CDN image loaded fine all along; nothing was wrong but the rule.

The rule now states that block (`display: none` is the reference's own — the
component flips the image to `initial` when it is ready, which a live probe reads
back as `display: block`). Measured after the change: `position: absolute`,
`left: 200px` (50% of the 400px box), `bottom: 0`, natural 1024×845 spanning
-220…625 against the 200px box — bottom-aligned and covering — with 79,593 non-white
pixels where there were none.

Covered by the new `test/parallax.test.ts`, which also pins that
`q-parallax__image` is never targeted again.
