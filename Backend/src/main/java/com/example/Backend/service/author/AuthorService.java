package com.example.Backend.service.author;

import com.example.Backend.dto.book.BookUpdateDto;
import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.AuthorProfile;
import com.example.Backend.model.Book;
import com.example.Backend.model.UserProfile;
import com.example.Backend.repo.AuthorRepo;
import com.example.Backend.repo.BookRepo;
import com.example.Backend.repo.UserRepo;
import com.example.Backend.repo.WishlistRepo;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Data
@Service
public class AuthorService {

    private final WishlistRepo wishlistRepo;
    private final UserRepo userRepo;
    private BookRepo bookRepo;
    private AuthorRepo authorRepo;

    @Autowired
    public AuthorService(BookRepo bookRepo, AuthorRepo authorRepo, WishlistRepo wishlistRepo, UserRepo userRepo) {
        this.bookRepo = bookRepo;
        this.authorRepo = authorRepo;
        this.wishlistRepo = wishlistRepo;
        this.userRepo = userRepo;
    }

    public AuthorProfile checkAuthorExists(Long authorId) {
        if(authorId == null) {
            return null;
        }
        return authorRepo
                .findById(authorId)
                .orElseThrow(()->new RuntimeException("Author not found"));
    }

//    add a book
    @Transactional
    public Book addBook(Book book, MultipartFile image, Long authorId) throws Exception {
        AuthorProfile existingAuthor = checkAuthorExists(authorId);
        if(image != null) {
            book.setImageName(image.getOriginalFilename());
            book.setImageType(image.getContentType());
            book.setImageData(image.getBytes());
            book.setAuthorProfile(existingAuthor);

        }


        return bookRepo.save(book);
    }

//    get all books by author
    public List<Book> getBooks(Long authorId) {
        AuthorProfile existAuthor = checkAuthorExists(authorId);
        if(existAuthor == null) {
            return null;
        }
        return existAuthor.getBooks();
    }

//    author get profile
    public AuthorProfile getAuthorProfile(Long authorId) {
        AuthorProfile existAuthor = checkAuthorExists(authorId);
        if(existAuthor == null) {
            return null;
        }
        return existAuthor;
    }

//    update author profile only
    @Transactional
    public AuthorProfile updateAuthorProfile(Long authorId, AuthorProfile authorProfile, MultipartFile image) throws Exception {
        AuthorProfile existingAuthor = checkAuthorExists(authorId);
        if(existingAuthor == null) {
            return null;
        }
        existingAuthor.setAuthorBio(authorProfile.getAuthorBio());
        existingAuthor.setAuthorName(authorProfile.getAuthorName());

        if(image != null) {
            existingAuthor.getUserProfile().setImageName(image.getOriginalFilename());
            existingAuthor.getUserProfile().setImageType(image.getContentType());
            existingAuthor.getUserProfile().setImageData(image.getBytes());
        }

        UserProfile existingUserProfile = existingAuthor.getUserProfile();
        if(existingUserProfile == null) {
           return null;
        }

        UserProfile user = authorProfile.getUserProfile();
        if(user != null) {
            existingUserProfile.setFirstname(user.getFirstname());
            existingUserProfile.setLastname(user.getLastname());
            existingUserProfile.setEmail(user.getEmail());
            existingUserProfile.setPhone(user.getPhone());
            existingUserProfile.setAddress(user.getAddress());
        }else{
            existingAuthor.setUserProfile(existingUserProfile);
        }

        return authorRepo.save(existingAuthor);

    }

//    update a book by author
    @Transactional
    public Book updateBook(BookUpdateDto book, MultipartFile image, Long authorId, Long bookId) throws Exception {
//        first check author is existed
        AuthorProfile existingAuthor = checkAuthorExists(authorId);
        if(existingAuthor == null) {
            return null;
        }

//        then check book is existed
        Optional<Book> existingBook = bookRepo.findById(bookId);
        if(existingBook.isEmpty()){
            return null;
        }

//        check book owned by requested author
        if(!Objects.equals(existingBook.get().getAuthorProfile().getAuthorId(), authorId)){
            throw new RuntimeException(String.valueOf(new ResponseMessageDto("Author not belongs to this book")));
        }

        existingBook.get().setBookName(book.getBookName());
        existingBook.get().setDescription(book.getDescription());
        existingBook.get().setPrice(book.getPrice());
        existingBook.get().setCategory(book.getCategory());

        if(image != null && !image.isEmpty()) {
            existingBook.get().setImageName(image.getOriginalFilename());
            existingBook.get().setImageType(image.getContentType());
            existingBook.get().setImageData(image.getBytes());
        }
            existingBook.get().setImageName(existingBook.get().getImageName());
            existingBook.get().setImageType(existingBook.get().getImageType());
            existingBook.get().setImageData(existingBook.get().getImageData());


        existingBook.get().setAuthorProfile(existingAuthor);
        return bookRepo.save(existingBook.get());
    }

//    delete book for author
    @Transactional
    public Book deleteBook(Long authorId,Long bookId) throws Exception {

//        find author exist
        AuthorProfile existingAuthor = checkAuthorExists(authorId);
        if(existingAuthor == null) {
            throw new RuntimeException("Author not found");
        }

//        find book
        Optional<Book> existingBook = bookRepo.findById(bookId);
        if(existingBook.isEmpty()) {
            throw new RuntimeException("Book not found");
        }

        Book book = existingBook.get();
        //        find author belongs that book
        if(!Objects.equals(book.getAuthorProfile().getAuthorId(), existingAuthor.getAuthorId())) {
            throw new RuntimeException(String.valueOf(new ResponseMessageDto("Author not belongs to this book")));
        }
        // Remove book from all wishlists FIRST
        List<UserProfile> usersWithBookInWishlist = userRepo.findByWishListBooksContains(book);
        usersWithBookInWishlist.forEach(user ->
                user.getWishListBooks().remove(book)
        );
        userRepo.saveAll(usersWithBookInWishlist);

        bookRepo.delete(book);

        return book;
    }

}
