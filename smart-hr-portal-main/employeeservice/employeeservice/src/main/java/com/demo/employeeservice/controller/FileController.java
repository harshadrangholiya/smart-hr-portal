package com.demo.employeeservice.controller;

import com.demo.employeeservice.entity.Employee;
import com.demo.employeeservice.entity.EmployeeReport;
import com.demo.employeeservice.repo.EmployeeRepository;
import com.demo.employeeservice.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.demo.employeeservice.constant.Constants.BASE_URL;
import static com.demo.employeeservice.constant.Constants.FILE;

@RestController
@RequestMapping(BASE_URL+FILE)
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;
    private final EmployeeRepository employeeRepository;

    @PostMapping("/upload/{employeeId}")
    public ResponseEntity<EmployeeReport> upload(
            @PathVariable Long employeeId,
            @RequestParam("file") MultipartFile file) throws IOException {

        Employee emp = employeeRepository.findById(employeeId).orElseThrow();
        return ResponseEntity.ok(fileService.saveReport(file, emp));
    }

    @GetMapping("/download-report/{employeeId}")
    public ResponseEntity<Resource> downloadReport(@PathVariable Long employeeId) throws IOException {
        EmployeeReport report = fileService.getLatestReportMeta(employeeId); // new method
        if (report == null || report.getFilePath() == null) {
            return ResponseEntity.notFound().build();
        }

        Path path = Paths.get(report.getFilePath());
        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(path);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(report.getFileType()))  // Use original MIME type
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + report.getFileName() + "\"") // Use original name
                .body(resource);
    }
}
