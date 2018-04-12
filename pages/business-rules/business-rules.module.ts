import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessRulesPage } from './business-rules';

@NgModule({
  declarations: [
    BusinessRulesPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessRulesPage),
  ],
})
export class BusinessRulesPageModule {}
