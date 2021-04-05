import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BehaviorSubject, Observable } from 'rxjs';
import { OwnerEntity } from 'src/app/interfaces/owner';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InMemOwnerService implements InMemoryDbService {
  private owners: BehaviorSubject<OwnerEntity[]> = new BehaviorSubject<OwnerEntity[]>([]);
  http: HttpClient;
  constructor(private inject: Injector) {}
  createDb(): DbCreated{
    this.http = this.inject.get(HttpClient);
    const owners: OwnerEntity[] = [
      {
        id: '1',
        fName: 'John',
        lName: 'Doe',
        mName: 'Andriyovych',
        cars: [
          {
            id: '1',
            plate: 'АХ1925АВ',
            make: 'Audi',
            model: 'Q7',
            year: 2002,
          }
        ],
      },
      {
        id: '2',
        fName: 'John2',
        lName: 'Doe2',
        mName: 'Andriyovych2',
        cars: [
          {
            id: '1',
            plate: 'АА3450ВХ',
            make: 'Audi',
            model: 'Q8',
            year: 2021,
          }
        ],
      }
    ];
    return {owners};
  }

  getOwners(): Observable<OwnerEntity[]>{
      this.httpChecker();
      this.http.get<OwnerEntity[]>('api/owners').subscribe(owners => this.owners.next(owners));
      return this.owners.asObservable();

  }
  getOwnerById(aId: string): Observable<OwnerEntity>{
    return this.getOwners().pipe(
      map(owner => owner.find(o => o.id === aId)));
  }

  addOwner(owner: OwnerEntity): void{
    this.httpChecker();
    this.http.post<OwnerEntity>('api/owners', owner).subscribe(ownerData => {this.owners.next([...this.owners.value, ownerData]); });
  }

  deleteOwner(ownerId: string ): void{
    this.httpChecker();
    const url = `api/owners/${ownerId}`;
    this.http.delete<OwnerEntity>(url);
    const newObj = this.owners.value.filter(o => o.id !== ownerId);
    this.owners.next(newObj);
  }

  editOwner(owner: OwnerEntity): void{
    this.httpChecker();
    const id = owner.id;
    this.http.put<OwnerEntity>(`api/owners/${id}`, owner).subscribe(ownerData => {
      if (ownerData){ // response status or another error check...
        this.owners.next([...this.owners.value.filter(o => o.id !== owner.id), ownerData]);
      }else{// put in this api doesnt return the data back and patch isnt allowed
        this.owners.next([...this.owners.value.filter(o => o.id !== owner.id), ownerData]);
      }
    });

  }
  httpChecker(): void{// костыль(при использовании инициализации http в конструкторе выдает circular dependency)
    if (!this.http){
      this.http = this.inject.get(HttpClient);
    }
  }
}

interface DbCreated{
  owners: OwnerEntity[];
}
