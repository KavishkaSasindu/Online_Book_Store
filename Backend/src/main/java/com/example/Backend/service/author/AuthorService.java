package com.example.Backend.service.author;

import com.example.Backend.model.AuthorProfile;
import com.example.Backend.model.Book;
import com.example.Backend.model.UserProfile;
import com.example.Backend.model.embedd.Address;
import com.example.Backend.repo.AuthorRepo;
import com.example.Backend.repo.BookRepo;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Service
public class AuthorService {

    private BookRepo bookRepo;
    private AuthorRepo authorRepo;

    @Autowired
    public AuthorService(BookRepo bookRepo, AuthorRepo authorRepo) {
        this.bookRepo = bookRepo;
        this.authorRepo = authorRepo;
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
}
