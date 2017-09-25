import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [{provide: 'http://agl-developer-test.azurewebsites.net/people.json', useValue: '../assets/api/peopleJSON'},
      AppService,
      { provide: MockBackend, useClass: MockBackend}
      ]
    });
  });
  it('should create the service', async(
    inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  })));
  it('should be successful with a valid response',
    inject([AppService, MockBackend], (service: AppService, mockBackend: MockBackend) => {
    const testData = [{
      'name': 'Bob',
      'gender': 'Male',
      'age': 23,
      'pets': [{
        'name': 'Tom',
        'type': 'Cat'
      }]
    }, {
      'name': 'Jennifer',
      'gender': 'Female',
      'age': 18,
      'pets': [{
        'name': 'Garfield',
        'type': 'Cat'
      }]
    }];
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions ({
          body: JSON.stringify(testData)
        })));
      });
      service.fetchPeopleJSON().subscribe(data => {
        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0);
        expect(data).toBe(Array);
        expect(data[0].name).toEqual('Bob');
        expect(data[0].gender).toEqual('Male');
        expect(data[0].age).toEqual('23');
        expect(data[0].pets).toBe(Array);
        expect(data[0].pets.lengthAdjust).toBeGreaterThan(0);
        expect(data[0].pets[0].name).toEqual('Tom');
        expect(data[0].pets[0].type).toEqual('Cat');
        expect(data[1].name).toEqual('Jennifer');
        expect(data[1].gender).toEqual('Female');
        expect(data[1].age).toEqual('18');
        expect(data[1].pets).toBe(Array);
        expect(data[1].pets.lengthAdjust).toBeGreaterThan(0);
        expect(data[1].pets[0].name).toEqual('GarField');
        expect(data[1].pets[0].type).toEqual('Cat');
      });
  }));
});
