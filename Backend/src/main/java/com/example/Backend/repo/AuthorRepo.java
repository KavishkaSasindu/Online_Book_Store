package com.example.Backend.repo;

import com.example.Backend.model.author.AuthorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepo extends JpaRepository<AuthorProfile,Long> {

}