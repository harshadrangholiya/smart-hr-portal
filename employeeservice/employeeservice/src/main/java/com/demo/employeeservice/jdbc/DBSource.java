package com.demo.employeeservice.jdbc;

import com.demo.employeeservice.config.EnvParser;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Component
public class DBSource {

    @Autowired
    private EnvParser parser;

    private String dbUrl;
    private String dbUser;
    private String dbPass;

    @PostConstruct
    private void init() {
        dbUrl = parser.getDbUrl();      // Example: "jdbc:mysql://localhost:3306/dbname"
        dbUser = parser.getDbUser();
        dbPass = parser.getDbPassword();
    }

    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(dbUrl, dbUser, dbPass);
    }


    public void insertEmployee(Long id, String name, String email, Long departmentId, Long managerId) {
        String sql = "INSERT INTO employee (id,name, email, department_id, manager_id) VALUES (?, ?, ?, ?,?)";

        try (Connection conn = getConnection();  // Use your DBSource to get connection
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            stmt.setString(2, name);
            stmt.setString(3, email);
            stmt.setLong(4, departmentId);
            stmt.setLong(5, managerId);


            int rowsInserted = stmt.executeUpdate();

            if (rowsInserted > 0) {
                System.out.println("A new department was inserted successfully!");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void updateManagerIdInDepartment(Long deptId, Long managerId) {
        String sql = "UPDATE department SET manager_id = ? WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, managerId);
            stmt.setLong(2, deptId);

            int rowsUpdated = stmt.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("Department ID " + deptId + " updated with manager ID " + managerId + " successfully!");
            } else {
                System.out.println("No department found with ID " + deptId);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }




    public void deleteEmployee(Long id) {
        String sql = "DELETE FROM employee WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            int rowsDeleted = stmt.executeUpdate();

            if (rowsDeleted > 0) {
                System.out.println("Department with ID " + id + " was deleted successfully!");
            } else {
                System.out.println("No department found with ID: " + id);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
