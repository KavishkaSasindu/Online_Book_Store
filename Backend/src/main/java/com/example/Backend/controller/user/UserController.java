package com.example.Backend.controller.user;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Data
@NoArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/test-user")
    public ResponseEntity<?> testUser() {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessageDto("Hello User"));
    }
}
