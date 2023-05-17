package com.weblabs.lab3;

import com.weblabs.lab3.util.PointChecker;

import java.util.Scanner;
import java.util.Locale;
import java.util.ResourceBundle;
import java.util.PropertyResourceBundle;
import java.io.FileInputStream;
import java.io.IOException;
public class Main {
    public static void main(String[] args) throws IOException{
        int x, y, r;
        ResourceBundle bundleGR = new PropertyResourceBundle(new FileInputStream("/home/viacheslav/IdeaProjects/web-labs-MoPE/lab3/src/main/resources/l18n/ApplicationMessages_de.properties"));
        System.out.println(bundleGR.getString("greeting"));
        Scanner in = new Scanner(System.in);
        System.out.print("X = ");
        x = in.nextInt();
        System.out.print("Y = ");
        y = in.nextInt();
        System.out.print("R = ");
        r = in.nextInt();
        boolean result = PointChecker.checkPoint(x, y, r);
        System.out.println(result ? bundleGR.getString("success") : bundleGR.getString("fail"));
    }
}
