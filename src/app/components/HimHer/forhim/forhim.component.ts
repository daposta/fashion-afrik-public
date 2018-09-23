import { Component, OnInit } from '@angular/core';
import { ForhimService } from '../services/forhim.service';

declare var $: any;

@Component({
  selector: 'app-forhim',
  templateUrl: './forhim.component.html',
  styleUrls: ['./forhim.component.scss'],
})
export class ForhimComponent implements OnInit {
  forhim: any[]

  constructor(private forHimSrv: ForhimService) { }

  ngOnInit() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
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
