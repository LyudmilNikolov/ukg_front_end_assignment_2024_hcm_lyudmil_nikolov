import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { EmployeeTableColumn } from '../../constants/employee-table-columns.constants';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule],
  templateUrl: './employee-table.component.html',
})
export class EmployeeTableComponent {
  @Input({ required: true }) employees: Employee[] = [];
  @Input({ required: true }) selection!: SelectionModel<Employee>;
  @Input({ required: true }) displayedColumns: EmployeeTableColumn[] = [];

  constructor() {}

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.employees.length;
    return numSelected === numRows;
  }
  
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.employees.forEach(row => this.selection.select(row));
    }
  }
  
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }  
}
