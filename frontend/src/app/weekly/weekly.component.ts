import { Component,Renderer2, HostListener} from '@angular/core';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent {
    basicData: any;
    basicOptions: any;

    uptime_ds:number = 0
    uptime_website:number = 0
    uptime_api:number = 0
    
    width:number | undefined
    height:number | undefined

    constructor(private renderer: Renderer2) { }

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
            labels: ['Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday','Saturday','Sunday'],
            datasets: [
                {
                    label: 'Uptime in %',
                    data: [getRandomFloat(0.0,100.0), getRandomFloat(0.0,100.0), getRandomFloat(0.0,100.0), getRandomFloat(0.0,100.0),getRandomFloat(0.0,100.0), getRandomFloat(0.0,100.0), getRandomFloat(0.0,100.0)],
                    backgroundColor: function(context: { chart: any; }) {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                
                        if (!chartArea) {
                          // This case happens on initial chart load
                          return;
                        }
                        return getGradient(ctx, chartArea, false);
                    },
                    borderColor: function(context: { chart: any; }) {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                
                        if (!chartArea) {
                          // This case happens on initial chart load
                          return;
                        }
                        return getGradient(ctx, chartArea, true);
                    },
                    borderWidth: 3
                }
            ]
        };
        this.height = (this.getScreenSize().height / 100) * 40;
        this.basicOptions = {
            responsive: false,
            maintainAspectRatio: true,
            animation: {
                duration: 2000, // Durata dell'animazione in millisecondi
                easing: 'easeInOutSine', // Effetto di animazione
                delay: 500 // Ritardo prima dell'inizio dell'animazione
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                title: {
                    display: true,
                    text: 'Overall service uptime',
                    padding: {
                        top: 10,
                        bottom: 20
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngAfterViewInit() {
        const duration = 2000; 
        const startTime = Date.now();
        
        const value_api = getRandomFloat(0.0, 100.0)
        const value_ds = getRandomFloat(0.0, 100.0)
        const value_website = getRandomFloat(0.0, 100.0)

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const t = Math.min(1, elapsed / duration);  
      
          this.uptime_api = Math.ceil(value_api * easeInOutSine(t)); 
          this.uptime_ds = Math.ceil(value_ds * easeInOutSine(t)); 
          this.uptime_website = Math.ceil(value_website * easeInOutSine(t)); 
          
          if (t < 1) {
            requestAnimationFrame(animate);
          }
        };
      
        requestAnimationFrame(animate);
      }

    takeElement(element: HTMLElement): string {
        // Usa l'elemento come desideri, ad esempio:
        const element_type = element.getAttribute('data-ref');
        if(element_type == 'api'){
            return this.getColor(this.uptime_api)
        }
        else if(element_type == 'website'){
            return this.getColor(this.uptime_website)
        }
        else{
            return this.getColor(this.uptime_ds)
        }
      }

    getColor(uptime:number): string {
        if(uptime > 80){
            return 'green'
        }
        else if(uptime > 50){
            return 'yellow'
        }
        else if(uptime > 30){
            return 'orange'
        }
        else{
            return 'red'
        }
    }

    getScreenSize() {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return { width: screenWidth, height: screenHeight };
      }

}




function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

let width: number, height: number;
function getGradient(ctx: CanvasRenderingContext2D, chartArea: { left: number, right: number, top: number, bottom: number },border:boolean): CanvasGradient {
    let gradient: CanvasGradient | null = null;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        if(border == true){
            gradient.addColorStop(0, 'rgba(255, 51, 51, 1)');
            gradient.addColorStop(0.25, 'rgba(255, 115, 0, 1)');
            gradient.addColorStop(0.5, 'rgba(255, 191, 0, 1)');
            gradient.addColorStop(0.75, 'rgba(204, 255, 0, 1)');
            gradient.addColorStop(1, 'rgba(51, 255, 51, 1)');
        }
        else{
            gradient.addColorStop(0, 'rgba(255, 51, 51, 0.2)');
            gradient.addColorStop(0.25, 'rgba(255, 115, 0, 0.2)');
            gradient.addColorStop(0.5, 'rgba(255, 191, 0, 0.2)');
            gradient.addColorStop(0.75, 'rgba(204, 255, 0, 0.2)');
            gradient.addColorStop(1, 'rgba(51, 255, 51, 0.2)');
        }

    }

    return gradient;
}



function easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }