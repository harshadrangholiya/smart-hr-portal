package com.demo.employeeservice.service;

import com.demo.employeeservice.entity.Department;
import com.demo.employeeservice.entity.Employee;
import com.demo.employeeservice.jdbc.DBSource;
import com.demo.employeeservice.repo.DepartmentRepository;
import com.demo.employeeservice.repo.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepo;

    private final DepartmentRepository departmentRepo;

    @Autowired
    private DBSource dbSource;

    public Employee create(Employee employee) {
        Optional<Department> byId = departmentRepo.findById(employee.getDepartment().getId());
        if(byId.isPresent()){
            employee.setDepartment(byId.get());
        }else {
            throw new RuntimeException("Department not found");
        }
        if(employee.getManager()==null){
            employee.setManager(employee);
        }else {
            Optional<Employee> byId1 = employeeRepo.findById(employee.getManager().getId());
            if(byId1.isPresent()){
                Employee employee1 = byId1.get();
                employee.setManager(employee1);
            }else {
                throw new RuntimeException("Manager not found");
            }
        }
        Employee save = employeeRepo.save(employee);
        Long managerId = save.getManager().getId();
        byId.get().setManagerId(managerId);

        departmentRepo.save(byId.get());
        dbSource.updateManagerIdInDepartment(byId.get().getId(),managerId);

        dbSource.insertEmployee(save.getId(), save.getName(), save.getEmail(), save.getDepartment().getId(), save.getManager().getId());
        return save;
    }

    public Employee update(Long id, Employee updated) {
        Employee existing = employeeRepo.findById(id).orElseThrow();
        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setDepartment(updated.getDepartment());
        existing.setManager(updated.getManager());
        return employeeRepo.save(existing);
    }

    public void delete(Long id) {
        dbSource.deleteEmployee(id);
        employeeRepo.deleteById(id);
    }

    public Employee getById(Long id) {
        return employeeRepo.findById(id).orElseThrow();
    }

    public List<Employee> getAll() {
        return employeeRepo.findAll();
    }

    public List<Employee> getAllManager() {
        return employeeRepo.findAll().stream().filter(emp -> emp.getManager()!=null).map(emp -> emp.getManager()).collect(Collectors.toList());
    }
}
