import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerEntity } from '../interfaces/owner';
import { InMemOwnerService } from '../services/inMemoryApi/in-memory-api.service';

@Component({
  selector: 'app-owners-table',
  templateUrl: './owners-table.component.html',
  styleUrls: ['./owners-table.component.scss']
})

export class OwnersTableComponent implements OnInit {

  public owners: OwnerEntity[];
  public currentInTable: number;

  constructor(private apiService: InMemOwnerService, private router: Router) { }

  ngOnInit(): void {
    console.log('init');
    this.apiService.getOwners().subscribe(owners => this.owners = owners);
    console.log(this.owners);
  }

  setCurrent(id: number): void {
    if (this.currentInTable === id){
      this.currentInTable = null;
    }else{
      this.currentInTable = id;
    }
  }

  calculateActive(id: number): RowData{
    if (this.currentInTable === id){
      return{current: true, row: true};
    }else{
      return {current: false, row: true};
    }
  }

  deleteOwner(): void {
    if (this.currentInTable){
      this.apiService.deleteOwner(this.currentInTable.toString());
      this.currentInTable = null;
    }
  }

  navigateToForm(): void {
    this.router.navigate(['/owners', this.currentInTable]);
  }

  navigateToFormAdd(): void {
    this.router.navigate(['/owners', 'new']);
  }
}

interface RowData{
  row: boolean;
  current: boolean;
}
