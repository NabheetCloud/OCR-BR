import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OcrPage } from '../pages/ocr/ocr';
import { ClassifierPage } from '../pages/classifier/classifier';
import { TranslationPage } from '../pages/translation/translation';
import { TopicPage } from '../pages/topic/topic';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

//import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OcrPage,
    ClassifierPage,
    TranslationPage,
    TopicPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,    OcrPage,
    ClassifierPage,
    TranslationPage,
    TopicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  Camera
  ]
})
export class AppModule {}
