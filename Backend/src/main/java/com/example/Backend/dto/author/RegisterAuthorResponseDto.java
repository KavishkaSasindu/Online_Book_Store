package com.example.Backend.dto.author;

import com.example.Backend.model.user.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterAuthorResponseDto {

    private Long authorId;
    private String authorName;
    private String authorBio;
    private UserProfile userProfile;

}
