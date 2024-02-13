package com.andre.crudspring.service;

import com.andre.crudspring.dto.CourseDTO;
import com.andre.crudspring.dto.CoursePageDTO;
import com.andre.crudspring.dto.mapper.CourseMapper;
import com.andre.crudspring.exception.RecordNotFoundException;
import com.andre.crudspring.model.Course;
import com.andre.crudspring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

//    public List<CourseDTO> list() {
//        return courseRepository.findAll()
//                .stream()
//                .map(courseMapper::toDTO)
//                .toList();
//    }

    public CoursePageDTO list(@PositiveOrZero int pageNr, @Positive @Max(100) int pageSize) {
        Page<Course> page = courseRepository
                .findAll(PageRequest.of(pageNr, pageSize));
        List<CourseDTO> courses = page.get()
                .map(courseMapper::toDTO)
                .toList();
        return new CoursePageDTO(courses, page.getTotalElements(), page.getTotalPages());
    }

    public CourseDTO findById(@NotNull @Positive Long id) {
        return courseRepository.findById(id)
                .map(courseMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO create(@Valid @NotNull CourseDTO courseDTO) {
        return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(courseDTO)));
    }

    public CourseDTO update(@NotNull @Positive Long id, @Valid CourseDTO courseDTO) {
        return courseRepository.findById(id)
                .map(recordFound -> {
                    Course course = courseMapper.toEntity(courseDTO);
                    recordFound.setName(courseDTO.name());
                    recordFound.setCategory(this.courseMapper.converterCategoryValue(courseDTO.category()));
                    recordFound.getLessons().clear();
                    course.getLessons()
                            .forEach(lesson -> recordFound.getLessons().add(lesson));
                    return courseRepository.save(recordFound);
                })
                .map(courseMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive Long id) {
        courseRepository.delete(courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
