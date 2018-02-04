import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromTraining from '../training.reducer';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  trainingForm: FormGroup;


  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
    this.trainingForm = new FormGroup({
      exercise: new FormControl('GMv5TiludkUb3gsgykPw', Validators.required)
    });
  }

  onStartTraining() {
    this.trainingService.startExercise(this.trainingForm.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

}
