package com.example.Backend.controller.author;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import lombok.Data;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Data
@RestController
@RequestMapping("/author")
public class AuthorController {

    @GetMapping("/test-author")
    public ResponseEntity<?> testAuthor() {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessageDto("Hello Author"));
    }
}
