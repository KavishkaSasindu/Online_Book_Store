package com.example.Backend.controller.admin;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.UserProfile;
import com.example.Backend.service.admin.AdminService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Data
@RestController
@RequestMapping("/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/test")
    public ResponseEntity<?> testAdminController() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDto("Admin Controller test"));
    }

//    get users
    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers() {
        try{
            List<UserProfile> returnUsers = adminService.getAllUsers();
            if(returnUsers.isEmpty()){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("Users list is empty"));
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(returnUsers);
        }catch(Exception e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }
}
