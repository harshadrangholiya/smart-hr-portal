import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  departments: any[] = [];
  employees: any[] = [];

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe(data => this.departments = data);
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  deleteDepartment(id: number) {
    this.departmentService.delete(id).subscribe(() => this.loadDepartments());
  }

  deleteEmployee(id: number) {
    this.employeeService.delete(id).subscribe(() => this.loadEmployees());
  }

}
