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
  selectedFile: File | null = null;
  selectedEmployeeId: number | null = null;

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
      id: this.editingId || 0,
      name: this.employeeForm.value.name,
      email: this.employeeForm.value.email,
      department: { id: +this.employeeForm.value.department },
    };
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

  onFileSelected(event: any, empId: number): void {
    this.selectedFile = event.target.files[0];
    this.selectedEmployeeId = empId;
  }

  uploadReport(): void {
    if (this.selectedFile && this.selectedEmployeeId != null) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.employeeService.uploadReport(this.selectedEmployeeId, formData).subscribe(() => {
        alert('Report uploaded successfully.');
        this.selectedFile = null;
        this.selectedEmployeeId = null;
        this.loadEmployees();
        this.resetForm();
      });
    }
  }
  
  downloadReport(empId: number) {
    this.employeeService.downloadReport(empId).subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `report_${empId}`;  // No .pdf or .docx forced here
      link.click();
    });
  }
  
}
