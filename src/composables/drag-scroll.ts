// 드래그 스크롤 상태 관리 (클래스로 분리)
export class DragScroll {
  private isDragging = false
  private startX = 0
  private scrollLeft = 0
  private element: HTMLElement | null = null

  constructor(element: HTMLElement | null) {
    this.element = element
  }

  onPointerDown(event: PointerEvent) {
    if (!this.element) return

    this.isDragging = true
    this.startX = event.pageX - this.element.offsetLeft
    this.scrollLeft = this.element.scrollLeft
    this.element.style.cursor = 'grabbing'
  }

  onPointerMove(event: PointerEvent) {
    if (!this.isDragging || !this.element) return

    const x = event.pageX - this.element.offsetLeft
    const walk = (x - this.startX) * 1.5 // 드래그 이동량 조정
    this.element.scrollLeft = this.scrollLeft - walk
  }

  onPointerUp() {
    this.isDragging = false
    if (this.element) {
      this.element.style.cursor = 'grab'
    }
  }
}