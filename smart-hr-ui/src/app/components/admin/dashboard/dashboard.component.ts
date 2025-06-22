import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  departmentForm: FormGroup;
  employeeForm: FormGroup;
  isEditingDepartment = false;
  isEditingEmployee = false;
  selectedDepartmentId: number | null = null;
  selectedEmployeeId: number | null = null;
  managers: any[]=[];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      managerId: [0]
    });

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      manager: ['']
    });
  }

  ngOnInit() {
    this.loadDepartments();
    this.loadEmployees();
    this.loadManagers();
  }

  loadManagers() {
    this.employeeService.getAllManagers().subscribe(data => this.managers = data);
  }

  // Department Section
  loadDepartments() {
    this.departmentService.getAll().subscribe(data => this.departments = data);
  }

  saveDepartment() {
    const payload = this.departmentForm.value;
    if (this.isEditingDepartment && this.selectedDepartmentId != null) {
      this.departmentService.update(this.selectedDepartmentId, payload).subscribe(() => {
        this.resetDepartmentForm();
        this.loadDepartments();
      });
    } else {
      this.departmentService.create(payload).subscribe(() => {
        this.resetDepartmentForm();
        this.loadDepartments();
      });
    }
  }

  editDepartment(dept: any) {
    this.departmentForm.patchValue(dept);
    this.selectedDepartmentId = dept.id;
    this.isEditingDepartment = true;
  }

  deleteDepartment(id: number) {
    this.departmentService.delete(id).subscribe(() => this.loadDepartments());
  }

  resetDepartmentForm() {
    this.departmentForm.reset();
    this.isEditingDepartment = false;
    this.selectedDepartmentId = null;
  }

  // Employee Section
  loadEmployees() {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  saveEmployee() {
    const payload: any = {
      name: this.employeeForm.value.name,
      email: this.employeeForm.value.email,
      department: { id: +this.employeeForm.value.department },
      manager: this.employeeForm.value.manager ? { id: +this.employeeForm.value.manager } : null
    };

    if (this.isEditingEmployee && this.selectedEmployeeId != null) {
      this.employeeService.update(this.selectedEmployeeId, payload).subscribe(() => {
        this.resetEmployeeForm();
        this.loadEmployees();
      });
    } else {
      this.employeeService.create(payload).subscribe(() => {
        this.resetEmployeeForm();
        this.loadEmployees();
      });
    }
  }

  editEmployee(emp: any) {
    this.employeeForm.patchValue({
      name: emp.name,
      email: emp.email,
      department: emp.department?.id,
      manager: emp.manager?.id || ''
    });
    this.selectedEmployeeId = emp.id;
    this.isEditingEmployee = true;
  }

  deleteEmployee(id: number) {
    this.employeeService.delete(id).subscribe(() => this.loadEmployees());
  }

  resetEmployeeForm() {
    this.employeeForm.reset();
    this.isEditingEmployee = false;
    this.selectedEmployeeId = null;
  }
}
