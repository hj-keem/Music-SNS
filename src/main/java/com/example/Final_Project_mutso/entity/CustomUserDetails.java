package com.example.Final_Project_mutso.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    @Getter
    private Long id;

    private String name;
    private String username;
    private String nickname;
    private String password;
    private String phonenumber;
    @Getter
    private String email;
    @Getter
    private String imageurl;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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

    public static CustomUserDetails
    fromEntity(User entity) {
        CustomUserDetails details = new CustomUserDetails();
        details.id = entity.getId();
        details.name = entity.getName();
        details.username = entity.getUsername();
        details.nickname = entity.getNickname();
        details.password = entity.getPassword();
        details.phonenumber = entity.getPhonenumber();
        details.email = entity.getEmail();
        details.imageurl = entity.getImageurl();
        return details;
    }

    public User newEntity() {
        User entity = new User();
        entity.setName(name);
        entity.setUsername(username);
        entity.setNickname(nickname);
        entity.setPassword(password);
        entity.setPhonenumber(phonenumber);
        entity.setEmail(email);
        entity.setImageurl(imageurl);
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
                ", imageurl='" + imageurl + '\'' +
                '}';
    }

}
