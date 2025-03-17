package com.example.Backend.dto.author;

import com.example.Backend.model.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AuthorProfileResponse {

    private Long authorId;
    private String authorName;
    private String authorBio;
    private UserProfile userProfile;
}
