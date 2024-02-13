package com.andre.crudspring.enums;

public enum Status {
    ACTIVE("ativo"),
    INACTIVE("inativo");

    private final String value;

    Status(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Status{" +
                "value='" + value + '\'' +
                '}';
    }

    public String getValue() {
        return value;
    }
}
