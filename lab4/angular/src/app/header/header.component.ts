import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  changeInfoDisplay(): void {
    let info = document.getElementById("header_info");
    if (info != null) {
    let display = window.getComputedStyle(info).getPropertyValue("display");
    if (display === "none") {
      info.style.display = "block";
    } else {
      info.style.display = "none";
    }
  }
  }
  
  updateDateTime(): void {
    let datetime = document.getElementsByClassName("datetime");
    for (let i = 0; i < datetime.length; i++) {
      datetime.item(i)!.innerHTML = Date().toLowerCase();
    }
  }

  ngOnInit(): void {
    this.updateDateTime(); 
    setInterval(this.updateDateTime, 1000);
  }
}
