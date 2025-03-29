package com.example.Backend.repo;

import com.example.Backend.model.Book;
import com.example.Backend.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepo extends JpaRepository<Book, Long> {
    void deleteByBookId(Long bookId);
}
