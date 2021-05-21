import { DeepRequired } from 'ts-essentials'

export type DeepRequiredWithId<T> = { id: string } & DeepRequired<T>

export const prop = <T>(name: keyof T & string): keyof T & string => name

// TODO: Work out if this is covariant or contravariant; document why; perhaps offer opposite
export type FilterKeys<Base, PropType> = {
  [Key in keyof Base]-?: PropType extends Base[Key] ? Key : never
}[keyof Base]

export type FilterProps<Base, PropType> = Pick<Base, FilterKeys<Base, PropType>>
