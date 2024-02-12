package com.andre.crudspring.enums;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum Status {
    ACTIVE("ativo"),
    INACTIVE("inativo");

    private final String value;

    Status(String value) {
        this.value = value;
    }
}
