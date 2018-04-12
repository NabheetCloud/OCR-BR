import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslationPage } from './translation';

@NgModule({
  declarations: [
    TranslationPage,
  ],
  imports: [
    IonicPageModule.forChild(TranslationPage),
  ],
})
export class TranslationPageModule {}
