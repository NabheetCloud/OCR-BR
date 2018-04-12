import { Component, NgZone } from '@angular/core';
import { NavController,IonicPage,  NavParams } from 'ionic-angular';
import {  LoadingController, ToastController } from 'ionic-angular';
import { Http ,Headers} from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the OcrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocr',
  templateUrl: 'ocr.html',
})
export class OcrPage {
  file:any;
  loading:any;
  
  sapcp = {amount:'',bukrs:'',text:'',apikey:'<key here>',rawtext:'',xtoken:'',workflow:"",approver:"" };  
imageURI:any;
imageFileName:any;
public zone: NgZone;
  constructor(public navCtrl: NavController, public navParams: NavParams,// private transfer: FileTransfer,
  private camera: Camera,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,private ngZone:NgZone,public http: Http) {
    this.zone = ngZone;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcrPage');
  }
  updatedata(data){
    this.sapcp.amount = data[0];
  }
  presentLoadingDefault() {
  
  
    this.loading.present();
  
  
  }
  
  changeListener($event) : void {
    this.file = $event.target.files[0];
    let loading =  this.loadingCtrl.create({
      content: 'Contacting SAP Cloud'
    });
    loading.present();
    var data = new FormData();
    data.append('files', $event.target.files[0], $event.target.files[0].name);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function (data) {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
     
        var d = JSON.stringify(JSON.parse(this.responseText).predictions);
        var nabh =d.replace("[","");
        var nabh1 =nabh.replace("]","");
        nabh1 =nabh1.replace('"',"");
        var nabh2 = nabh1.replace("\\f","").split("\\n");
        
      }
    });
    xhr.open("POST", "https://sandbox.api.sap.com/ml/ocr/ocr");
    
    
    //adding request headers
    xhr.setRequestHeader("Accept", "application/json");
    //API Key for API Sandbox
    xhr.setRequestHeader("APIKey", this.sapcp.apikey);
    let headers = new Headers();
    headers.append( 'Accept','application/json');
    headers.append('APIKey',this.sapcp.apikey);
    xhr.send(data);
    this.http.post("https://sandbox.api.sap.com/ml/ocr/ocr", data, {headers:headers})
    .subscribe(data => {
     var a1 = JSON.stringify(data);
     var b1 = JSON.parse(a1);
     var c1 = b1._body;
     this.sapcp.rawtext = JSON.parse(c1).predictions;
     var d = JSON.stringify(JSON.parse(c1).predictions);
     var nabh =d.replace("[","");
     var nabh1 =nabh.replace("]","");
     nabh1 =nabh1.replace('"',"");
     var nabh2 = nabh1.replace("\\f","").split("\\n");
     var a = nabh2[1].split("—");
     this.sapcp.amount = a[1];
      a = nabh2[3].split("—");
     this.sapcp.text =  a[1];
     a = nabh2[0].split("—");
     this.sapcp.bukrs =  a[1];
     loading.dismiss();
     // this.sapcp.detLang = data.json().langStr;
      console.log(data);
      }, error => {
      console.log("Oooops!");
      console.log(error);
      });
 
  }
getImage() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  this.camera.getPicture(options).then((imageData) => {
    this.imageURI = imageData;
    // Get the text using SAPCP OCR service

  }, (err) => {
    console.log(err);
    this.presentToast(err);
  });
}
uploadFile() {
  let loading =  this.loadingCtrl.create({
    content: 'Contacting SAP Cloud'
  });
  loading.present();
  let headers = new Headers();
  headers.append( 'X-CSRF-Token','Fetch');
  headers.append( 'Accept','application/json');
  headers.append( 'Content-Type','application/json');
  headers.append('Authorization','Basic <base64 username:password>');
  
  this.http.get("https://bpmrulesruntimebpm-p2000241409trial.hanatrial.ondemand.com/rules-service/v1/rules/xsrf-token", 
  {headers:headers})
  .subscribe(data => {
    data.headers.forEach((value,key) =>{ 
  if (key == "x-csrf-token"){
  this.sapcp.xtoken = value[0];}
    });

    var data1 = [
      {
      "__type__":"Input",
      "Bukrs":this.sapcp.bukrs,
      "Amount":this.sapcp.amount
      }
      ];
      let headers = new Headers();
      headers.append( 'X-CSRF-Token',this.sapcp.xtoken);
      headers.append( 'Accept','application/json');
      headers.append( 'Content-Type','application/json');
      headers.append('Authorization','Basic <base64 username:password>');
      
      this.http.post("https://bpmrulesruntimebpm-p2000241409trial.hanatrial.ondemand.com/rules-service/v1/rules/invoke?rule_service_name=NabheetRule::NabheetRuleService"
      , data1, {headers:headers})
      .subscribe(data => {
      
       // this.sapcp.detLang = data.json().langStr;
        console.log(data);
        var b = JSON.stringify(data);
        var a = JSON.parse(b)
        var c = JSON.parse(a._body);
        this.sapcp.approver = c[0].Approver;
        this.sapcp.workflow = c[0].WorkflowTrigger;
        loading.dismiss();
        }, error => {
        console.log("Oooops!");
        console.log(error);
        });

    }, error => {
    console.log("Oooops!");
    console.log(error);
    });
}
presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}
