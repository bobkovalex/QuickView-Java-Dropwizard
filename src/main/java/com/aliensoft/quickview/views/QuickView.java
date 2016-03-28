package com.aliensoft.quickview.views;

import com.yammer.dropwizard.views.View;
import java.nio.charset.Charset;

/**
 * @author Alex Bobkov
 */

public class QuickView extends View {

    public QuickView(){
        super("quickview.ftl", Charset.forName("UTF-8"));
    }

}
