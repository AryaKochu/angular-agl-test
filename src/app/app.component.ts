import { Component } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  peopleJson = {};
  constructor(private service: AppService) {
    this.service.fetchPeopleJSON().subscribe( res => {
      this.peopleJson = res;
      this.filterOwnersWithCats(res);
      this.sortPets(this.peopleJson);
    });
  }
  // filter the pets (cats) according to male, female owners
  filterOwnersWithCats(data) {
    if (data === undefined) { return []; }
    const res = data && data
      .reduce((result, value) => {
      const gender = value.gender.toLowerCase();
        result[gender] = ['male', 'female'].indexOf(gender) > -1 && (result[gender]) && result[gender]
          .concat((value.pets || [])
            .filter(pet => pet.type === 'Cat' && pet.name.length !== 0)
              .map(pet => pet.name)
      );
      return result;
    }, {
      male: [],
      female: []
    });
    if (res === undefined) { return []; }
    this.peopleJson = res;
  }
  // sort the cats according to their names
  sortPets(data) {
    data.male && data.male.sort();
    data.female && data.female.sort();
    this.peopleJson = data === undefined ? [] : data;
  }
}

