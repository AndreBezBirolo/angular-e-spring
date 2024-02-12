package com.andre.crudspring.controller;

import com.andre.crudspring.model.Course;
import com.andre.crudspring.service.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> list() {
        return courseService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> findById(@PathVariable("id") @NotNull @Positive Long id) {
        return courseService.findById(id)
                .map(courseFound -> ResponseEntity.ok().body(courseFound))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody @Valid Course course) {
        //        return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(course));
        return courseService.create(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> update(@PathVariable("id") @NotNull @Positive Long id, @RequestBody @Valid Course course) {
        return courseService.update(id, course)
                .map(courseFound -> ResponseEntity.ok().body(courseFound))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") @NotNull @Positive Long id) {
        if (courseService.delete(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
