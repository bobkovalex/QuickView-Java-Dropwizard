package com.aliensoft.quickview.domain.wrapper;

/**
 * @author Alex Bobkov
 */
public class ErrorMsgWrapper {
    private String message;
    private Exception exception;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Exception getException() {
        return exception;
    }

    public void setException(Exception exception) {
        this.exception = exception;
    }

}
