package com.demo.departmentservice.controller;

import com.demo.departmentservice.constant.Constants;
import com.demo.departmentservice.entity.Department;
import com.demo.departmentservice.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constants.BASE_URL + Constants.DEPARTMENT_URL)
@RequiredArgsConstructor
@Tag(name = "Department Controller", description = "CRUD operations for departments")
@SecurityRequirement(name = "bearerAuth")
public class DepartmentController {

    private final DepartmentService departmentService;
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    @PostMapping
    @Operation(summary = "Create Department", description = "Creates a new department")
    public ResponseEntity<Department> create(@RequestBody Department dept) {
        return ResponseEntity.ok(departmentService.create(dept));
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    @GetMapping
    @Operation(summary = "Get All Departments", description = "Returns a list of all departments")
    public ResponseEntity<List<Department>> getAll() {
        return ResponseEntity.ok(departmentService.getAll());
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    @GetMapping("/{id}")
    @Operation(summary = "Get Department by ID", description = "Returns a single department by ID")
    public ResponseEntity<Department> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getById(id));
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    @PutMapping("/{id}")
    @Operation(summary = "Update Department", description = "Updates an existing department")
    public ResponseEntity<Department> update(@PathVariable Long id, @RequestBody Department dept) {
        return ResponseEntity.ok(departmentService.update(id, dept));
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Department", description = "Deletes a department by ID")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        departmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
