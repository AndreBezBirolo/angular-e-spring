package com.andre.crudspring.dto.mapper;

import com.andre.crudspring.dto.CourseDTO;
import com.andre.crudspring.dto.LessonDTO;
import com.andre.crudspring.enums.Category;
import com.andre.crudspring.model.Course;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }
        List<LessonDTO> lessons = course.getLessons().stream()
                .map(lesson -> new LessonDTO(lesson.getId(), lesson.getName(), lesson.getYoutubeUrl()))
                .collect(Collectors.toList());
        return new CourseDTO(course.getId(), course.getName(), course.getCategory().getValue(), lessons);
    }

    public Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }
        Course course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(converterCategoryValue(courseDTO.category()));
        return course;
    }

    public Category converterCategoryValue(String value) {
        if (value == null) {
            return null;
        }

        return switch (value) {
            case "front-end" -> Category.FRONT_END;
            case "back-end" -> Category.BACK_END;
            default -> throw new IllegalArgumentException("Categoria inválida: " + value);
        };
    }
}
