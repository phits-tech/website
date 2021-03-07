import dayjs from 'dayjs'
import { Vue } from 'vue-class-component'

interface Banner { src: string }
interface Event { name: string, time: string, location: string }
interface DayAndEvent { date: Date, event: Event | undefined }

export default class Home extends Vue {
  get banners(): Banner[] {
    return [
      { src: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec' },
      { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998' },
      { src: 'https://images.unsplash.com/photo-1507361617237-221d9f2c84f7' },
      { src: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06' }
    ]
  }

  get sevenDaysAhead(): DayAndEvent[] {
    return [
      { date: dayjs().toDate(), event: undefined },
      { date: dayjs().add(1, 'day').toDate(), event: { name: 'Mobile Mondays', time: '19:00-21:00', location: 'The Sandbox' } },
      { date: dayjs().add(2, 'day').toDate(), event: undefined },
      { date: dayjs().add(3, 'day').toDate(), event: { name: 'Web Wednesdays', time: '18:00-19:00', location: 'The Sandbox' } },
      { date: dayjs().add(4, 'day').toDate(), event: undefined },
      { date: dayjs().add(5, 'day').toDate(), event: undefined },
      { date: dayjs().add(6, 'day').toDate(), event: undefined }
    ]
  }

  mounted(): void {
    setInterval(this.nextSlide, 3000)
  }

  nextSlide(): void {
    const activeSlide = document.querySelector('.slide.translate-x-0')
    if (activeSlide === null) return
    let nextSlide = activeSlide.nextElementSibling
    if (nextSlide === null || !nextSlide.classList.contains('slide')) {
      console.log('here')
      nextSlide = activeSlide.parentElement?.querySelector('.slide') ?? null
      if (nextSlide === null) return
      activeSlide.classList.remove('translate-x-0')
      activeSlide.classList.add('translate-x-full')
      nextSlide.classList.remove('-translate-x-full')
      nextSlide.classList.add('translate-x-0')
      const otherSlides = document.querySelectorAll('.slide.-translate-x-full')
      otherSlides.forEach(element => {
        element.classList.remove('-translate-x-full')
        element.classList.add('translate-x-full')
      })
    } else {
      activeSlide.classList.remove('translate-x-0')
      activeSlide.classList.add('-translate-x-full')
      nextSlide.classList.remove('translate-x-full')
      nextSlide.classList.add('translate-x-0')
    }
  }

  previousSlide(): void {
    const activeSlide = document.querySelector('.slide.translate-x-0')
    const previousSlide = activeSlide?.previousElementSibling
    if (activeSlide === null || previousSlide === null || previousSlide === undefined) return
    activeSlide.classList.remove('translate-x-0')
    activeSlide.classList.add('translate-x-full')
    previousSlide.classList.remove('-translate-x-full')
    previousSlide.classList.add('translate-x-0')
  }
}
