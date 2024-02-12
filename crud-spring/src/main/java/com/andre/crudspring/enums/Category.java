package com.andre.crudspring.enums;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum Category {
    BACK_END("back-end"),
    FRONT_END("front-end");

    private final String value;

    Category(String value) {
        this.value = value;
    }

}
