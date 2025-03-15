package com.example.Backend.controller.auth;

import com.example.Backend.dto.author.RegisterAuthorResponseDto;
import com.example.Backend.dto.commonDto.LogInRequest;
import com.example.Backend.dto.commonDto.LogInResponseDto;
import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.dto.user.RegisterUserResponseDto;
import com.example.Backend.model.author.AuthorProfile;
import com.example.Backend.model.user.UserProfile;
import com.example.Backend.service.auth.AuthService;
import jakarta.annotation.Nullable;
import lombok.Data;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Data
@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/test")
    public String testAuth() {
        return "auth pages";
    }

//    register user
    @PostMapping("/user-register")
    public ResponseEntity<?> registerUser(@RequestPart UserProfile user,@RequestPart(required = false) MultipartFile image) throws IOException {
        try{
            UserProfile returnValue = authService.registerUser(user, image);
            if(returnValue != null) {
                return ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(new RegisterUserResponseDto(
                                returnValue.getUserId(),
                                returnValue.getFirstname(),
                                returnValue.getLastname(),
                                returnValue.getEmail(),
                                returnValue.getPhone(),
                                returnValue.getProfileCreatedAt(),
                                returnValue.getImageName(),
                                returnValue.getImageType(),
                                returnValue.getImageData(),
                                returnValue.getAddress(),
                                returnValue.getAuthorProfile()
                        ));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessageDto("user email already exist"));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    register author
    @PostMapping("/author-register")
    public ResponseEntity<?> registerAuthor(@RequestPart AuthorProfile authorProfile,@RequestPart(required = false) MultipartFile image) throws IOException {
        try{
            AuthorProfile returnValue = authService.registerAuthor(authorProfile, image);
            if(returnValue != null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new RegisterAuthorResponseDto(
                                returnValue.getAuthorId(),
                                returnValue.getAuthorName(),
                                returnValue.getAuthorBio(),
                                returnValue.getUserProfile()
                        ));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessageDto("author profile already exist"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    login user author admin
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody LogInRequest logInRequest) {
        try{
            if(logInRequest.getEmail().isBlank() && logInRequest.getPassword().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessageDto("logInRequest is null"));
            }
            LogInResponseDto response = authService.logInUser(logInRequest);
            if(response != null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(response);
            }
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseMessageDto("Invalid username or password"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }
}
