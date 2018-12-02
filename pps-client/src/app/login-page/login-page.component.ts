import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Output('save') public save: EventEmitter<{ userName: string, password: string}> =
  new EventEmitter<{ userName: string, password: string}>();

  private _user = {
    userName: null,
    password: null
  };

  private loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  private onSubmit() {
    this.save.emit(this._user);
    const userName: string = this.loginForm.get('userName').value;
    console.log(this.loginForm.get('userName').value);
    const password: string = this.loginForm.get('password').value;
    this._user = {userName,password};

    console.log(this._user);
  }

}
