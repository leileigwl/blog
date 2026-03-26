---
title: java 跨域请求
published: 2022-09-05
description: 'Spring Boot项目中解决跨域的3种方案'
tags: [java, spring, 跨域]
category: '技术'
draft: false
---

## 跨域请求

同源策略：协议、域名、端口 3 个都相同就是同源

Spring Boot 项目中解决跨域的 3 种方案

### 1、在目标方法上添加 @CrossOrigin 注解

```java
@GetMapping("/list")
@CrossOrigin
public List<String> list(){
    List<String> list = Arrays.asList("Java","C++","Go");
    return list;
}
```

### 2、添加 CORS 过滤器

```java
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(source);
    }

}
```

### 3、实现 WebMvcConfigurer 接口，重写 addCorsMappings 方法

```java
@Configuration
public class CorsConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET","POST","PUT","DELETE","HEAD","OPTIONS")
                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders("*");
    }
}
```