package com.example.Backend.service.publicService;

import com.example.Backend.model.AuthorProfile;
import com.example.Backend.model.Book;
import com.example.Backend.repo.AuthorRepo;
import com.example.Backend.repo.BookRepo;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Data
@Service
public class PublicService {

    private final BookRepo bookRepo;
    private final AuthorRepo authorRepo;

    //    get all books
    public List<Book> getBooks() {
        List<Book> books = bookRepo.findAll();
        if(books.isEmpty()) {
            return null;
        }
        return books;
    }

//    get 10 books
    public List<Book> getLimitBooks() {
        List<Book> books = bookRepo.findRandomBooks();
        if(books.isEmpty()) {
            return null;
        }
        return books;
    }

//    get image by bookId
    public byte[] getImageData(Long bookId) {
        Book book = bookRepo.findById(bookId).get();
        return book.getImageData();
    }

//    search by bokName name
    public List<Book> getBooksByName(String keyword) {
        List<Book> findBooks = bookRepo.findByBookNameContains(keyword);
        if(findBooks.isEmpty()) {
            return null;
        }
        return findBooks;
    }

//    get all authors
    public List<AuthorProfile> getAllAuthors() {
        List<AuthorProfile> allAuthors = authorRepo.findAll();
        if(allAuthors.isEmpty()) {
            return null;
        }
        return allAuthors;
    }
}
