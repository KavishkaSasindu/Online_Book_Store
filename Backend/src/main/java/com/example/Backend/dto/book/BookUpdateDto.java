package com.example.Backend.dto.book;

import com.example.Backend.model.AuthorProfile;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookUpdateDto {

    private Long bookId;
    private String bookName;
    private String description;
    private Double price;
    private String category;
    private AuthorProfile author;
}
