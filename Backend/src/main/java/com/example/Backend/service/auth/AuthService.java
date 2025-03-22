package com.example.Backend.service.auth;

import com.example.Backend.dto.commonDto.LogInRequest;
import com.example.Backend.dto.commonDto.LogInResponseDto;
import com.example.Backend.jwt.JwtService;
import com.example.Backend.model.AuthorProfile;
import com.example.Backend.model.Role;
import com.example.Backend.model.UserProfile;
import com.example.Backend.repo.AuthorRepo;
import com.example.Backend.repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Data
@Service
public class AuthService {

    private final AuthorRepo authorRepo;
    private UserRepo userRepo;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;

    @Autowired
    public AuthService(UserRepo userRepo, AuthorRepo authorRepo,AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepo = userRepo;
        this.authorRepo = authorRepo;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

//    for find exist user
    public UserDetails checkExistUser(String email) {
        return userRepo.findByEmail(email);
    }

//    register normal user
    @Transactional
    public UserProfile registerUser(UserProfile user, MultipartFile image) throws IOException {
        UserDetails existUser =checkExistUser(user.getEmail());
        if (existUser != null) {
            return null;
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setAuthorProfile(user.getAuthorProfile());
        user.setRole(Role.USER);
        if(image!=null){
            user.setImageName(image.getOriginalFilename());
            user.setImageType(image.getContentType());
            user.setImageData(image.getBytes());
        }
        return userRepo.save(user);
    }

//    register author
    @Transactional
    public AuthorProfile registerAuthor(AuthorProfile author, MultipartFile image) throws IOException {
        UserDetails existUser = checkExistUser(author.getUserProfile().getEmail());
        if(existUser != null) {
            return null;
        }
        UserProfile user = new UserProfile();
        user.setFirstname(author.getUserProfile().getFirstname());
        user.setLastname(author.getUserProfile().getLastname());
        user.setPhone(author.getUserProfile().getPhone());
        user.setAddress(author.getUserProfile().getAddress());
        user.setEmail(author.getUserProfile().getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(author.getUserProfile().getPassword()));
        if(image!=null){
            user.setImageName(image.getOriginalFilename());
            user.setImageType(image.getContentType());
            user.setImageData(image.getBytes());
        }
        user.setRole(Role.AUTHOR);
//        first save user
        UserProfile dbUser = userRepo.save(user);

//        then set saved user profile to author profile
        author.setUserProfile(dbUser);

//        after that save author
        return authorRepo.save(author);
    }

//    login author ,admin,user
    @Transactional
    public LogInResponseDto logInUser(LogInRequest logInRequest) {
        UserProfile existUser = (UserProfile) checkExistUser(logInRequest.getEmail());
        if(existUser != null) {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(logInRequest.getEmail(), logInRequest.getPassword()));
            if(authentication.isAuthenticated()) {
                Map<String, Object> claims = new HashMap<>();
                claims.put("role", existUser.getRole());
                claims.put("userId",existUser.getUserId());
                if(existUser.getAuthorProfile()!=null){
                    claims.put("authorId",existUser.getAuthorProfile().getAuthorId());
                }
                claims.put("email",existUser.getEmail());
                String token = jwtService.generateToken(claims,existUser);
                return new LogInResponseDto(
                  logInRequest.getEmail(),
                  existUser.getFirstname()
                  ,
                  token,
                  "LogIn successfully"
                );
            }
        }
        return null;
    }
}
