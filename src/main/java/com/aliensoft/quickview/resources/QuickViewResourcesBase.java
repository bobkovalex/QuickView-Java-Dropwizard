package com.aliensoft.quickview.resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author Alex Bobkov
 */
public abstract class QuickViewResourcesBase {
    private final String DEFAULT_CHARSET = "UTF-8";

    protected void setResponseContentType(HttpServletResponse response, String contentType){
        try {
            response.setContentType(contentType);
            response.setCharacterEncoding(DEFAULT_CHARSET);
            response.getOutputStream().flush();
        } catch (IOException ex) {
            Logger.getLogger(QuickViewResource.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    protected String objectToJson(Object object){
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String auxJson = ow.writeValueAsString(object);
            return auxJson;
        } catch (JsonProcessingException ex) {
            Logger.getLogger(QuickViewResourcesBase.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    protected String getRequestBody(HttpServletRequest request){
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;
        InputStream inputStream = null;
        InputStreamReader inputStreamReader = null;
        try {
            inputStream = request.getInputStream();
            if (inputStream != null) {
                inputStreamReader = new InputStreamReader(inputStream);
                bufferedReader = new BufferedReader(inputStreamReader);
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            try {
                if(bufferedReader != null){
                    bufferedReader.close();
                }
                if(inputStream != null) {
                    inputStream.close();
                }
                if(inputStreamReader != null) {
                    inputStreamReader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return stringBuilder.toString();
    }

    protected String getJsonString(String json, String key){
        String value = "";
        try {
            JSONObject jsonObject = new JSONObject(json);
            value = jsonObject.getString(key);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return value;
    }

    protected int getJsonInteger(String json, String key){
        int value = 1;
        try {
            JSONObject jsonObject = new JSONObject(json);
            value = jsonObject.getInt(key);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return value;
    }

    protected boolean getJsonBoolean(String json, String key){
        boolean value = true;
        try {
            JSONObject jsonObject = new JSONObject(json);
            value = jsonObject.getBoolean(key);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return value;
    }

}
