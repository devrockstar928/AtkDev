import { Injectable } from '@angular/core';
import { MockHttpService } from './mock-http.service';


@Injectable()
export class MockUsingService {
    constructor(private mockSer: MockHttpService) {
    }

    getContentProfile() {
        return this.mockSer.get('./assets/server-data/content-profile.json');
    }
}
