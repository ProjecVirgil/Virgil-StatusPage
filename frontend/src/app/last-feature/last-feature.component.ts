import { Component ,ViewChild,ElementRef} from '@angular/core';
import { animate} from 'motion';

interface EventItem {
  title?: string;
  date?: string;
  number?: number;
  color?: string;
  image?: string;
  description?:string;
}

@Component({
  selector: 'app-last-feature',
  templateUrl: './last-feature.component.html',
  styleUrls: ['./last-feature.component.css']
})


export class LastFeatureComponent {
  events:EventItem[];
  


  @ViewChild('container_title') container_title!: ElementRef;


  animateMyElement(): void {
    animate(
      this.container_title.nativeElement,
      { opacity: [0,1]},
      { duration: 1, easing: [.65,.05,.36,1] , repeat:0,delay:0.2}
    )
  }

  ngAfterViewInit(){
    this.initializeInViewObserver();
  }

  private initializeInViewObserver(): void {
    if (!this.container_title) return;

    const options: IntersectionObserverInit = {
      root: null, // null significa che l'area di visualizzazione è la root
      threshold: 0.1  // il 10% dell'elemento è visibile
    };


    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
                  this.animateMyElement();
                  observer.unobserve(this.container_title.nativeElement);
              }
      });
  }, options);
  
  observer.observe(this.container_title.nativeElement);
}

  constructor() {
      this.events = [
        { title: 'Alessia SARTORI', date: '15/10/2020 10:30', color: this.random_color(), image: 'https://i.pinimg.com/564x/2f/cd/49/2fcd497522335c1d716284a181c4ea09.jpg',description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Tempus urna et pharetra pharetra. Et netus et malesuada fames ac turpis egestas sed. Odio pellentesque diam volutpat commodo sed. Urna et pharetra pharetra massa massa ultricies mi quis. Mollis aliquam ut porttitor leo a diam sollicitudin. Eu scelerisque felis imperdiet proin fermentum leo vel orci porta. Morbi tristique senectus et netus. Justo nec ultrices dui sapien eget mi proin. Odio facilisis mauris sit amet massa vitae tortor condimentum. Vel elit scelerisque mauris pellentesque pulvinar pellentesque." },
        { title: 'Novità 2', date: '15/11/2020 8:20', color: this.random_color(), image: 'https://i.pinimg.com/564x/8d/1c/10/8d1c108cb776c644a145702f0541925d.jpg',description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Tempus urna et pharetra pharetra. Et netus et malesuada fames ac turpis egestas sed. Odio pellentesque diam volutpat commodo sed. Urna et pharetra pharetra massa massa ultricies mi quis. Mollis aliquam ut porttitor leo a diam sollicitudin. Eu scelerisque felis imperdiet proin fermentum leo vel orci porta. Morbi tristique senectus et netus. Justo nec ultrices dui sapien eget mi proin. Odio facilisis mauris sit amet massa vitae " },
        { title: 'Novità 3', date: '16/10/2024 11:30', color: this.random_color(), image: 'https://i.pinimg.com/564x/d0/f4/c6/d0f4c62350bff9e1586e628a35253381.jpg',description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Tempus urna et pharetra pharetra. Et netus et malesuada fames ac turpis egestas sed. Odio pellentesque diam volutpat commodo sed. Urna et pharetra pharetra massa massa ultricies mi quis. Mollis aliquam ut porttitor leo a diam sollicitudin. Eu scelerisque felis imperdiet proin fermentum leo vel orci porta. Morbi tristique senectus et netus. Justo nec ultrices dui sapien eget mi proin" },
    ];

  }
  random_color(){
    const number_dec = Math.ceil(Math.random() * (16777215 - 0) + 0);
    let hexString: string = number_dec.toString(16).padStart(6,'0').toUpperCase();
    return '#' + hexString
  }
}
