package com.example.Backend.service.admin;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.UserProfile;
import com.example.Backend.repo.UserRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@NoArgsConstructor
@Service
public class AdminService {

    private UserRepo userRepo;

    @Autowired
    public AdminService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public ResponseMessageDto testAdminService() {
        return new ResponseMessageDto("Admin Service test");
    }

//    get all users
    public List<UserProfile> getAllUsers() {
        List<UserProfile> users = userRepo.findAll();
        if( users.isEmpty()){
            throw new RuntimeException("Users list is empty");
        }
        return users;
    }

}
