import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment
  baseApiUrl = environment.baseApiUrl

  faTimes = faTimes
  faEdit = faEdit

  constructor(private momentService: MomentService, private route: ActivatedRoute) {}

  ngOnInit(): void{
    //Pegar id da URL
    const id = Number(this.route.snapshot.paramMap.get('id'))
    //chama api para obter um Moment by id
    this.momentService.getMoment(id).subscribe( item => this.moment = item.data)
  }

}