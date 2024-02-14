package com.andre.crudspring;

import com.andre.crudspring.enums.Category;
import com.andre.crudspring.model.Course;
import com.andre.crudspring.model.Lesson;
import com.andre.crudspring.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class CrudSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudSpringApplication.class, args);
    }

    @Bean
    @Profile("dev")
    CommandLineRunner initDatabase(CourseRepository courseRepository) {
        return args -> {
            courseRepository.deleteAll();

            for (int i = 0; i < 20; i++) {
                Course c = new Course();
                c.setName("Angular com Spring " + i);
                c.setCategory(Category.FRONT_END);

                Lesson l = new Lesson();
                l.setName("Introdução");
                l.setYoutubeURL("12345678912");
                l.setCourse(c);
                c.getLessons().add(l);

                Lesson l2 = new Lesson();
                l2.setName("Angular");
                l2.setYoutubeURL("12345678900");
                l2.setCourse(c);
                c.getLessons().add(l2);

                courseRepository.save(c);
            }
        };
    }

}
