package com.weblabs.lab3;

import com.weblabs.lab3.util.PointChecker;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int x, y, r;
        System.out.println("Enter points: ");
        Scanner in = new Scanner(System.in);
        System.out.print("X = ");
        x = in.nextInt();
        System.out.print("Y = ");
        y = in.nextInt();
        System.out.print("R = ");
        r = in.nextInt();
        boolean result = PointChecker.checkPoint(x, y, r);
        System.out.println(result ? "Hit" : "Miss");
    }
}
