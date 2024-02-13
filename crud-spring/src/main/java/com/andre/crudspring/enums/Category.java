package com.andre.crudspring.enums;

public enum Category {
    BACK_END("back-end"),
    FRONT_END("front-end");

    private final String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Category{" +
                "value='" + value + '\'' +
                '}';
    }
}
