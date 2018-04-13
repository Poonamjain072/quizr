import { Component, ChangeDetectorRef } from '@angular/core';
import { Service } from './app.service';

// enum  {
//   'Multiple choice' = 'Multiple choice',
//   'Single choice' = 'Single choice',
//   'True/False' = 'True/False',
//   'Essay' = ''Essay''
// }

@Component({
  selector: 'create-quiz',
  templateUrl: './createQuiz.component.html'
})
export class CreateQuizComponent {
  questionsType: any;
  selectedQuestionType: any;
  editorValue: any;
  options: any[];
  optionsToAdd: any[];
  allQuestions: any[];
  trueFalseOption: any[];
  answer: any;
  constructor(private service: Service, private chref: ChangeDetectorRef) {
    this.selectedQuestionType = '';
    this.questionsType = ['Multiple choice', 'Single choice', 'True or False', 'Essay'];
    this.options = [{ name: 'Option 1', value: '', selected: false }, { name: 'Option 2', value: '', selected: false },
    { name: 'Option 3', value: '', selected: false }, { name: 'Option 4', value: '', selected: false }];
    // this.getAllQuestions();
    this.trueFalseOption = [{ value: 'True', selected: false }, { value: 'False', selected: false }];
  }

  addNewOption() {
    let option = 'Option ' + (this.options.length + 1);
    this.options.push({ name: option, value: '', selected: false });
    console.log(this.options, this.editorValue);
  }
  saveQuestion() {
    console.log(this.answer);
    this.optionsToAdd = [];
    if (this.selectedQuestionType === 'Multiple choice' || this.selectedQuestionType === 'Single choice') {
      this.options.forEach((option) => {
        if (option.value) {
          if (option.value === this.answer && this.selectedQuestionType === 'Single choice') {
            option.selected = true;
          }
          this.optionsToAdd.push({ value: option.value, selected: option.selected });
        }
      })
    }
    if (this.selectedQuestionType === 'True or False') {
      this.trueFalseOption.forEach((option) => {
        if (option.value) {
          if (option.value === this.answer) {
            option.selected = true;
          }
          this.optionsToAdd.push({ value: option.value, selected: option.selected });
        }
      })
    }
    console.log(this.optionsToAdd);
    this.service.addQuestion(this.selectedQuestionType, this.editorValue, this.optionsToAdd)
      .subscribe((response) => {
        console.log('response: ', response);
        if (response.status === 200) {
          this.clearFields(this.selectedQuestionType);
        }
      });
  }

  clearFields(questionsType: any) {
    console.log('Clear data m aya: ', questionsType);
    this.editorValue = '';
    this.selectedQuestionType = '';
    this.optionsToAdd = [];
    if (questionsType === 'Multiple choice' || questionsType === 'Single choice') {
      this.options = [{ name: 'Option 1', value: '', selected: false }, { name: 'Option 2', value: '', selected: false },
      { name: 'Option 3', value: '', selected: false }, { name: 'Option 4', value: '', selected: false }];
    }
    if (questionsType === 'True or False') {
      this.trueFalseOption = [{ value: 'True', selected: false }, { value: 'False', selected: false }];
    }
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.service.getAllQuestions()
      .subscribe((response) => {
        console.log('getAllQuestions: ', JSON.parse(response._body));
        this.allQuestions = JSON.parse(response._body);
      });
  }

}


