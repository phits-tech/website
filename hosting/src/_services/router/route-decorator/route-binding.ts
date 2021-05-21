import { Component } from '@vue/runtime-core'
import { RouteLocationNormalized, RouteRecordRaw, RouteRecordRedirectOption } from 'vue-router'

// Should work but doesn't...
// export type RouteBinding = Omit<RouteRecordRaw, 'component'> & { priority?: number }

interface BindingPriority { priority?: number }

// Recreate vue-router types that can be descriminated
type Lazy<T> = () => Promise<T>
type RawRouteComponent = Component | Lazy<Component>
type RouteRecordProps = boolean | Record<string, unknown> | ((to: RouteLocationNormalized) => Record<string, unknown>)

type BindingBase = Omit<RouteRecordRaw, 'redirect' | 'component' | 'components'>
type BindingRedirect = BindingBase & BindingPriority & { redirect: RouteRecordRedirectOption }
type BindingSingle = BindingBase & BindingPriority & { props?: RouteRecordProps } // component is injected by decorator
type BindingMulti = BindingBase & BindingPriority & { components: Record<string, RawRouteComponent>, props?: Record<string, RouteRecordProps> | boolean }

export type RouteBinding = BindingRedirect | BindingSingle | BindingMulti
