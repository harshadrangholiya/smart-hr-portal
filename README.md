![image](https://github.com/user-attachments/assets/c5a41470-b5dd-4b90-a77f-e2052729ae6f)📘 Smart HR Portal
Smart HR Portal is a full-stack application built using:

  🧩 Spring Boot Microservices (authservice, employeeservice, departmentservice)
  🧠 JWT-based Authentication and Role-based Access
  💻 Angular + Bootstrap 4 frontend (smart-hr-ui)
  💾 MySQL database
  📂 File upload module for employee reports

🚀 Features
✅ Backend (Spring Boot Microservices)
  JWT Authentication and role-based authorization
  Department & Employee CRUD (with validation)
  File upload and download for employee reports
  OpenAPI (Swagger) integrated with secured endpoints

✅ Frontend (Angular)
  Login with JWT token handling
  Admin Dashboard:
  Manage Departments & Employees
  Manager Dashboard:
  View & manage employees, upload/download reports
  Employee Dashboard:
  View/edit profile, upload performance report
  Bootstrap 4 responsive layout
  
  Prerequisites
| Layer    | Technology                                                 |
| -------- | ---------------------------------------------------------- |
| Backend  | Java 17, Spring Boot 3.5, Spring Security, Spring Data JPA |
| Frontend | Angular 11, Bootstrap 4                                    |
| Auth     | JWT (JSON Web Token)                                       |
| DB       | MySQL                                                      |
| API Docs | SpringDoc OpenAPI (Swagger UI)                             |

🛠️ Setup Instructions
1. 🔌 Clone the project
      git clone https://github.com/your-username/smart-hr-portal.git
      cd smart-hr-portal
   
2. 🖥️ Frontend Setup
    cd smart-hr-ui/
    npm install
    ng serve
    Frontend will be available at:
    📍 http://localhost:4200

🔐 Swagger URLs (secured with JWT)
    Service	Swagger URL
    Department Service	http://localhost:8083/swagger-ui.html
    Employee Service	http://localhost:8082/swagger-ui.html

📸 Screenshots 
![image](https://github.com/user-attachments/assets/c38aa97d-1933-4089-8156-9c22b7d7f84f)
![image](https://github.com/user-attachments/assets/7746ff16-7d09-47fe-b786-b29f80e3c6fc)
![image](https://github.com/user-attachments/assets/d922fe78-4ec5-4304-a0ab-e541bf77d40a)
![image](https://github.com/user-attachments/assets/c4a46866-65e6-4cf0-9bd6-95d0031eb18b)
![image](https://github.com/user-attachments/assets/f53025f4-ad9d-40bd-bb2e-47b7ed20b16d)





