package com.github.arseeenyyy.models.request;

public class PointRequest {
    private long userId;
    private double x; 
    private double y; 
    private int r;

    public PointRequest(long userId, double x, double y, int r) {
        this.userId = userId; 
        this.x = x; 
        this.y = y; 
        this.r = r;
    }

    // Getters
    public long getUserId() {
        return userId;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public int getR() {
        return r;
    }

    // Setters
    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(int r) {
        this.r = r;
    }
}
