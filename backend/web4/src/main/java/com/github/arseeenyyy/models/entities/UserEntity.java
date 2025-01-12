package com.github.arseeenyyy.models.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user_lab4")
public class UserEntity implements Serializable {
    @Id
    @GeneratedValue
    private long id; 
    @Column(name = "login", nullable = false, unique = true)
    private String login; 
    @Column(name = "password", nullable = false)
    private String password; 

    public UserEntity() {
        super();
    }
    public void setId(long id) {
        this.id = id;
    }
    public void setLogin(String login) {
        this.login = login;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public long getId() {
        return id;
    }
    public String getLogin() {
        return login;
    }
    public String getPassword() {
        return password;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserEntity that)) return false;
        return this.id == that.id && this.login.equals(that.login) && this.password.equals(that.login);
    }
    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.login, this.password);
    }
    @Override
    public String toString() {
        return String.format("user[id = %d; login = %s; password = %s]", this.id, this.login, this.password);
    }
}