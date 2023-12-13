import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { UniversiteService } from 'src/app/services/universite.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private uniService:UniversiteService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  }

 

