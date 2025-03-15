package com.example.Backend.service.publicService;

import com.example.Backend.dto.book.BookResponse;
import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.Book;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Data
@RestController
@RequestMapping("/public")
public class PublicController {

    private PublicService publicService;

    @Autowired
    public PublicController(PublicService publicService) {
        this.publicService = publicService;
    }

//    get all books for public visible
    @GetMapping("/all-books")
    public ResponseEntity<?> returnAllBooks() {
        try{
            List<Book> allReturnBooks = publicService.getBooks();
            if (allReturnBooks == null) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ResponseMessageDto("No Books Found"));
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(allReturnBooks);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    get Random
    @GetMapping("/random-book")
    public ResponseEntity<?> returnBookRandom() {
        try{
            List<Book> allReturnBooks = publicService.getLimitBooks();
            if(allReturnBooks == null) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ResponseMessageDto("No Books Found"));
            }
            List<BookResponse> bookResponse = allReturnBooks.stream().map(
                book-> new BookResponse(
                        book.getBookId(),
                        book.getBookName(),
                        book.getDescription(),
                        book.getImageName(),
                        book.getPrice(),
                        book.getImageData(),
                        book.getAuthorProfile().getAuthorName()
                )
            ).toList();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(bookResponse);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    get image for book
    @GetMapping("/one-book/image/{bookId}")
    public ResponseEntity<?> bookImage(@PathVariable Long bookId) {
        try{
            byte[] imageData = publicService.getImageData(bookId);
            if (imageData == null) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ResponseMessageDto("No Image Found"));
            }
            return ResponseEntity.status(HttpStatus.OK)
                    .body(imageData);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }
}
