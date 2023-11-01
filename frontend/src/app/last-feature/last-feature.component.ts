import { Component ,ViewChild,ElementRef} from '@angular/core';
import { animate} from 'motion';
import { DataService } from '../data.service';


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
  events: EventItem[] = [];
  items:any = [];


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

random_color(){
  const number_dec = Math.ceil(Math.random() * (16777215 - 0) + 0);
  const hexString: string = number_dec.toString(16).padStart(6,'0').toUpperCase();
  return '#' + hexString
}

constructor(private service: DataService) {
  this.service.getFeature().subscribe((data: any) => {
      this.items = Object.values(data);
      console.log(this.items);

      this.events = this.items.map((item: any) => ({
          title: item['title'],
          date: item['date'],
          color: this.random_color(),
          image: 'data:image/png;base64,' + item['image'],
          description: item['description']
      }));
  });
}
}
  
  