package com.aliensoft.quickview.domain.wrapper;

/**
 * @author Alex Bobkov
 */
public class RotatedPageWrapper {
    private int pageNumber;
    private String angle;

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public String getAngle() {
        return angle;
    }

    public void setAngle(String angle) {
        this.angle = angle;
    }
}
