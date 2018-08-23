import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { SafeUrl, DomSanitizer } from '../../../../node_modules/@angular/platform-browser';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  @Input() nameFocused: boolean = false;
  @Input() step: number = 1;
  @Output() step3validate: EventEmitter<object> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer, private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient) {}

  public uploader: FileUploader;
  albumName: string = '';
  couvUploaded: boolean = false;
  nextStepReady: boolean = false;
  UploadInProgress: boolean = false;
  progressNumber: number;
  imgList: SafeUrl[] =[];
  photoListUrls: string[] = [];

  ngOnInit() {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: false,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: false,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      let filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file)));
      this.imgList.push(filePreviewPath);
    };
    
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let res = JSON.parse(response);
      console.log(res);
      this.photoListUrls.push(res.secure_url);
      console.log(this.photoListUrls);
     };

     this.uploader.onProgressAll = (progress: any) => {
        this.UploadInProgress = true;
       this.progressNumber = progress;
       console.log(progress);
     }

     this.uploader.onCompleteAll = () => {
      this.UploadInProgress = false;
      this.couvUploaded = true;
      this.nextStepReady = true;
       console.log("FINISHED");
     }

     this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      form.append('context', `photo=test`);
      
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', `album-${localStorage.getItem('USER')}-${this.albumName}`);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

     
  }

  nextStep() {
    this.step3validate.emit({
      step: 3,
      albumName: this.albumName,
      photoListURL: this.photoListUrls
    });
  }

}
