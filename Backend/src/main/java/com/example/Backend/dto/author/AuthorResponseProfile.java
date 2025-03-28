package com.example.Backend.dto.author;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthorResponseProfile {

    private Long userId;
    private Long authorId;
    private String authorName;
    private String authorBio;
    private byte[] imageData;
    private String email;
}
