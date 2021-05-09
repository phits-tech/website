import { Vue } from 'vue-class-component'

import { Banner } from '@phits-tech/common/dist/dao-firestore'

import { Route } from '~/router/route-decorator'

const classLeft = '-translate-x-full'
const classCenter = 'translate-x-0'
const classRight = 'translate-x-full'
const allClasses = [classLeft, classCenter, classRight]

class BannerElement {
  constructor(private readonly element: Element) { }

  /**
   * Positive "shifts" move slides towards the left
   * => positive "side" is the left side
   */
  move(side: number): void {
    if (side > 0) this.moveToLeft()
    else if (side < 0) this.moveToRight()
    else this.moveToCenter()
  }

  moveToLeft(): void { this.setClass(classLeft) }
  moveToCenter(): void { this.setClass(classCenter) }
  moveToRight(): void { this.setClass(classRight) }

  private setClass(className: string): void {
    this.element.classList.remove(...allClasses)
    this.element.classList.add(className)
  }
}

const ROTATION_INTERVAL = 5000
const PAUSE_AFTER_INTERACTION = 15000

@Route({ path: '/' })
export default class Home extends Vue {
  bannerSlides: BannerElement[] = []
  currentSlideIndex = 0
  nextSlideInterval: NodeJS.Timeout | null = null

  get banners(): Array<Omit<Banner, 'dateExpire'>> { return this.$store.state.banners }

  mounted(): void { this.resetSlideTimer() }
  beforeUpdate(): void { this.currentSlideIndex = 0; this.bannerSlides = [] }
  updated(): void { this.resetSlideTimer() }
  beforeUnmount(): void { this.stopSlideTimer() }

  registerBanner(el: Element): void { this.bannerSlides.push(new BannerElement(el)) }

  stopSlideTimer(): void {
    if (this.nextSlideInterval) clearInterval(this.nextSlideInterval)
  }

  resetSlideTimer(): void {
    this.stopSlideTimer()
    if (this.bannerSlides.length > 1) this.nextSlideInterval = setInterval(this.nextSlide, ROTATION_INTERVAL)
  }

  resetSlideTimerAfterPause(): void {
    this.stopSlideTimer()
    setTimeout(this.resetSlideTimer, PAUSE_AFTER_INTERACTION - ROTATION_INTERVAL)
  }

  nextSlide(): void { this.shiftSlide(1) }
  previousSlide(): void { this.shiftSlide(-1) }

  shiftSlide(shift: -1 | 1): void {
    if (this.bannerSlides.length < 2) return

    // Detect wrap-around
    const newIndex = this.currentSlideIndex + shift
    const newIndexCorrected = (newIndex < 0) ? this.bannerSlides.length - 1 : (newIndex > this.bannerSlides.length - 1) ? 0 : newIndex
    if (newIndex !== newIndexCorrected) return this.jumpToSlide(newIndexCorrected)

    // Shift once
    this.bannerSlides[this.currentSlideIndex].move(shift)
    this.bannerSlides[newIndexCorrected].moveToCenter()
    this.currentSlideIndex = newIndexCorrected
  }

  jumpToSlide(newIndexCorrected: number): void {
    // slideIdx < current => wait on left
    // slideIdx == current => move to center
    // slideIdx > current => wait on right
    this.bannerSlides.forEach((slide, slideIdx) => slide.move(newIndexCorrected - slideIdx))
    this.currentSlideIndex = newIndexCorrected
  }

  async bannerClick(banner: Banner): Promise<unknown> {
    if (banner.targetEventSlug !== undefined) return await this.$router.push({ name: 'Event', params: { slug: banner.targetEventSlug } })
    if (banner.targetRoute !== undefined) return await this.$router.push({ name: banner.targetRoute })
    if (banner.targetUrl !== undefined) window.location.href = banner.targetUrl
  }
}
