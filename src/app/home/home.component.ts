import { Component, OnInit, AfterViewInit, OnDestroy  } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy{

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('todo');
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('todo');
  }

}
