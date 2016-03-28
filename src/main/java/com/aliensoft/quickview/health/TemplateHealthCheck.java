package com.aliensoft.quickview.health;

import com.yammer.metrics.core.HealthCheck;

/**
* Dummy HealthCheck
* @author Alex Bobkov
*/
public class TemplateHealthCheck extends HealthCheck {

    public TemplateHealthCheck(String template) {
        super(template);
    }

    @Override
    protected Result check() throws Exception {
        return Result.healthy();
    }

}
