import type { Preflight } from '@unocss/core'

export const carouselPreflights: Preflight[] = [
  {
    getCSS: () => `.q-carousel {
  background-color: #fff;
  height: 400px;
}
.q-carousel__slide {
  min-height: 100%;
  background-size: cover;
  background-position: 50%;
}
.q-carousel__slide, .q-carousel .q-carousel--padding {
  padding: 16px;
}
.q-carousel__slides-container {
  height: 100%;
}
.q-carousel__control {
  color: #fff;
}
.q-carousel__arrow {
  pointer-events: none;
}
.q-carousel__arrow .q-icon {
  font-size: 28px;
}
.q-carousel__arrow .q-btn {
  pointer-events: all;
}
.q-carousel__prev-arrow--horizontal, .q-carousel__next-arrow--horizontal {
  top: 16px;
  bottom: 16px;
}
.q-carousel__prev-arrow--horizontal {
  left: 16px;
}
.q-carousel__next-arrow--horizontal {
  right: 16px;
}
.q-carousel__prev-arrow--vertical, .q-carousel__next-arrow--vertical {
  left: 16px;
  right: 16px;
}
.q-carousel__prev-arrow--vertical {
  top: 16px;
}
.q-carousel__next-arrow--vertical {
  bottom: 16px;
}
.q-carousel__navigation--top, .q-carousel__navigation--bottom {
  left: 16px;
  right: 16px;
  overflow-x: auto;
  overflow-y: hidden;
}
.q-carousel__navigation--top {
  top: 16px;
}
.q-carousel__navigation--bottom {
  bottom: 16px;
}
.q-carousel__navigation--left, .q-carousel__navigation--right {
  top: 16px;
  bottom: 16px;
  overflow-x: hidden;
  overflow-y: auto;
}
.q-carousel__navigation--left > .q-carousel__navigation-inner, .q-carousel__navigation--right > .q-carousel__navigation-inner {
  flex-direction: column;
}
.q-carousel__navigation--left {
  left: 16px;
}
.q-carousel__navigation--right {
  right: 16px;
}
.q-carousel__navigation-inner {
  flex: 1 1 auto;
}
.q-carousel__navigation .q-btn {
  margin: 6px 4px;
  padding: 5px;
}
.q-carousel__navigation-icon--inactive {
  opacity: 0.7;
}
.q-carousel .q-carousel__thumbnail {
  margin: 2px;
  height: 50px;
  width: auto;
  display: inline-block;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  vertical-align: middle;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.q-carousel .q-carousel__thumbnail:hover,
.q-carousel .q-carousel__thumbnail--active {
  opacity: 1;
}
.q-carousel .q-carousel__thumbnail--active {
  border-color: currentColor;
  cursor: default;
}
.q-carousel--navigation-top.q-carousel--with-padding .q-carousel__slide, .q-carousel--navigation-top .q-carousel--padding, .q-carousel--arrows-vertical.q-carousel--with-padding .q-carousel__slide, .q-carousel--arrows-vertical .q-carousel--padding {
  padding-top: 60px;
}
.q-carousel--navigation-bottom.q-carousel--with-padding .q-carousel__slide, .q-carousel--navigation-bottom .q-carousel--padding, .q-carousel--arrows-vertical.q-carousel--with-padding .q-carousel__slide, .q-carousel--arrows-vertical .q-carousel--padding {
  padding-bottom: 60px;
}
.q-carousel--navigation-left.q-carousel--with-padding .q-carousel__slide, .q-carousel--navigation-left .q-carousel--padding, .q-carousel--arrows-horizontal.q-carousel--with-padding .q-carousel__slide, .q-carousel--arrows-horizontal .q-carousel--padding {
  padding-left: 60px;
}
.q-carousel--navigation-right.q-carousel--with-padding .q-carousel__slide, .q-carousel--navigation-right .q-carousel--padding, .q-carousel--arrows-horizontal.q-carousel--with-padding .q-carousel__slide, .q-carousel--arrows-horizontal .q-carousel--padding {
  padding-right: 60px;
}
.q-carousel.fullscreen {
  height: 100%;
}
`
  }
]
