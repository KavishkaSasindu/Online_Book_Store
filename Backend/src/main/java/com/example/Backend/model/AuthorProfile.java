package com.example.Backend.model.author;

import com.example.Backend.model.user.UserProfile;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "authorId"
)
public class AuthorProfile {

    @Id
    @SequenceGenerator(
            name = "author_id",
            sequenceName = "author_gen",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "author_gen"
    )
    private Long authorId;
    private String authorName;
    private String authorBio;

    @OneToOne
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId",
            nullable = false
    )
    private UserProfile userProfile;
}
