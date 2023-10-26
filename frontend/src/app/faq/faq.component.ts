import { Component,ViewChild,ElementRef } from '@angular/core';
import { animate} from 'motion';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent {
  @ViewChild('container_faq') container_faq!: ElementRef;
  @ViewChild('container_questio_faq') container_questio_faq!: ElementRef;


  animateMyElement(): void {
    animate(
      this.container_faq.nativeElement,
      { opacity: [0,1]},
      { duration: 1, easing: [.65,.05,.36,1] , repeat:0,delay:0.2}
    )
    animate(
      this.container_questio_faq.nativeElement,
      { opacity: [0,1] , y:[300,0]},
      { duration: 1, easing: [.65,.05,.36,1] , repeat:0,delay:0.3}
    )
  }

  ngAfterViewInit(){
    this.initializeInViewObserver();
  }

  private initializeInViewObserver(): void {
    if (!this.container_faq) return;

    const options: IntersectionObserverInit = {
      root: null, // null significa che l'area di visualizzazione è la root
      threshold: 0.1  // il 10% dell'elemento è visibile
    };


    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
                  this.animateMyElement();
                  observer.unobserve(this.container_faq.nativeElement);
              }
      });
  }, options);
  
  observer.observe(this.container_faq.nativeElement);
}
}
