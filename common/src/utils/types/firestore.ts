import firebase from 'firebase/app'
import admin from 'firebase-admin'
import { OptionalKeys, Primitive, WritableKeys } from 'ts-essentials'

type FieldValue = firebase.firestore.FieldValue
type FieldValueAdmin = admin.firestore.FieldValue
type Timestamp = firebase.firestore.Timestamp

type NewBase<T> = {
  [P in keyof T]: T[P] extends Timestamp ? Timestamp | FieldValue | FieldValueAdmin
    : T[P] extends Array<infer U> | undefined ? Array<NewBase<U>>
      : T[P] extends Primitive | undefined ? T[P]
        : NewBase<T[P]>
}

export type Defaults<T> = Required<Pick<NewBase<T>, OptionalKeys<T>>>
export type Calculated<T> = Required<Pick<NewBase<T>, Exclude<Exclude<keyof T, WritableKeys<T>>, OptionalKeys<T>>>>
export type New<T> = Pick<NewBase<T>, WritableKeys<T>>
export type NewWithDefaults<T> = Defaults<T> & New<T>
export type NewComplete<T> = Defaults<T> & New<T> & Calculated<T>

type UpdateBase<T> = {
  [P in keyof T]: T[P] extends Timestamp | undefined ? Timestamp | FieldValue | FieldValueAdmin
    : T[P] extends Array<infer U> | undefined ? Array<UpdateBase<U>> | FieldValue | FieldValueAdmin
      : T[P] extends number ? number | undefined | FieldValue | FieldValueAdmin
        : T[P] extends Primitive | undefined ? T[P]
          :UpdateBase<T[P]>
}

export type Update<T> = Partial<Pick<UpdateBase<T>, WritableKeys<T>>>
export type UpdateComplete<T> = Partial<UpdateBase<T>>
