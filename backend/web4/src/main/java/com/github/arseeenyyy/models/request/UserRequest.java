package com.github.arseeenyyy.models.request;

public class UserRequest {
    private String login;
    private String password;
    
    public String getLogin() {
        return login;
    }
    public String getPassword() {
        return password;
    }
    public void setLogin(String login) {
        this.login = login;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}