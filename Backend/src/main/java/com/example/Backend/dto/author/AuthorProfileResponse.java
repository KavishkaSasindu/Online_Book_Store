package com.example.Backend.dto.author;

import com.example.Backend.model.Book;
import com.example.Backend.model.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class AuthorProfileResponse {

    private Long authorId;
    private String authorName;
    private String authorBio;
    private UserProfile userProfile;
    private List<Book> books;
}
