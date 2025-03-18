package com.example.Backend.controller.author;

import com.example.Backend.dto.author.AuthorProfileResponse;
import com.example.Backend.dto.author.RegisterAuthorResponseDto;
import com.example.Backend.dto.book.BookResponse;
import com.example.Backend.dto.book.BookUpdateDto;
import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.AuthorProfile;
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

//    get author profile
    @GetMapping("/get-profile/{authorId}")
    public ResponseEntity<?> getAuthorProfile(@PathVariable Long authorId) {
        try{
            AuthorProfile returnAuthor = authorService.getAuthorProfile(authorId);
            if(returnAuthor == null){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("No Author Profile Found"));
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new AuthorProfileResponse(
                            returnAuthor.getAuthorId(),
                            returnAuthor.getAuthorName(),
                            returnAuthor.getAuthorBio(),
                            returnAuthor.getUserProfile()
                    ));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    update only author profile
    @PutMapping("/update-profile/{authorId}")
    public ResponseEntity<?> updateAuthorProfile(@PathVariable Long authorId,
                                                 @RequestPart AuthorProfile authorProfile,
                                                 @RequestPart(required = false) MultipartFile image) {
        try{
            AuthorProfile returnValue = authorService.updateAuthorProfile(authorId, authorProfile, image);
            if(returnValue != null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new RegisterAuthorResponseDto(
                                returnValue.getAuthorId(),
                                returnValue.getAuthorName(),
                                returnValue.getAuthorBio(),
                                returnValue.getUserProfile()
                        ));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessageDto("No Author Profile Found"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    update book by author
    @PutMapping("/update-book/{authorId}/{bookId}")
    public ResponseEntity<?> updateBookByAuthor(@PathVariable Long authorId,
                                                @PathVariable Long bookId,
                                                @RequestPart(required = false) MultipartFile image,
                                                @RequestPart BookUpdateDto bookUpdateDto) {
        try{
            Book returnValue = authorService.updateBook(bookUpdateDto,image,authorId,bookId);
            if(returnValue != null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new BookResponse(
                                returnValue.getBookId(),
                                returnValue.getBookName(),
                                returnValue.getDescription(),
                                returnValue.getImageName(),
                                returnValue.getPrice(),
                                returnValue.getImageData(),
                                returnValue.getAuthorProfile().getAuthorName()
                        ));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessageDto("No Book Found"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    delete book by author id
    @DeleteMapping("/delete-book/{authorId}/{bookId}")
    public ResponseEntity<?> deleteBookByAuthor(@PathVariable Long authorId,@PathVariable Long bookId) {
        try{
            Book returnValue = authorService.deleteBook(authorId,bookId);
            if(returnValue != null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new ResponseMessageDto(returnValue.getBookName()+" is Deleted"));
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessageDto("error occurred"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }
}
