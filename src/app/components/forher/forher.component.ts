import { Component, OnInit } from '@angular/core';
import { ForherService } from '../../services/forher.service';


@Component({
  selector: 'app-forher',
  templateUrl: './forher.component.html',
  styleUrls: ['./forher.component.scss'],
  providers: [ ForherService ]
})
export class ForherComponent implements OnInit {
  forher: any[]

  constructor(private forHerSrv: ForherService) { }

  ngOnInit() {

    this.getForHer();
  }
  getForHer() {
    this.forHerSrv.fetchForHer().subscribe(
      res => {
        this.forher = res.results;
        console.log(res.results);
      }, err => {
        console.log(err);
      }
    )
  }


}
