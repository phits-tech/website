import { Vue } from 'vue-class-component'

import type { Banner } from '@phits-tech/common/dao-firestore'

import { Route } from '~/router/route-decorator'

class BannerElement {
  private readonly classLeft = '-translate-x-full'
  private readonly classCenter = 'translate-x-0'
  private readonly classRight = 'translate-x-full'
  private readonly allClasses = [this.classLeft, this.classCenter, this.classRight]

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

  moveToLeft(): void { this.setClass(this.classLeft) }
  moveToCenter(): void { this.setClass(this.classCenter) }
  moveToRight(): void { this.setClass(this.classRight) }

  private setClass(className: string): void {
    this.element.classList.remove(...this.allClasses)
    this.element.classList.add(className)
  }
}

@Route({ path: '/' })
export default class Home extends Vue {
  private readonly ROTATION_INTERVAL = 5000
  private readonly PAUSE_AFTER_INTERACTION = 15000

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
    if (this.bannerSlides.length > 1) this.nextSlideInterval = setInterval(this.nextSlide, this.ROTATION_INTERVAL)
  }

  resetSlideTimerAfterPause(): void {
    this.stopSlideTimer()
    setTimeout(this.resetSlideTimer, this.PAUSE_AFTER_INTERACTION - this.ROTATION_INTERVAL)
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
