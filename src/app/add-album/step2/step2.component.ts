import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { SafeUrl, DomSanitizer } from '../../../../node_modules/@angular/platform-browser';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  @Input() step: number = 1;
  @Output() step2validate: EventEmitter<object> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer, private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient) {}

  public uploader: FileUploader;
  public filePreviewPath: SafeUrl;
  couvURL: string;
  couvUploaded: boolean = false;
  nextStepReady: boolean = false;

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
      this.filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file)));
    };
    
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let res = JSON.parse(response);

      this.couvURL = res.secure_url;
      this.couvUploaded = true;
      this.nextStepReady = true;
     };

     this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      form.append('context', `photo=test`);
      
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'couv');
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

     
  }

  nextStep() {
    this.step2validate.emit({
      step: 2,
      couvURL: this.couvURL
    });
  }

}
