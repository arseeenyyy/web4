package com.github.arseeenyyy.models.response;

import java.util.List;

public class PointsResponse {
    private String message;
    private List<PointResponse> points;






    public static class PointResponse {
        private double x; 
        private double y; 
        private int r;
        private long executionTime; 
        private boolean isHit;
        
        public PointResponse(double x, double y, int r, long executionTime, boolean isHit) {
            this.x = x; 
            this.y = y; 
            this.r = r;
            this.executionTime = executionTime; 
            this.isHit = isHit;
        }
        public double getX() {
            return x;
        }

        public void setX(double x) {
            this.x = x;
        }

        public double getY() {
            return y;
        }

        public void setY(double y) {
            this.y = y;
        }

        public int getR() {
            return r;
        }

        public void setR(int r) {
            this.r = r;
        }

        public boolean getIsHit() {
            return isHit;
        }

        public void setIsHit(boolean hit) {
            isHit = hit;
        }

        public long getExecutionTime() {
            return executionTime;
        }

        public void setExecutionTime(long executionTime) {
            this.executionTime = executionTime;
        }
    }   
}
