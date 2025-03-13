package com.example.Backend.repo;

import com.example.Backend.model.user.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserProfile,Long> {
    UserDetails findByEmail(String email);
}
