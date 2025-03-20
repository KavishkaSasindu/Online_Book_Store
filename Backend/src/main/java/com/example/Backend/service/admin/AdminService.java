package com.example.Backend.service.admin;

import com.example.Backend.dto.commonDto.ResponseMessageDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Data
@NoArgsConstructor
@Service
public class AdminService {

    public ResponseMessageDto testAdminService() {
        return new ResponseMessageDto("Admin Service test");
    }
}
