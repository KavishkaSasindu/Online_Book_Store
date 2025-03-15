package com.example.Backend.repo;

import com.example.Backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepo extends JpaRepository<Book, Long> {

//    search by book name
    public List<Book> findByBookNameContains(String keyword);

//    ten limit
    @Query(value = "SELECT * FROM book ORDER BY RANDOM() LIMIT 10", nativeQuery = true)
    List<Book> findRandomBooks();
}
