import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from '../services/app.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [
        AppComponent
      ],
      providers: [ {provide: [ AppService ], deps: [MockBackend]} ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should return empty array if data is undefined`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const result = app.filterOwnersWithCats(undefined);
    expect(result).toEqual([]);
  }));
  it('should check if array "pets" undefined'),
    async( () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const testData = [{
        'name': 'Bob',
        'gender': 'Male',
        'age': 23,
        'pets': [{
          'name': 'Tom',
          'type': 'Cat'
        }]
      }];
      const result = app.filterOwnersWithCats(testData);
      expect(result[0].pets).toEqual([]);
    });
  it('should filter the pets "Cats" according to the gender of their owner and call sort function',
    async(() => {
     const fixture = TestBed.createComponent(AppComponent);
     fixture.detectChanges();
     const app = fixture.debugElement.componentInstance;
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
     app.filterOwnersWithCats(testData);
      expect(app.peopleJson.male.length).toBeGreaterThan(0);
      expect(app.peopleJson.female.length).toBeGreaterThan(0);
      expect(app.peopleJson.male[0]).toEqual('Tom');
      expect(app.peopleJson.female[0]).toEqual('Garfield');
   }));
  it('should not add an empty field when pet\'s name is empty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const testData = [{
      'name': 'Jennifer',
      'gender': 'Female',
      'age': 18,
      'pets': [{
        'name': '',
        'type': 'Cat'
      }]
    }];
    app.filterOwnersWithCats(testData);
    expect(app.peopleJson.female.length).toEqual(0);
  });
  it('have no pet as \'Cat\' ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const testData = [{
      'name': 'Jennifer',
      'gender': 'Female',
      'age': 18,
      'pets': [{
        'name': 'Tom',
        'type': 'Dog'
      }]
    }];
    app.filterOwnersWithCats(testData);
    expect(app.peopleJson.female.length).toEqual(0);
  });
  it('should have either \'male\' or \'female \' as gender', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const testData = [{
      'name': 'Jennifer',
      'gender': 'other',
      'age': 18,
      'pets': [{
        'name': 'Tom',
        'type': 'Dog'
      }]
    }];
    app.filterOwnersWithCats(testData);
    expect(app.peopleJson.female.length).toEqual(0);
    expect(app.peopleJson.male.length).toEqual(0);
  });
  it('resultant should have Cat\'s names sorted', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const testData = {male: ['Tom', 'Garfield']};
    app.sortPets(testData);
    expect(app.peopleJson.male[0]).toEqual('Garfield');
    expect(app.peopleJson.male[1]).toEqual('Tom');
  }));
});
