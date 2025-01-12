package com.github.arseeenyyy.configuration;

import java.util.List;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.github.arseeenyyy")
public class AppConfig implements WebMvcConfigurer {
    @Override 
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/app")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "DELETE", "PUT");
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        Jackson2ObjectMapperBuilder.json()
                .indentOutput(true)
                .build();
        converters.add(new MappingJackson2HttpMessageConverter());
    }
}