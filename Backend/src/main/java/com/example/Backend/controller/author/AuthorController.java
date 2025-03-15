package com.example.Backend.controller.author;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.Book;
import com.example.Backend.service.author.AuthorService;
import lombok.Data;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@RestController
@RequestMapping("/author")
public class AuthorController {

    private final AuthorService authorService;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping("/test-author")
    public ResponseEntity<?> testAuthor() {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessageDto("Hello Author"));
    }

//    add a book
    @PostMapping("/add-book/{authorId}")
    public ResponseEntity<?> addBook(
            @RequestPart Book book,
            @RequestPart MultipartFile image, @PathVariable Long authorId) {
        try{
            Book returnValue = authorService.addBook(book, image, authorId);
            if(returnValue != null) {
                return ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(returnValue);
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessageDto("Book not added"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    get all books by author id
    @GetMapping("/{authorId}/all-books")
    public ResponseEntity<?> getAllBooksByAuthorId(@PathVariable Long authorId) {
        try{
            List<Book> returnAllBooks = authorService.getBooks(authorId);
            if(returnAllBooks == null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new ResponseMessageDto("No Books Found"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(returnAllBooks);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }
}
