package com.example.Backend.controller.user;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.UserProfile;
import com.example.Backend.service.user.UserService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/test-user")
    public ResponseEntity<?> testUser() {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessageDto("Hello User"));
    }

    @GetMapping("/get-user-profile/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        try{
            UserProfile retrievedUser = userService.getUserProfile(userId);
            if(retrievedUser == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("User not found"));
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(retrievedUser);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

    @PutMapping("/update-profile/{userId}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long userId,
                                               @RequestPart UserProfile userProfile,
                                               @RequestPart(required = false) MultipartFile image) {
        try{
            UserProfile returnProfile = userService.updateUserProfile(userId,userProfile,image);

            if(returnProfile == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("Error"));
            }

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(returnProfile);
        }catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

}
