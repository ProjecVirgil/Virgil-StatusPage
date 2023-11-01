import { Component,ViewChild, ElementRef} from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import {animate } from 'motion';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @ViewChild('container_navbar') container_navbar!: ElementRef;


  value = '';
  items: MenuItem[] | undefined;
  screenWidth: number | undefined;

    animateMyElement(): void {
      animate(
        this.container_navbar.nativeElement,
        { opacity: [0,1], y: [-200, 0,] },
        { duration: 1, easing: [.65,.05,.36,1] , repeat:0,delay:0.2}
      )
    }

    ngAfterViewInit(){
      this.initializeInViewObserver();
    }
  
    private initializeInViewObserver(): void {
      if (!this.container_navbar) return;
  
      const options: IntersectionObserverInit = {
        root: null, // null significa che l'area di visualizzazione è la root
        threshold: 0.1  // il 10% dell'elemento è visibile
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                    this.animateMyElement();
                    observer.unobserve(this.container_navbar.nativeElement);
                }
        });
    }, options);
    
    observer.observe(this.container_navbar.nativeElement);
  }

  scrollDown(x:number): void {
    window.scrollBy({ top: (window.innerHeight/100) * x, left: 0, behavior: 'smooth' });
  }

  ngOnInit() {
    this.screenWidth = (window.innerWidth/100) * 7;
    this.items = [
      {
        label : 'Join',
        icon : 'pi pi-fw pi-discord',
        style : {
          "margin-left":'auto'
        }
      },
      {
        label : 'Last feature',
        icon : 'pi pi-fw pi-list',
        command: () => this.scrollDown(120)
      },
      {
        label : 'FAQ',
        icon : 'pi pi-fw pi-cloud',
        command: () => this.scrollDown(600) 
      },
      {
        label: 'Explore',
        icon: 'pi pi-fw pi-github',
        items:[
          {
            label:'Project Virgil',
            icon: 'pi pi-fw pi-check',
            url: 'https://github.com/Retr0100/ProjectVirgil/'
          },
          {
            label:'Virgil AI',
            icon: 'pi pi-fw pi-desktop',
            url: 'https://github.com/Retr0100/VirgilAI/'
          },          {
            label:'Virgil APP',
            icon: 'pi pi-fw pi-mobile',
            url: 'https://github.com/Retr0100/VirgilApp/'
          },          {
            label:'Virgil ML',
            icon: 'pi pi-fw pi-chart-bar',
            url: 'https://github.com/Retr0100/VirgilML/'
          },          {
            label:'Virgil API',
            icon: 'pi pi-fw pi-database',
            url: 'https://github.com/Retr0100/VirgilAPI/'
          },
        ]
      },
      {
        label : 'Discover the Virgilio project',
        icon : 'pi pi-fw pi-globe',
        url:"https://projectvirgil.net/",
        style: {
          "margin-left":"auto",
          "margin-right":"20px",
          "background-color":"#1d1e27",
          "border-radius":"10px"
        }
      },
    ]
  }
}