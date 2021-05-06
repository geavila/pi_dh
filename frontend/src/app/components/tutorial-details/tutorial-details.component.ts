import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { TutorialService } from "src/app/services/tutorial.service";
import { Tutorial } from "src/app/models/tutorial.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //o que será carregado antes da aplicação iniciar
    this.message = '';
    this.getTutorial(this.route.snapshot.params.id); //olha a service e pega o id especifico -- meio q um print do objeto com id

  }

  getTutorial(id: string): void {
    this.tutorialService.get(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.description,
      published: status
    };
    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe(
        response => {
          this.currentTutorial.published = status;
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error)
        }
      )
  }

  updateTutorial(): void {
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message
        },
        error => {
          console.log(error)
        }
      );
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        }
      )
  }
}
