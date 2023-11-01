import { Component } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent {
  basicData: any;
  basicOptions: any;

  items: any = []


  uptime_ds:number = 0
  uptime_website:number = 0
  uptime_api:number = 0
  

  value_api:number | undefined
  value_website:number | undefined
  value_ds:number | undefined

  width:number | undefined
  height:number | undefined

  average_value_service = [];

  constructor(private service:DataService ) {}

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
      this.service.getYear().subscribe(
        (data:any) => {
          this.items = Object.keys(data).map((key) => {return data[key]});  // Qui dovresti vedere i dati JSON restituiti dal tuo endpoint
          this.value_website = (this.items[0][1].reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0) / this.items[0][1].length);
          this.value_ds = (this.items[0][2].reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0) / this.items[0][2].length);
          this.value_api = (this.items[0][3].reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0) / this.items[0][3].length);
          this.average_value_service = average_calculation(this.items[0])

      this.basicData = {
          labels: ['January', 'Febraury','March', 'April', 'May','June','July','August','September','October','November','December'],
          datasets: [
              {
                  tension: 0.3,
                  label: 'Uptime in %',
                  data: this.average_value_service,
                  borderColor: function(context: { chart: any; }) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
            
                    if (!chartArea) {
                      // This case happens on initial chart load
                      return;
                    }
                    return getGradient(ctx, chartArea);
                },
                  borderWidth: 3
              }
          ]
      };
    },
    error => {
    console.error("Error!", error);
    }
); 
      this.height = (this.getScreenSize().height / 100) * 40;
      this.basicOptions = {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            duration: 2000,
            easing: 'easeInOutSine',
            delay: 500
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
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
                grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                    drawTicks: false,
                    zeroLineColor: textColorSecondary,
                    zeroLineWidth: 1
                },

            },
            x: {
                grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                    drawTicks: false
                },
                ticks: {
                    color: textColorSecondary,
                    font: {
                        family: 'Arial'
                    },
                    padding: 10
                }
            }
        }
    }
}


ngAfterViewInit() {
    const duration = 2000; 
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);  
  
      this.uptime_api = Math.ceil(this.value_api! * easeInOutSine(t)); 
      this.uptime_ds = Math.ceil(this.value_ds! * easeInOutSine(t)); 
      this.uptime_website = Math.ceil(this.value_website! * easeInOutSine(t)); 
      
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
let gradient: CanvasGradient | null = null;

function getGradient(ctx: CanvasRenderingContext2D, chartArea: { left: number, right: number, top: number, bottom: number }): CanvasGradient {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(255, 51, 51, 1)');
        gradient.addColorStop(0.25, 'rgba(255, 115, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 191, 0, 1)');
        gradient.addColorStop(0.75, 'rgba(204, 255, 0, 1)');
        gradient.addColorStop(1, 'rgba(51, 255, 51, 1)');
    }

    return gradient;
}
function easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }


function average_calculation(list_percent:any): any {
    //In order from the old day to the new
    let final_list = []
    for(let i = 0;i<12;i++){
        let sum = 0
        for(let j = 1;j<=3;j++){
            sum = sum + list_percent[j][i]
        }
        final_list.push(Math.ceil(sum/3))
    }
    return final_list
}