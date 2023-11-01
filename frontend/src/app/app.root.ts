import { Component ,OnInit} from '@angular/core';
import {PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.root.html',
  styleUrls: ['./app.root.css'],
  providers: [],
})
export class AppRoot implements OnInit{
  title = 'Status-Page';
  constructor(private primengConfig: PrimeNGConfig,private messageService: MessageService) {}


  ngOnInit() {
      this.primengConfig.ripple = true;
    }
    
  ngAfterViewInit() {
    this.show();
  }

  show() {
    this.messageService.add({ severity: 'info', summary: 'INFO', detail: "Don't forget to take a look at my projects" });
  }
}
