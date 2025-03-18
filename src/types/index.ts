import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void | Promise<void>

export * from './components/tab/tabProps';
export * from './components/tab/tabSymbol'
