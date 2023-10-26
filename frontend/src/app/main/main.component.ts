import { Component,ViewChild,ElementRef} from '@angular/core';
import {animate } from 'motion';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  layout:string | undefined
  @ViewChild('container_main') container_main!: ElementRef;

  ngOnInit() {
      if(this.getScreenSize().width <= 500){
        this.layout = "vertical"
      }
      else{
        this.layout = "horizontal"
      }
  }

  animateMyElement(): void {
    animate(
      this.container_main.nativeElement,
      { opacity: [0,1], x: [-1900, 0,] },
      { duration: 1, easing: [.65,.05,.36,1] , repeat:0, delay:0.7}
    )
  }

  ngAfterViewInit(){
    this.initializeInViewObserver();
  }

  private initializeInViewObserver(): void {
    if (!this.container_main) return;

    const options: IntersectionObserverInit = {
      root: null, // null significa che l'area di visualizzazione è la root
      threshold: 0.1  // il 10% dell'elemento è visibile
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
                  this.animateMyElement();
                  observer.unobserve(this.container_main.nativeElement);
              }
      });
  }, options);
  
  observer.observe(this.container_main.nativeElement);
}

  getScreenSize() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return { width: screenWidth, height: screenHeight };
  }

}
