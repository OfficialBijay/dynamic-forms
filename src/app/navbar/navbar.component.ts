import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  
  showMenuIcon:boolean = true;
  
  ngOnInit() {
    document.querySelector("nav .nav-links")?.addEventListener("click", () => {
      this.closeMenu();
    });
  }

  showMenu(){
    const menuIcon = <HTMLDivElement>document.querySelector("nav .nav-links");
    if(menuIcon){
      menuIcon.style.left = "0";
      this.showMenuIcon = false;
    }
  }

  closeMenu(){
    const menuIcon = <HTMLDivElement>document.querySelector("nav .nav-links");
    if(menuIcon){
      menuIcon.style.left = "-100%";
      this.showMenuIcon = true;
    }
  }
}
