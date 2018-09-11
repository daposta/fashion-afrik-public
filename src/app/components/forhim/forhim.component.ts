import { Component, OnInit } from '@angular/core';
import { ForhimService } from '../../services/forhim.service'

@Component({
  selector: 'app-forhim',
  templateUrl: './forhim.component.html',
  styleUrls: ['./forhim.component.scss'],
  providers: [ ForhimService ]
})
export class ForhimComponent implements OnInit {
  forhim: any[]

  constructor(private forHimSrv: ForhimService) { }

  ngOnInit() {

    this.getForHim();
  }
  getForHim() {
    this.forHimSrv.fetchForHim().subscribe(
      res => {
        this.forhim = res.results;
        console.log(res.results);
      }, err => {
        console.log(err);
      }
    )
  }


}
