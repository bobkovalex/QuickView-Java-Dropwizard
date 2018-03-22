package com.aliensoft.quickview.health;

import com.codahale.metrics.health.HealthCheck;

/**
* Dummy HealthCheck
* @author Alex Bobkov
*/
public class TemplateHealthCheck extends HealthCheck {
    private final String template;

    public TemplateHealthCheck(String template) {
        this.template = template;
    }

    @Override
    protected Result check() throws Exception {
        return Result.healthy();
    }

}
