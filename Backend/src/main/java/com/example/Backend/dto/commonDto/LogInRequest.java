package com.example.Backend.dto.commonDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LogInRequest {

    private String email;
    private String password;
}
