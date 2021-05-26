import { Vue } from 'vue-class-component'
import { Ref } from 'vue-property-decorator'

export default class NavBar extends Vue {
  @Ref('mobileMenu') readonly mobileMenu!: HTMLElement
  @Ref('menuOpenIcon') readonly menuOpenIcon!: HTMLElement
  @Ref('menuClosedIcon') readonly menuClosedIcon!: HTMLElement

  toggleCollapse(): void {
    if (this.mobileMenu.classList.contains('hidden')) {
      this.mobileMenu.classList.replace('hidden', 'block')
      this.menuOpenIcon.classList.replace('hidden', 'block')
      this.menuClosedIcon.classList.replace('block', 'hidden')
    } else {
      this.mobileMenu.classList.replace('block', 'hidden')
      this.menuOpenIcon.classList.replace('block', 'hidden')
      this.menuClosedIcon.classList.replace('hidden', 'block')
    }
  }

  toggleLocale(): void {
    const otherLocales = this.$i18n.availableLocales.filter(l => l !== this.$i18n.locale)
    if (otherLocales.length > 0) this.$i18n.locale = otherLocales[0]
  }
}
