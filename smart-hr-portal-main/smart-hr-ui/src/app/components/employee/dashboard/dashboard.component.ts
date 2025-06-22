import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  departments: any[] = [];
  departmentForm: FormGroup;
  isDeptEditing = false;
  editingDeptId: number | null = null;
  managers: any[] = [];

  constructor(private fb: FormBuilder, private departmentService: DepartmentService,private employeeService:EmployeeService) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      managerId: [0]
    });
  }

  ngOnInit() {
    this.loadDepartments();
    this.loadManagers();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe(data => this.departments = data);
  }
  loadManagers() {
    this.employeeService.getAllManagers().subscribe(data => this.managers = data);
  }

  submitDepartmentForm() {
    if (this.isDeptEditing && this.editingDeptId !== null) {
      this.departmentService.update(this.editingDeptId, this.departmentForm.value)
        .subscribe(() => {
          this.loadDepartments();
          this.resetDeptForm();
        });
    } else {
      this.departmentService.create(this.departmentForm.value)
        .subscribe(() => {
          this.loadDepartments();
          this.resetDeptForm();
        });
    }
  }

  editDepartment(dept: any) {
    this.departmentForm.patchValue(dept);
    this.editingDeptId = dept.id;
    this.isDeptEditing = true;
  }

  deleteDepartment(id: number) {
    this.departmentService.delete(id).subscribe(() => this.loadDepartments());
  }

  resetDeptForm() {
    this.departmentForm.reset();
    this.isDeptEditing = false;
    this.editingDeptId = null;
  }
}

