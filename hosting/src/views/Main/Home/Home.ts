import { Vue } from 'vue-class-component'

interface Banner { src: string }

export default class Home extends Vue {
  get banners(): Banner[] {
    return [
      { src: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec' },
      { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998' },
      { src: 'https://images.unsplash.com/photo-1507361617237-221d9f2c84f7' },
      { src: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06' }
    ]
  }

  mounted(): void {
    setInterval(this.nextSlide, 3000)
  }

  nextSlide(): void {
    const activeSlide = document.querySelector('.slide.translate-x-0')
    if (activeSlide === null) return
    activeSlide.classList.remove('translate-x-0')
    activeSlide.classList.add('-translate-x-full')

    const nextSlide = activeSlide.nextElementSibling
    nextSlide?.classList.remove('translate-x-full')
    nextSlide?.classList.add('translate-x-0')
  }

  previousSlide(): void {
    const activeSlide = document.querySelector('.slide.translate-x-0')
    activeSlide?.classList.remove('translate-x-0')
    activeSlide?.classList.add('translate-x-full')

    const previousSlide = activeSlide?.previousElementSibling
    previousSlide?.classList.remove('-translate-x-full')
    previousSlide?.classList.add('translate-x-0')
  }
}
