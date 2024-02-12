package com.andre.crudspring.controller;

import com.andre.crudspring.model.Course;
import com.andre.crudspring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;

    @GetMapping
    public @ResponseBody List<Course> list() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> findById(@PathVariable("id") @NotNull @Positive Long id) {
        return courseRepository.findById(id)
                .map(courseFound -> ResponseEntity.ok().body(courseFound))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody @Valid Course course) {
        //        return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(course));
        return courseRepository.save(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> update(@PathVariable("id") @NotNull @Positive Long id, @RequestBody @Valid Course course) {
        return courseRepository.findById(id)
                .map(courseFound -> {
                    courseFound.setName(course.getName());
                    courseFound.setCategory(course.getCategory());
                    Course updated = courseRepository.save(courseFound);
                    return ResponseEntity.ok().body(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") @NotNull @Positive Long id) {
        return courseRepository.findById(id)
                .map(courseFound -> {
                    courseRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
