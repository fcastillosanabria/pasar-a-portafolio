import { AfterViewInit, Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.css']
})
export class CustomCursorComponent implements AfterViewInit {
  private outerCursor!: HTMLElement;
  private customCursor!: HTMLElement;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    this.outerCursor = this.el.nativeElement.querySelector('#outer-cursor');
    this.customCursor = this.el.nativeElement.querySelector('#custom-cursor');

    // Aplicar comportamiento a enlaces y botones
    const clickableElements = document.querySelectorAll('a, button');
    clickableElements.forEach(elem => {
      this.renderer.addClass(this.customCursor, 'pulse-active');

      elem.addEventListener('mouseenter', () => {
        this.setCursorColor('red', true);
      });

      elem.addEventListener('mouseleave', () => {
        this.setCursorColor('orange', false);
      });
    });
  }

  // Detectar movimiento del mouse
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;

    this.renderer.setStyle(this.outerCursor, 'left', `${clientX - 25}px`);
    this.renderer.setStyle(this.outerCursor, 'top', `${clientY - 25}px`);

    this.renderer.setStyle(this.customCursor, 'left', `${clientX - 12}px`);
    this.renderer.setStyle(this.customCursor, 'top', `${clientY - 12}px`);
  }

  private setCursorColor(color: string, active: boolean) {
    this.outerCursor.style.setProperty('--cursor-color', color);
    this.customCursor.style.setProperty('--cursor-color', color);

    if (active) {
      this.renderer.addClass(this.outerCursor, 'pulse-active');
      this.renderer.addClass(this.customCursor, 'pulse-active');
    } else {
      this.renderer.removeClass(this.outerCursor, 'pulse-active');
      this.renderer.removeClass(this.customCursor, 'pulse-active');
    }
  }
}
