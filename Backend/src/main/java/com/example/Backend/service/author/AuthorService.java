package com.example.Backend.service.author;

import com.example.Backend.model.AuthorProfile;
import com.example.Backend.model.Book;
import com.example.Backend.repo.AuthorRepo;
import com.example.Backend.repo.BookRepo;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Optional<AuthorProfile> authorProfile = authorRepo.findById(authorId);
        return authorProfile.orElse(null);
    }

//    add a book
    @Transactional
    public Book addBook(Book book, MultipartFile image, Long authorId) throws IOException {
        AuthorProfile existingAuthor = checkAuthorExists(authorId);
        if(existingAuthor == null) {
            return null;
        }
        book.setImageName(image.getOriginalFilename());
        book.setImageType(image.getContentType());
        book.setImageData(image.getBytes());
        book.setAuthorProfile(existingAuthor);

        List<Book> books = new ArrayList<>();
        books.add(book);
        existingAuthor.getBooks().addAll(books);

//        save book
       Book savedBook =  bookRepo.save(book);
       authorRepo.save(existingAuthor);

       return savedBook;
    }

//    get all books by author
    public List<Book> getBooks(Long authorId) {
        AuthorProfile existAuthor = checkAuthorExists(authorId);
        if(existAuthor == null) {
            return null;
        }
        return existAuthor.getBooks();
    }
}
