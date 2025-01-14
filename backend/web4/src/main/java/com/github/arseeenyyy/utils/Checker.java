package com.github.arseeenyyy.utils;

public class Checker {
    public static boolean isHit(double x, double y, int r) {
        return inSquare(x, y, r) || inTriangle(x, y, r) || inCircle(x, y, r);
    }
    private static boolean inSquare(double x, double y, int r) {
        return x <= 0 && y <= 0 && -x <= r / 2f && -y <= r;
    }
    private static boolean inTriangle(double x, double y, int r) {
        return x <= 0 && y >= 0 && -x <= r / 2f && y <= r / 2f && y <= x + r / 2f;
    }
    private static boolean inCircle(double x, double y, int r) {
        return x >= 0 && y >= 0 && x <= r && y <= r && Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2);
    }
}