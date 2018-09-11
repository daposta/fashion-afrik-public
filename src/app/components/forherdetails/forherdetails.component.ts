import { Component, OnInit } from '@angular/core';
import { ForherService } from '../../services/forher.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-forherdetails',
  templateUrl: './forherdetails.component.html',
  styleUrls: ['./forherdetails.component.scss'],
  providers: [ ForherService ]
})
export class ForherdetailsComponent implements OnInit {
  forher: any[]

  constructor(private forHerSrv: ForherService,
              private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getForHerDetails(id)
  }
  getForHerDetails(id: any) {
    this.forHerSrv.fetchForHerDetail(id).subscribe(
      res => {
        this.forher = res.results;
        console.log(res.results);
      }, err => {
        console.log(err);
      }
    )
  }

}
