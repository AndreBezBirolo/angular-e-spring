package com.andre.crudspring.model;

import com.andre.crudspring.enums.Category;
import com.andre.crudspring.enums.Status;
import com.andre.crudspring.enums.converters.CategoryConverter;
import com.andre.crudspring.enums.converters.StatusConverter;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

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
    @Column(length = 25, nullable = false)
    @Convert(converter = CategoryConverter.class)
    private Category category;
    @NotNull
    @Column(length = 10, nullable = false)
    @Convert(converter = StatusConverter.class)
    private Status status = Status.ACTIVE;
    
    @NotNull
    @NotEmpty
    @Valid
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "course")
    private List<Lesson> lessons = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("O nome não pode ser nulo ou vazio");
        }
        if (name.length() < 5 || name.length() > 100) {
            throw new IllegalArgumentException("O nome deve ter entre 5 e 100 caracteres");
        }
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        if (status == null) {
            throw new IllegalArgumentException("O status não pode ser nulo");
        }
        if (!EnumSet.of(Status.ACTIVE, Status.INACTIVE).contains(status)) {
            throw new IllegalArgumentException("O status deve ser um dos valores: ACTIVE ou INACTIVE");
        }
        this.category = category;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lesson> lessons) {
        if (lessons == null) {
            throw new IllegalArgumentException("A lista de lições não pode ser nula");
        }
        if (lessons.isEmpty()) {
            throw new IllegalArgumentException("A lista de lições não pode ser vazia");
        }
        for (Lesson lesson : lessons) {
            if (lesson == null) {
                throw new IllegalArgumentException("A lição não pode ser nula");
            }
            if (lesson.getName() == null || lesson.getName().trim().isEmpty()) {
                throw new IllegalArgumentException("A lição deve ter um nome");
            }
            if (lesson.getYoutubeURL() == null || lesson.getYoutubeURL().trim().isEmpty()) {
                throw new IllegalArgumentException("A lição deve ter uma URL");
            }
            if (!lesson.getCourse().equals(this)) {
                throw new IllegalArgumentException("A lição deve pertencer ao curso");
            }
        }
        this.lessons = lessons;
    }
}
