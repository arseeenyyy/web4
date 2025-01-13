package com.github.arseeenyyy.utils;

public class Validator {
    public static boolean validateArgs(double x, double y, int r) {
        return validateX(x) && validateY(y) && validateR(r);
    }
    private static boolean validateX(double x) {
        return x >= -5 && x <= 3;
    }
    private static boolean validateY(double y) {
        return y >= -5 && y <= 5;
    }
    private static boolean validateR(int r) {
        return r > 0 && r <= 5;
    }
}