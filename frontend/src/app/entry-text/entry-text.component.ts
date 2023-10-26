import { Component } from '@angular/core';
import { scroll, animate } from "motion"

@Component({
  selector: 'app-entry-text',
  templateUrl: './entry-text.component.html',
  styleUrls: ['./entry-text.component.css']
})
export class EntryTextComponent {

  text_dimension:String = String((this.getScreenSize().width/100)*15) + "px";  

  ngAfterViewInit(){
    //init animation
    animate(
      ".container_text",
      { opacity: [0,1], x: [-1900,-20] },
      { duration: 1, easing: [.65,.05,.36,1] , repeat:0,delay:0.5}
    )

    scroll(
      animate(".container_text", { translate: [0,-1900]})
      
    );
  }

  
  getScreenSize() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return { width: screenWidth, height: screenHeight };
  }    


}
