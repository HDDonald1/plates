import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerEntity } from '../interfaces/owner';
import { InMemOwnerService } from '../services/inMemoryApi/in-memory-api.service';

@Component({
  selector: 'app-owner-data',
  templateUrl: './owner-data.component.html',
  styleUrls: ['./owner-data.component.scss']
})

export class OwnerDataComponent implements OnInit {

  public owner: OwnerEntity;
  private isNew = false;
  form: FormGroup;

  constructor(private apiService: InMemOwnerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id: string;
    this.route.params.subscribe(params => id = params.id);
    if (id === 'new'){
      this.isNew = true;
      this.owner = {
        fName: '',
        lName: '',
        mName: '',
        cars: [],
      };
    }else{
      this.apiService.getOwnerById(id).subscribe(owner => this.owner = owner);
    }
    this.form = new FormGroup({
      fName: new FormControl(this.owner.fName, [Validators.required]),
      lName: new FormControl(this.owner.lName, [Validators.required]),
      mName: new FormControl(this.owner.mName, [Validators.required]),
      cars: new FormArray([])
    });
    for (const car of this.owner.cars){
      const control = new FormGroup({
        plate: new FormControl(car.plate, [Validators.required, Validators.pattern('^[А-Я]{2}[0-9]{4}[А-Я]{2}')]),
        make: new FormControl(car.make, [Validators.required]),
        model: new FormControl(car.model, [Validators.required]),
        year: new FormControl(car.year, [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())])
      });
      (this.form.get('cars') as FormArray).push(control);
    }
  }

  addCar(): void{
    const control = new FormGroup({
      plate: new FormControl('', [Validators.required, Validators.pattern('^[А-Я]{2}[0-9]{4}[А-Я]{2}')]),
      make: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())])
    });
    (this.form.get('cars') as FormArray).push(control);
  }

  submitData(): void{
    const formData = {...this.form.value};
    formData.cars = formData.cars.map((car, index) => ({...car, id: index + 1}));
    console.log(formData);
    if (this.isNew){
      formData.id = Date.now().toString();
      this.apiService.addOwner(formData);
    }else{
      formData.id = this.owner.id;
      this.apiService.editOwner(formData);
    }
    console.log(formData);
    this.router.navigate(['/']);
  }

  removeAuto(index: number): void{
    (this.form.get('cars') as FormArray).removeAt(index);
  }
}
