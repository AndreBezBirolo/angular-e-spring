package com.andre.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

@Data
@Entity
@SQLDelete(sql = "UPDATE Course SET status = 'inativo' WHERE id = ?")
@Where(clause = "status = 'ativo'")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @NotBlank
    @NotNull
    @Length(min = 5, max = 100)
    @Column(length = 100, nullable = false)
    private String name;

    @NotNull
    @Length(max = 25)
    @Pattern(regexp = "back-end|front-end")
    @Column(length = 25, nullable = false)
    private String category;

    @NotNull
    @Length(max = 10)
    @Pattern(regexp = "ativo|invativo")
    @Column(length = 10, nullable = false)
    private String status = "ativo";
}
