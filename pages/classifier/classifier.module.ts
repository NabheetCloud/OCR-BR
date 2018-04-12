import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassifierPage } from './classifier';

@NgModule({
  declarations: [
    ClassifierPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassifierPage),
  ],
})
export class ClassifierPageModule {}
