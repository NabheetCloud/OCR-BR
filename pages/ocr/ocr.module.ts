import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcrPage } from './ocr';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [
    OcrPage,
  ],
  imports: [
    IonicPageModule.forChild(OcrPage),
  ],
  providers: [
  FileTransfer,

  FileTransferObject,
  File,
  Camera
  ]
})
export class OcrPageModule {}
