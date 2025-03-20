package com.example.Backend.service.user;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import com.example.Backend.model.UserProfile;
import com.example.Backend.repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Data
@Service
@NoArgsConstructor
public class UserService {

    private UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

//    get user details by user id
    public UserProfile getUserProfile(Long userId) {

//        find that user present in database
        Optional<UserProfile> userProfile = userRepo.findById(userId);
        if(userProfile.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return userProfile.get();
    }

//    update user profile
    @Transactional
    public UserProfile updateUserProfile(Long userId, UserProfile userProfile, MultipartFile image) throws IOException {

//        find that user exist
        Optional<UserProfile> existUser = userRepo.findById(userId);

        if(existUser.isEmpty()) {
            throw new RuntimeException(String.valueOf(new ResponseMessageDto("User not found")));
        }

//      check the request objects are null
        if(userProfile == null) {
            return existUser.get();
        }

        UserProfile existUserProfile = existUser.get();

        if(image != null && !image.isEmpty()) {
            existUserProfile.setImageData(image.getBytes());
            existUserProfile.setImageName(image.getOriginalFilename());
            existUserProfile.setImageType(image.getContentType());
        }

        if (userProfile.getFirstname() != null) {
            existUserProfile.setFirstname(userProfile.getFirstname());
        }
        if (userProfile.getLastname() != null) {
            existUserProfile.setLastname(userProfile.getLastname());
        }
        if (userProfile.getEmail() != null) {
            existUserProfile.setEmail(userProfile.getEmail());
        }
        if (userProfile.getPhone() != null) {
            existUserProfile.setPhone(userProfile.getPhone());
        }
        if (userProfile.getAddress() != null) {
            existUserProfile.setAddress(userProfile.getAddress());
        }
        existUserProfile.setAuthorProfile(existUserProfile.getAuthorProfile());

        return existUser.get();
    }
}
