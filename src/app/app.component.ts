import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formModel } from './Model/formModel';
import { ReadJsonService } from './Service/read-json.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public formDetails!: formModel[];
  public form: FormGroup = this.fb.group({})

  constructor(private readJson : ReadJsonService, private fb: FormBuilder){}

  title = 'FormForGeri';
  ngOnInit(){
    /* use the service for take data for form group */
    this.readJson.getJSON().pipe(
      finalize(() => {
        this.createForm()
      })
    ).subscribe(data => {
      this.formDetails = data;
    })
  }

/* create a form group whit data passed trow JSON */
public createForm(){
    for(let item of this.formDetails){
      this.form.addControl(item.field, new FormControl())
    }
  }

public onSubmit(data:any){
  console.log(data)
  this.form.reset()
 }

/* check if the form was valid*/
public get formValid(){
   if(this.form?.valid){
     return false;
   }
   return true;
  }
}
