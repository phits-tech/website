import type firebase from 'firebase/app'
type Timestamp = firebase.firestore.Timestamp

// TODO: Make a decision on slugs: store as field | store as id | store as both

/**
 * Types of property
 *   readonly  = managed by the DAO (calculated or set in conjunction with other fields)
 *   ?:        = optional during creation (default value used if not provided)
 *   other     = must be explicitly set at creation
 *
 * Note: all properties are optional during update (readonly are still managed by DAO)
 */

export type EventRole = 'attendee' | 'contributor'

export interface EventLog {
  eventSlug: string
  eventName: string
  eventBanner169Url: string
  eventDate: Timestamp
  eventRole: EventRole
  ccus: number
}

// ID = GUID (from Auth)
export interface User {
  // TODO: Write real type
  readonly name: string
  slug?: string
  nameFirst: string
  nameLast?: string
  pic?: string
  tagline?: string
  description?: string
  skills?: string[]
  hasContributed?: boolean
  lccus?: number // calculate active CCUs on the client
  events?: EventLog[]
  profileGitHubId?: string
  profileGitLabId?: string
  profileStackExchangeId?: string
  profileTwitterId?: string
  profileFacebookId?: string
  profileLineId?: string
  profilePublicEmail?: string
  website?: string
}

// ID = GUID (from Auth)
export interface UserPrivate {
  // TODO: Write real type
  email?: string
  emails?: string[]
  tokenNuConnect?: unknown
  // tokenGitHub?: unknown
  // tokenGitLab?: unknown
  // tokenStackExchange?: unknown
  // tokenTwitter?: unknown
  // tokenFacebook?: unknown
  // tokenLine?: unknown
}

// TODO: Maybe rename type to avoid clash with a built-in type
export interface Event {
  slug: string
  name: string
  description: string
  bannerUrl?: string
  dateStart: Timestamp
  dateEnd: Timestamp
  location: string
  series?: string
  seriesType?: string
  badges?: string[]
  hostId?: string
  hostName?: string
  registrationRequired?: boolean
  registrationUrl?: string // custom registration form
}

export type SpaceCategory = 'community' | 'coworking' | 'cafe' | 'online'

export interface Space {
  slug: string
  name: string
  logo: string
  banner: string
  description: string
  category: SpaceCategory
  locationText: string
  locationLatitude?: number
  locationLongitude?: number
}
