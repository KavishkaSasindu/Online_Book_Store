package com.example.Backend.service.admin;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.Book;
import com.example.Backend.model.UserProfile;
import com.example.Backend.repo.UserRepo;
import com.example.Backend.repo.WishlistRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
@Service
public class AdminService {

    private UserRepo userRepo;
    private WishlistRepo wishlistRepo;

    @Autowired
    public AdminService(UserRepo userRepo, WishlistRepo wishlistRepo) {
        this.userRepo = userRepo;
        this.wishlistRepo = wishlistRepo;
    }

    public ResponseMessageDto testAdminService() {
        return new ResponseMessageDto("Admin Service test");
    }

//    check exist user
    public UserProfile checkExistUser(Long userId) {
        Optional<UserProfile> user = userRepo.findById(userId);
        return user.orElse(null);
    }


//    get all users
    public List<UserProfile> getAllUsers() {
        List<UserProfile> users = userRepo.findAll();
        if( users.isEmpty()){
            throw new RuntimeException("Users list is empty");
        }
        return users;
    }

//    delete user
    public UserProfile deleteUser(Long userId) {
        UserProfile user = checkExistUser(userId);
        if( user != null){

            user.getWishListBooks().clear();
            userRepo.deleteById(userId);
            return user;
        }

        return null;
    }

}
