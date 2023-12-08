package com.enigma.responses;

import lombok.AccessLevel;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@Getter
public class ApiResponse {
    @Getter(AccessLevel.NONE)
    private HttpStatus httpStatus;
    private String status;
    private String message;
    private Map<String, Object> data;

    public ApiResponse() {
        this.data = new HashMap<>();
    }

    public void setResponse(HttpStatus status, String message) {
        this.httpStatus = status;
        this.status = status.getReasonPhrase();
        this.message = message;
    }

    public void addData(String key, Object value) {
        this.data.put(key, value);
    }

    public HttpStatus _getHttpStatus() {
        return this.httpStatus;
    }
}
