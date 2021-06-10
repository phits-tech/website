import { ComponentInternalInstance } from 'vue'
import { Vue } from 'vue-class-component'

import { Banner } from '@phits-tech/common/dist/dao-firestore'

import { Route } from '~/router/route-decorator'

class BannerElement {
  private readonly cssClassLeft = '-translate-x-full'
  private readonly cssClassCenter = 'translate-x-0'
  private readonly cssClassRight = 'translate-x-full'
  private readonly allClasses = [this.cssClassLeft, this.cssClassCenter, this.cssClassRight]

  constructor(private readonly element: Element) {}

  /**
   * Positive "shifts" move slides towards the left
   * => positive "side" is the left side
   */
  move(side: number): void {
    if (side > 0) this.moveToLeft()
    else if (side < 0) this.moveToRight()
    else this.moveToCenter()
  }

  moveToLeft(): void { this.setClass(this.cssClassLeft) }
  moveToCenter(): void { this.setClass(this.cssClassCenter) }
  moveToRight(): void { this.setClass(this.cssClassRight) }

  private setClass(cssClass: string): void {
    this.element.classList.remove(...this.allClasses)
    this.element.classList.add(cssClass)
  }
}

@Route({ path: '/' })
export default class Home extends Vue {
  private readonly ROTATION_INTERVAL = 5000
  private readonly PAUSE_AFTER_INTERACTION = 15_000

  bannerSlides: BannerElement[] = []
  currentSlideIndex = 0
  nextSlideInterval?: NodeJS.Timeout = undefined

  get banners(): Array<Omit<Banner, 'slug' >> { return this.$store.state.banners.sort((b1, b2) => (b2.priority - b1.priority) || (b1.dateExpire.seconds - b2.dateExpire.seconds)) }

  mounted(): void { this.resetSlideTimer() }
  beforeUpdate(): void { this.currentSlideIndex = 0; this.bannerSlides = [] }
  updated(): void { this.resetSlideTimer() }
  beforeUnmount(): void { this.stopSlideTimer() }

  registerBanner(el: Element | ComponentInternalInstance | null): void { if (el instanceof Element) this.bannerSlides.push(new BannerElement(el)) }

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
    const targetIndex = this.currentSlideIndex + shift
    const targetIndexCorrected = (targetIndex < 0) ? this.bannerSlides.length - 1 : ((targetIndex > this.bannerSlides.length - 1) ? 0 : targetIndex)
    if (targetIndex !== targetIndexCorrected) return this.jumpToSlide(targetIndexCorrected)

    // Shift once
    this.bannerSlides[this.currentSlideIndex].move(shift)
    this.bannerSlides[targetIndexCorrected].moveToCenter()
    this.currentSlideIndex = targetIndexCorrected
  }

  jumpToSlide(targetIndexCorrected: number): void {
    // slideIdx < current => wait on left
    // slideIdx == current => move to center
    // slideIdx > current => wait on right
    this.bannerSlides.forEach((slide, slideIdx) => slide.move(targetIndexCorrected - slideIdx))
    this.currentSlideIndex = targetIndexCorrected
  }

  async bannerClick(banner: Omit<Banner, 'slug' | 'dateExpire'>): Promise<unknown> {
    if (banner.targetEventSlug !== undefined) return await this.$router.push({ name: 'Event', params: { slug: banner.targetEventSlug } })
    if (banner.targetRoute !== undefined) return await this.$router.push({ name: banner.targetRoute })
    if (banner.targetUrl !== undefined) window.location.href = banner.targetUrl
    return await Promise.resolve()
  }
}
