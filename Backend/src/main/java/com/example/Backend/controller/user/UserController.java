package com.example.Backend.controller.user;

import com.example.Backend.dto.book.BookResponse;
import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.Book;
import com.example.Backend.model.UserProfile;
import com.example.Backend.service.user.UserService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private Book book;

    @Autowired
    public UserController(UserService userService, Book book) {
        this.userService = userService;
        this.book = book;
    }

    @GetMapping("/test-user")
    public ResponseEntity<?> testUser() {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessageDto("Hello User"));
    }

    @GetMapping("/get-user-profile/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        try{
            UserProfile retrievedUser = userService.getUserProfile(userId);
            if(retrievedUser == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("User not found"));
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(retrievedUser);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

    @PutMapping("/update-profile/{userId}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long userId,
                                               @RequestPart UserProfile userProfile,
                                               @RequestPart(required = false) MultipartFile image) {
        try{
            UserProfile returnProfile = userService.updateUserProfile(userId,userProfile,image);

            if(returnProfile == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("Error"));
            }

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(returnProfile);
        }catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    get user image
    @GetMapping("/profile-image/{userId}")
    public ResponseEntity<?> userImage(@PathVariable Long userId) {
        try{
            byte[] imageData = userService.userImage(userId);
//            here image can be null so directly send the response from service
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(imageData);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    add book to wishlist
    @PostMapping("/add-wishlist/{userId}/{bookId}")
    public ResponseEntity<?> addBookWishlist(@PathVariable Long userId,@PathVariable Long bookId) {
        try{
            String returnMessage = userService.addBookToWishlist(userId,bookId);
            if(returnMessage == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("Error"));
            }

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(returnMessage);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    get all books from wishlist
    @GetMapping("/get-wishlist/{userId}")
    public ResponseEntity<?> getAllBookWishlist(@PathVariable Long userId) {
        try{
            List<Book> returnValue = userService.getAllBooksFromWishlist(userId);
            if(returnValue == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("Error"));
            }

            List<BookResponse> response = returnValue.stream()
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
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    remove book
    @DeleteMapping("/delete-book-wishlist/{userId}/{bookId}")
    public ResponseEntity<?> removeBookFromWishlist(@PathVariable Long userId,@PathVariable Long bookId) {
        try{
            String returnMessage = userService.deleteBookFromWishlist(userId,bookId);
            if(returnMessage == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseMessageDto("Error"));
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(returnMessage);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }

//    get all books by author id
    @GetMapping("/get-book-author/{authorId}")
    public ResponseEntity<?> getBooksById(@PathVariable Long authorId) {
        try{
            List<Book> returnBooks = userService.getAllBooksByAuthorId(authorId);
            if(returnBooks == null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new ResponseMessageDto("No Books Found"));
            }

            List<BookResponse> bookResponse = returnBooks.stream()
                    .map(book-> new BookResponse(
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
        }catch(Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessageDto(e.getMessage()));
        }
    }
}
