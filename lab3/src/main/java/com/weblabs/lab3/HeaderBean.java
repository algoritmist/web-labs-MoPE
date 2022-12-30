package com.weblabs.lab3;

import java.io.Serializable;

public class HeaderBean implements Serializable {
    private final String studentInfo = "evgenia ryzhova, p32312";
    private final String labInfo = "lab 3, task #66645";

    public String getLabInfo() {
        return labInfo;
    }

    public String getStudentInfo() {
        return studentInfo;
    }
}
