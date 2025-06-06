package com.phonegear.favorites.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class MutableHttpServletRequest extends HttpServletRequestWrapper {
    private final Map<String, String> customHeaders;

    public MutableHttpServletRequest(HttpServletRequest request) {
        super(request);
        this.customHeaders = new HashMap<>();
    }

    public void putHeader(String name, String value) {
        this.customHeaders.put(name, value);
    }

    @Override
    public String getHeader(String name) {
        String headerValue = customHeaders.get(name);
        
        if (headerValue != null) {
            return headerValue;
        }
        
        return ((HttpServletRequest) getRequest()).getHeader(name);
    }

    @Override
    public Enumeration<String> getHeaderNames() {
        Set<String> set = new HashSet<>(customHeaders.keySet());
        
        Enumeration<String> e = ((HttpServletRequest) getRequest()).getHeaderNames();
        while (e.hasMoreElements()) {
            String n = e.nextElement();
            set.add(n);
        }
        
        return Collections.enumeration(set);
    }

    @Override
    public Enumeration<String> getHeaders(String name) {
        Set<String> set = new HashSet<>();
        
        Enumeration<String> e = ((HttpServletRequest) getRequest()).getHeaders(name);
        while (e.hasMoreElements()) {
            String n = e.nextElement();
            set.add(n);
        }
        
        if (customHeaders.containsKey(name)) {
            set.add(customHeaders.get(name));
        }
        
        return Collections.enumeration(set);
    }
}
