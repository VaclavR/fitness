import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  trainingForm: FormGroup;
  trainingSubscription: Subscription;

  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService, private store: Store<fromApp.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    this.fetchExercises();
    this.trainingSubscription = this.trainingService.exercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
      });
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

  ngOnDestroy() {
    if (this.trainingSubscription) {
      this.trainingSubscription.unsubscribe();
    }
  }

}
