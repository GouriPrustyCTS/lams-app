import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    // Log the error to the console
    console.error('An error occurred:', error);

    // Optionally, log the error to a remote server
    // this.logErrorToServer(error);

    // Show a user-friendly message
    // alert('Something went wrong. Please try again later.');
  }

  // Example method to log errors to a server
  private logErrorToServer(error: any): void {
    // Implement your logging logic here
    console.log('Logging error to server:', error);
  }
}