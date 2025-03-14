package com.example.Backend.dto.user;

import com.example.Backend.model.author.AuthorProfile;
import com.example.Backend.model.embedd.Address;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class RegisterUserResponseDto {

    private Long userId;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private LocalDateTime createdAt;
    private String imageName;
    private String imageType;
    private byte[] imageData;
    private Address address;
    private AuthorProfile authorProfile;
}
