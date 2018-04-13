import { Component, ChangeDetectorRef } from '@angular/core';
import { Service } from './app.service';

@Component({
    selector: 'attend-quiz',
    templateUrl: './attendQuiz.component.html'
})
export class AttendQuizComponent {
    firstName: String;
    lastName: String;
    showForm: boolean = true;
    allQuestions: any;
    questionIndex: number = 0;
    answer: String;
    score: number = 0;
    showScore:boolean = false;
    constructor(private service: Service) {
        this.getAllQuestions();
    }
    getAllQuestions() {
        this.service.getAllQuestions()
            .subscribe((response) => {
                console.log('getAllQuestions: ', JSON.parse(response._body));
                this.allQuestions = JSON.parse(response._body);
            });
    }

    checkAnswer() {
        console.log('answer: ', this.answer);
        let options = this.allQuestions[this.questionIndex].options;
        options.forEach(element => {
            if (element.value === this.answer) {
                if (element.selected == true) {
                    this.score = this.score + 10;
                    //console.log("if m aya");
                }
                //console.log('correct hai', element.selected);
            }
        });
        if (this.allQuestions.length > this.questionIndex) {
            this.questionIndex = this.questionIndex + 1;
        }

    }
}
