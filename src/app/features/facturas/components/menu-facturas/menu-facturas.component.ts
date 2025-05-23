import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-facturas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './menu-facturas.component.html',
  styleUrls: ['./menu-facturas.component.css']
})
export class MenuFacturasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
