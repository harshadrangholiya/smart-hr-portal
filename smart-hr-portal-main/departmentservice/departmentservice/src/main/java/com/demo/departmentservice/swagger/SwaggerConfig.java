package com.demo.departmentservice.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String BEARER_SCHEME = "bearerAuth";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Department Service API")
                        .version("1.0")
                        .description("Smart HR Portal Department Microservice")
                )
                .addSecurityItem(new SecurityRequirement().addList(BEARER_SCHEME))
                .components(new Components()
                        .addSecuritySchemes(BEARER_SCHEME,
                                new SecurityScheme()
                                        .name(BEARER_SCHEME)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                );
    }
}
