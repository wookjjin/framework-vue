import type { Component } from "vue"

interface ITabItem {
  title: string | number
  id: string
  content: Component | string
}

export interface ITabProps {
  tabItems: ITabItem[]
  defaultActiveId: string
}

export interface ITabPanelProps {
  id: string
}
