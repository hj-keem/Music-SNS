package com.example.Final_Project_mutso.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@SuperBuilder

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String content;

    private String time;

    public Comment() {

    }
}
