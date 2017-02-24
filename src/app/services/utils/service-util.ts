import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class ServiceUtil {
    static getRandomColor() { 
        return `#${Math.floor(Math.random()*16777215).toString(16)}`; 
    }

    static getJson(response: Response) {
        return response.json();
    }

    static checkForError(response: Response): Response | Observable<any> {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText)
            error['response'] = response;
            console.error(error);
            throw error;
        }
    }
}