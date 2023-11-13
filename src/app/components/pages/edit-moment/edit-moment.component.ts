import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: Moment
  btnText: string = 'Editar'

  constructor(private momentService: MomentService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private messagesService: MessagesService) {}


  ngOnInit(): void {
    const id = Number(this.activateRoute.snapshot.paramMap.get("id"))

    this.momentService.getMoment(id).subscribe( item => this.moment = item.data)
  }

  async editHandler(momentData: Moment) {
    console.log("editar moment")
    const id = this.moment.id

    const formData = new FormData()
    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if (momentData.image) {
      formData.append('image', momentData.image)
    }

    //await -  espera retorno da api chamada (deve colocar async na assinatura da função)
    await this.momentService.updateMoment(id!, formData).subscribe()

    //chama component de mensagens
    this.messagesService.add(`Momento ${id} foi atualizado com sucesso!`)

    //redireciona para Home
    this.router.navigate(["/"])
  }

}
