import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  employees: any[] = [];
  departments: any[] = [];
  employeeForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  loadDepartments(): void {
    this.departmentService.getAll().subscribe(data => this.departments = data);
  }

  submitForm(): void {
    const payload: any = {
      name: this.employeeForm.value.name,
      email: this.employeeForm.value.email,
      department: { id: +this.employeeForm.value.department },
    };
    
    if (this.isEditing) {
      payload.id = this.editingId;
    }
    
    

    if (this.isEditing && this.editingId !== null) {
      this.employeeService.update(this.editingId, payload).subscribe(() => {
        this.loadEmployees();
        this.resetForm();
      });
    } else {
      this.employeeService.create(payload).subscribe(() => {
        this.loadEmployees();
        this.resetForm();
      });
    }
  }

  editEmployee(emp: any): void {
    this.employeeForm.patchValue({
      name: emp.name,
      email: emp.email,
      department: emp.department?.id,
    });
    this.editingId = emp.id;
    this.isEditing = true;
  }

  deleteEmployee(id: number): void {
    this.employeeService.delete(id).subscribe(() => this.loadEmployees());
  }

  resetForm(): void {
    this.employeeForm.reset();
    this.editingId = null;
    this.isEditing = false;
  }
}
