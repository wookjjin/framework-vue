export const TabsSymbol = Symbol('tabs')

export interface TabsInjection {
  activeTabId: { value: string }
  activateTab: (id: string) => void
}
