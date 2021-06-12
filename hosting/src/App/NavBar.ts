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

  get otherLocale(): string {
    return this.$i18n.availableLocales.find(l => l !== this.$i18n.locale) ?? this.$i18n.locale
  }

  toggleLocale(): void {
    this.$i18n.locale = this.otherLocale
  }
}
