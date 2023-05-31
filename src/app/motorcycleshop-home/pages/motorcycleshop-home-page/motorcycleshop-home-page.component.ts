import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-motorcycleshop-home-page',
  templateUrl: './motorcycleshop-home-page.component.html',
  styleUrls: ['./motorcycleshop-home-page.component.css']
})
export class MotorcycleshopHomePageComponent implements OnInit {

  path: string = 'assets/images/motorcycleshop_banner.jpg';
  altText: string = 'first image'

  constructor() { }

  ngOnInit(): void {
  }

}
