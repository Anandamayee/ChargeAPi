import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
  constructor() { }

  ngOnInit() {
  }

}
