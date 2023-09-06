package com.example.Final_Project_mutso.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    @Getter
    private Long id;

    @Getter
    private String name;
    private String username;
    @Getter
    private String nickname;
    private String password;
    @Getter
    private String phonenumber;
    @Getter
    private String email;
    @Getter
    private UserEntity userEntity;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
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

//    public static CustomUserDetails
//    fromEntity(UserEntity entity) {
//        CustomUserDetails details = new CustomUserDetails();
//        details.id = entity.getId();
//        details.name = entity.getName();
//        details.username = entity.getUsername();
//        details.nickname = entity.getNickname();
//        details.password = entity.getPassword();
//        details.phonenumber = entity.getPhonenumber();
//        details.email = entity.getEmail();
//        details.userEntity = entity;
//        return details;
//    }

    public static CustomUserDetails fromEntity(UserEntity userEntity) {
        return CustomUserDetails.builder()
                .id(userEntity.getId())
                .name(userEntity.getName())
                .username(userEntity.getUsername())
                .nickname(userEntity.getNickname())
                .password(userEntity.getPassword())
                .phonenumber(userEntity.getPhonenumber())
                .email(userEntity.getEmail())
                .userEntity(userEntity)
                .build();
    }

    public UserEntity newEntity() {
        UserEntity entity = new UserEntity();
        entity.setName(name);
        entity.setUsername(username);
        entity.setNickname(nickname);
        entity.setPassword(password);
        entity.setPhonenumber(phonenumber);
        entity.setEmail(email);
        return entity;
    }

    @Override
    public String toString() {
        return "CustomUserDetails{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", nickname='" + nickname + '\'' +
                ", password='[PROTECTED]'" +
                ", phonenumber='" + phonenumber + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
