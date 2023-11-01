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
  events:EventItem[] | undefined;
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

constructor(private service:DataService ){
    service.getFeature().subscribe( 
        (data:any) => {
          this.items = Object.keys(data).map((key) => {return data[key]});
          console.log(this.items)  
             
          const imageUrl= ['data:image/png;base64,' + this.items[0]['image'],'data:image/png;base64,' + this.items[1]['image'], 'data:image/png;base64,' + this.items[2]['image']];
              
          this.events = [
                { title: this.items[0]['title'], date: this.items[0]['date'], color: this.random_color(), image: imageUrl[0] , description:this.items[0]['description'] },
                { title: this.items[1]['title'], date:  this.items[1]['date'], color: this.random_color(), image:imageUrl[1] ,description: this.items[1]['description'] },
                { title: this.items[2]['title'], date:  this.items[2]['date'], color: this.random_color(), image:imageUrl[2] ,description:this.items[2]['description'] },  
              ];
          }
        )
    }   
}
  
  


  
  