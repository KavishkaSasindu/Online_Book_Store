package com.example.Backend.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "bookId"
)
public class Book {

    @Id
    @SequenceGenerator(
            name = "book_id",
            sequenceName = "book_gen",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "book_gen"
    )
    private Long bookId;
    @Column(
            nullable = false
    )
    private String bookName;
    @Column(
            nullable = false
    )
    private String description;
    @Column(
            nullable = false,
            unique = true
    )
    private String isbn;
    @Column(
            nullable = false
    )
    private Double price;
    @Column(
            nullable = false
    )
    private String imageName;
    @Column(
            nullable = false
    )
    private String imageType;
    @Column(
            nullable = false
    )
    @Lob
    private byte[] imageData;
    @ManyToOne
    @JoinColumn(
            name = "author_id",
            referencedColumnName = "authorId"
    )
    private AuthorProfile authorProfile;
}
