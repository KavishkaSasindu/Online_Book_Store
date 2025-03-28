package com.example.Backend.service.user;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.AuthorProfile;
import com.example.Backend.model.Book;
import com.example.Backend.model.UserProfile;
import com.example.Backend.repo.AuthorRepo;
import com.example.Backend.repo.BookRepo;
import com.example.Backend.repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Data
@Service
@NoArgsConstructor
public class UserService {

    private UserRepo userRepo;
    private BookRepo bookRepo;
    private AuthorRepo authorRepo;

    @Autowired
    public UserService(UserRepo userRepo, BookRepo bookRepo, AuthorRepo authorRepo) {
        this.userRepo = userRepo;
        this.bookRepo = bookRepo;
        this.authorRepo = authorRepo;
    }

//    check user exist
    public UserProfile checkUserExist(Long userId) {
        Optional<UserProfile> user = userRepo.findById(userId);
        return user.orElse(null);
    }

//    get user details by user id
    public UserProfile getUserProfile(Long userId) {

//        find that user present in database
        Optional<UserProfile> userProfile = userRepo.findById(userId);
        if(userProfile.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return userProfile.get();
    }

//    get one user image
    public byte[] userImage(Long userId) {
        Optional<UserProfile> userProfile = userRepo.findById(userId);
        if(userProfile.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return userProfile.get().getImageData();
    }

//    update user profile
    @Transactional
    public UserProfile updateUserProfile(Long userId, UserProfile userProfile, MultipartFile image) throws IOException {

//        find that user exist
        Optional<UserProfile> existUser = userRepo.findById(userId);

        if(existUser.isEmpty()) {
            throw new RuntimeException(String.valueOf(new ResponseMessageDto("User not found")));
        }

//      check the request objects are null
        if(userProfile == null) {
            return existUser.get();
        }

        UserProfile existUserProfile = existUser.get();

        if(image != null && !image.isEmpty()) {
            existUserProfile.setImageData(image.getBytes());
            existUserProfile.setImageName(image.getOriginalFilename());
            existUserProfile.setImageType(image.getContentType());
        }

        if (userProfile.getFirstname() != null) {
            existUserProfile.setFirstname(userProfile.getFirstname());
        }
        if (userProfile.getLastname() != null) {
            existUserProfile.setLastname(userProfile.getLastname());
        }
        if (userProfile.getEmail() != null) {
            existUserProfile.setEmail(userProfile.getEmail());
        }
        if (userProfile.getPhone() != null) {
            existUserProfile.setPhone(userProfile.getPhone());
        }
        if (userProfile.getAddress() != null) {
            existUserProfile.setAddress(userProfile.getAddress());
        }
        existUserProfile.setAuthorProfile(existUserProfile.getAuthorProfile());

        return existUser.get();
    }

//    add book to wishlist
    public String addBookToWishlist(Long userId, Long bookId) {

//        find user exist in db
        Optional<UserProfile> userProfile = userRepo.findById(userId);
        if(userProfile.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        UserProfile userProfile1 = userProfile.get();

//        then find book is present
        Optional<Book> existBook = bookRepo.findById(bookId);
        if(existBook.isEmpty()) {
            throw new RuntimeException("Book not found");
        }
        Book book = existBook.get();

        if(userProfile1.getWishListBooks().contains(book)) {
            throw new RuntimeException("Wishlist already exists");
        }
        userProfile1.getWishListBooks().add(book);
        userRepo.save(userProfile1);
        return "Added book to wishlist";
    }

//    get all books in wishlist
    public List<Book>  getAllBooksFromWishlist(Long userId) {
        Optional<UserProfile> userProfile = userRepo.findById(userId);
        if(userProfile.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        UserProfile userProfile1 = userProfile.get();
        List<Book> books = userProfile1.getWishListBooks();
        if(books.isEmpty()) {
            return null;
        }
        return books;
    }

//    remove book from wish list
    public String deleteBookFromWishlist(Long userId, Long bookId) {
        Optional<UserProfile> userProfile = userRepo.findById(userId);
        if(userProfile.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        UserProfile userProfile1 = userProfile.get();
        Optional<Book> existBook = bookRepo.findById(bookId);
        if(existBook.isEmpty()) {
            throw new RuntimeException("Book not found");
        }
        Book book = existBook.get();
        List<Book> books = userProfile1.getWishListBooks();
        if(books.isEmpty()){
            throw new RuntimeException("Wishlist does not exist");
        }
        userProfile1.getWishListBooks().remove(book);
        userRepo.save(userProfile1);
        return "Deleted Book from Wishlist";
    }

//    get author books by id
    public List<Book> getAllBooksByAuthorId(Long authorId) {
        Optional<AuthorProfile> authorProfile = authorRepo.findById(authorId);
        if(authorProfile.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        List<Book> allBooks = authorProfile.get().getBooks();
        if(allBooks.isEmpty()) {
            return null;
        }
        return allBooks;
    }
}
