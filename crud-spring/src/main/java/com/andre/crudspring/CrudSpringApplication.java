package com.andre.crudspring;

import com.andre.crudspring.enums.Category;
import com.andre.crudspring.model.Course;
import com.andre.crudspring.model.Lesson;
import com.andre.crudspring.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudSpringApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(CourseRepository courseRepository) {
        return args -> {
            courseRepository.deleteAll();

            Course c = new Course();
            c.setName("Angular com Spring");
            c.setCategory(Category.FRONT_END);

            Lesson l = new Lesson();
            l.setName("Introdução");
            l.setYoutubeUrl("12345678912");
            l.setCourse(c);
            c.getLessons().add(l);

            courseRepository.save(c);
        };
    }

}
