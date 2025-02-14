package com.backend.bookwed.exceptions;

import java.io.IOException;

public class APIException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public APIException(String string, IOException e) {
    }

    public APIException(String message) {
        super(message);

    }

}