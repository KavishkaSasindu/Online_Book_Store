package com.example.Backend.controller.publicCon;

import com.example.Backend.dto.author.AuthorProfileResponse;
import com.example.Backend.dto.author.AuthorResponseProfile;
import com.example.Backend.dto.book.BookResponse;
import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.AuthorProfile;
import com.example.Backend.model.Book;
import com.example.Backend.repo.AuthorRepo;
import com.example.Backend.service.author.AuthorService;
import com.example.Backend.service.publicService.PublicService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@Data
@RestController
@RequestMapping("/public")
public class PublicController {

    private final AuthorRepo authorRepo;
    private final AuthorService authorService;
    private PublicService publicService;

    @Autowired
    public PublicController(PublicService publicService, AuthorRepo authorRepo, AuthorService authorService) {
        this.publicService = publicService;
        this.authorRepo = authorRepo;
        this.authorService = authorService;
    }

//    get all books for public visible
    @GetMapping("/all-books")
    public ResponseEntity<?> returnAllBooks() {
        try{
            List<Book> returnBook = publicService.getBooks();
            if (returnBook == null) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ResponseMessageDto("No Books Found"));
            }

            List<BookResponse> bookResponse = returnBook.stream()
                    .map(book->new BookResponse(
                            book.getBookId(),
                            book.getBookName(),
                            book.getDescription(),
                            book.getImageName(),
                            book.getPrice(),
                            book.getImageData(),
                            book.getAuthorProfile().getAuthorName(),
                            book.getCategory()
                    )).toList();

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(bookResponse);
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
                        book.getAuthorProfile().getAuthorName(),
                        book.getCategory()
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

//    get book by keyword
    @GetMapping("/search/{bookName}")
    public ResponseEntity<?> getBookByName(@PathVariable String bookName) {
        try{
            List<Book> returnValue = publicService.getBooksByName(bookName);
            if (returnValue == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("No Book Found"));
            }

            List<BookResponse> responseBook = returnValue.stream()
                    .map(book-> new BookResponse(
                            book.getBookId(),
                            book.getBookName(),
                            book.getDescription(),
                            book.getImageName(),
                            book.getPrice(),
                            book.getImageData(),
                            book.getAuthorProfile().getAuthorName(),
                            book.getCategory()
                    ))
                    .toList();

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(responseBook);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }


//    get all authors
    @GetMapping("/all-authors")
    public ResponseEntity<?> getAuthors() {
        try{
            List<AuthorProfile> returnAuthors = publicService.getAllAuthors();
            if (returnAuthors == null) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ResponseMessageDto("No Authors Found"));
            }

            List<AuthorResponseProfile> responseAuthors = returnAuthors.stream()
                    .map(authors->new AuthorResponseProfile(
                            authors.getUserProfile().getUserId(),
                            authors.getAuthorId(),
                            authors.getAuthorName(),
                            authors.getAuthorBio(),
                            authors.getUserProfile().getImageData(),
                            authors.getUserProfile().getEmail()
                    )).toList();

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(responseAuthors);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

}
