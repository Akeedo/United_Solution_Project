import { Component, OnInit } from '@angular/core';
import { UserModelServiceService } from '../services/user-model-service.service';
import { NgForm } from '@angular/forms';
import { UserDataServiceService } from '../services/user-data-service.service';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { catchError, of} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  providers: [MessageService]
})
export class UserRegistrationComponent implements OnInit{

  emptyUserSave: boolean = false;
  
  messages: Message[] = [];

  userRegistrationForm: NgForm;

  constructor(
    public modelSvc: UserModelServiceService,
    private dataSvc: UserDataServiceService,
    public messageService: MessageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.modelSvc.setDefaultUser();
  }

  // Inside your component class

  onSave(userForm: NgForm) {
    if (userForm.invalid) {
      this.emptyUserSave = true;
      this.messages = [
        { severity: 'error', summary: 'Error', detail: 'Please fill in all required fields' }
      ];
      return;
    }
  
    this.dataSvc.saveUser(this.modelSvc.user).pipe(
      catchError((e) => {
        if (e instanceof HttpErrorResponse && e.status === 401) {
          this.messages = [
            { severity: 'error', summary: 'Error', detail: 'You are not authorized to perform this action'}
          ];
          return of(null); // Return an Observable that emits no items and immediately completes
        }

        this.emptyUserSave = true;
        let errorMessage = 'An unexpected error occurred'; // Default message
        if (e.error && e.error.message) {
          errorMessage = e.error.message;
        } else if (e.statusText) {
          errorMessage = e.statusText;
        }
  
        this.messages = [
          { severity: 'error', summary: 'Error', detail: errorMessage }
        ];
        return of(null); // Return an Observable that emits no items and immediately completes
      })
    ).subscribe({
      next: (response) => {
        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        console.log('Data:', response.body);
        this.messageService.add({severity: 'success', summary:  'Heading', detail: response.userName });
        setTimeout(() => {
          this.router.navigate(['/user-management']);
        }, 2000); 
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  } 
}
