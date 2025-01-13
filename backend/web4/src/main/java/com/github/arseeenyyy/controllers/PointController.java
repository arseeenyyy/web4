package com.github.arseeenyyy.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.arseeenyyy.models.entities.PointEntity;
import com.github.arseeenyyy.models.response.PointsResponse;
import com.github.arseeenyyy.services.PointService;

@RestController
@CrossOrigin
@RequestMapping
public class PointController {
    @Autowired
    private PointService service;

    @CrossOrigin(origins = "http://localhost:3000") 
    @PostMapping("/check")
    public ResponseEntity<PointsResponse> checkResult(@RequestBody )
}