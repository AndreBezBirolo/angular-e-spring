package com.andre.crudspring.dto.mapper;

import com.andre.crudspring.dto.CourseDTO;
import com.andre.crudspring.dto.LessonDTO;
import com.andre.crudspring.enums.Category;
import com.andre.crudspring.model.Course;
import com.andre.crudspring.model.Lesson;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }
        List<LessonDTO> lessons = course.getLessons().stream()
                .map(lesson -> new LessonDTO(lesson.getId(), lesson.getName(), lesson.getYoutubeURL()))
                .toList();
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

        List<Lesson> lessons = courseDTO.lessons()
                .stream()
                .map(lessonDTO -> {
                    var lesson = new Lesson();
                    lesson.setId(lessonDTO._id());
                    lesson.setName(lessonDTO.name());
                    lesson.setYoutubeURL(lessonDTO.youtubeURL());
                    lesson.setCourse(course);
                    return lesson;
                })
                .toList();
        course.setLessons(lessons);
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
