package com.example.Backend.dto.book;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class BookResponse {

    private Long bookId;
    private String bookName;
    private String description;
    private String imageName;
    private Double price;
    private byte[] imageData;
    private String author;
    private String category;
}
