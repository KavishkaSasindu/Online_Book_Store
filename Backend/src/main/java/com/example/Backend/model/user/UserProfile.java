package com.example.Backend.model.user;

import com.example.Backend.model.embedd.Address;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserProfile implements UserDetails {

    @Id
    @SequenceGenerator(
            name = "user_id",
            sequenceName = "user_gen",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_gen"
    )
    private Long userId;
    private String firstname;
    private String lastname;
    @Column(
            nullable = false,
            unique = true
    )
    private String email;
    @Column(
            nullable = false,
            unique = true
    )
    private String password;
    private String phone;
    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;
    @Column(
            nullable = false,
            updatable = false
    )
    private LocalDateTime profileCreatedAt;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Address address;

    @PrePersist
    public void onCreate() {
        profileCreatedAt = LocalDateTime.now();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
