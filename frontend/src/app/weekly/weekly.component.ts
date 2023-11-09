import { Component} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})

export class WeeklyComponent {
    basicData: any;
    basicOptions: any;
    
    list_service_avaible:any = []
    uptimes: { [key: string]: number } = {};
    
    list_uptime_value:any = {}

    items: any = []

    width:number | undefined
    height:number | undefined

    average_value_service = [];

    constructor(private service:DataService ) {
        this.service.getService().subscribe(
            (data: any) => {
                this.list_service_avaible = Object.keys(data).map((key) => data[key]);
                this.list_service_avaible.forEach((service: { name: string | number; }) => {
                    this.uptimes[service.name] = 0;
                });
            }
        );
    }


    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.service.getWeek().subscribe(
            (data:any) => {
              this.items = data["result"];  // Qui dovresti vedere i dati JSON restituiti dal tuo endpoint
              const size = Object.keys(this.items).length;
              for(let i = 1;i<=size;i++){
                this.list_uptime_value[i]=this.items[i].reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0) / 7
              }
              this.average_value_service = average_calculation(this.items)

          const last_seven_day = recoverLastDay()
        this.basicData = {
            labels: [...last_seven_day],
            datasets: [
                {
                    label: 'Uptime in %',
                    data: this.average_value_service,
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
                          return;
                        }
                        return getGradient(ctx, chartArea, true);
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
            responsive: false,
            maintainAspectRatio: true,
            animation: {
                duration: 2000, 
                easing: 'easeInOutSine', 
                delay: 500
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
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const t = Math.min(1, elapsed / duration);
    
          Object.keys(this.list_uptime_value).forEach((key) => {
            const serviceValue = this.list_uptime_value[key];
            if (typeof serviceValue === 'number') {
                this.uptimes[key] = Math.ceil(serviceValue * easeInOutSine(t));
            }
          });
    
          if (t < 1) {
            requestAnimationFrame(animate);
          }
        };
    
        requestAnimationFrame(animate);
      }

    takeElement(percent: number): string {
        console.log(percent)
        return this.getColor(percent);
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

  function recoverLastDay(): number[] {
    // Ottieni la data odierna
    const currentDay = new Date();

    const listDay: number[] = [];

    for (let i = 6; i >= 0; i--) {
        const newDate = new Date(currentDay);
        newDate.setDate(currentDay.getDate() - i);
        listDay.push(newDate.getDate());
    }

    return listDay;
}

function average_calculation(list_percent:any): any {
    //In order from the old day to the new
    const size = Object.keys(list_percent).length;
    const final_list = []
    for(let i = 0;i<7;i++){
        let sum = 0
        for(let j = 1;j<=size;j++){
            sum = sum + list_percent[j][i]
        }
        final_list.push(Math.ceil(sum/size))
    }
    return final_list
}

