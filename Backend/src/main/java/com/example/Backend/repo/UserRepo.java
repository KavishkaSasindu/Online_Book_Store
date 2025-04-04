package com.example.Backend.repo;

import com.example.Backend.model.Book;
import com.example.Backend.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<UserProfile,Long> {
    UserDetails findByEmail(String email);

    List<UserProfile> findByWishListBooksContains(Book book);
}
