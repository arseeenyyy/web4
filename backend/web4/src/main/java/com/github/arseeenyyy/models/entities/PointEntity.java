package com.github.arseeenyyy.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
@Table(name = "point_lab4")
public class PointEntity implements Serializable {
    @Id
    @GeneratedValue
    private long id; 
    @Column(name = "x", nullable = false)
    private double x;
    @Column(name = "y", nullable = false)
    private double y;
    @Column(name = "r", nullable = false)
    private int r;
    @Column(name = "user_id", nullable = false) 
    private long user_id;   
    @Column(name = "isHit", nullable = false) 
    private boolean isHit; 
    @Column(name = "executionTime", nullable = false)
    private long executionTime;
    
    public PointEntity() {
        super();
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
    public void setUserId(long user_id) {
        this.user_id = user_id;
    }
    public void setIsHit(boolean isHit) {
        this.isHit = isHit;
    }
    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }
    public long getId() {
        return id;
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
    public boolean getIsHit() {
        return isHit;
    }
    public long getUserId() {
        return user_id;
    }
    public long getExecutionTime() {
        return executionTime;
    }
    @Override 
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PointEntity that)) return false;
        return this.id == that.id && this.x == that.x && this.y == that.y && this.r == that.r && this.user_id == that.user_id;
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, user_id, x, y, r, isHit, executionTime);
    }
    @Override
    public String toString() {
        return String.format("point[\n" +
                "id = %d;" +
                "user_id = %d;" +
                "x = %f;" +
                "y = %f;" +
                "r = %d;" +
                "hitResult = %b;" +
                "executionTime = %d;" +
                "]", id, user_id, x, y, r, isHit, executionTime);
    }
}