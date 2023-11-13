import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';

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

  constructor(private momentService: MomentService,
              private ActivatedRoute: ActivatedRoute,
              private router: Router,
              private messagesService: MessagesService) {}

  ngOnInit(): void{
    //Pegar id da URL
    const id = Number(this.ActivatedRoute.snapshot.paramMap.get('id'))
    //chama api para obter um Moment by id
    this.momentService.getMoment(id).subscribe( item => this.moment = item.data)
  }

  async removeHandler(id: Number) {
    console.log("remove item")
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add("Momento excluido com Sucesso!")
    this.router.navigate(["/"])
  }

}
