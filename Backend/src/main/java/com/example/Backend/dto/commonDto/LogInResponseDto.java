package com.example.Backend.dto.commonDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LogInResponseDto {
    private String logInEmail;
    private String token;
    private String message;
}
