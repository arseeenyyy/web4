package com.github.arseeenyyy.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.arseeenyyy.models.entities.PointEntity;
import com.github.arseeenyyy.models.request.PointRequest;
import com.github.arseeenyyy.models.response.PointsResponse;
import com.github.arseeenyyy.services.PointService;
import com.github.arseeenyyy.utils.Checker;

@RestController
@CrossOrigin
@RequestMapping
public class PointController {
    @Autowired
    private PointService service;

    @CrossOrigin(origins = "http://localhost:3000") 
    @PostMapping("/check")
    public ResponseEntity<PointsResponse> checkResult(@RequestBody PointRequest request) {
        try {
            boolean hasChanged = service.hasRChanged(request.getUserId(), request.getR());
            if (hasChanged) {
                service.updateAllPoints(request.getR(), request.getUserId());
            }
            PointEntity pointEntity = new PointEntity();
            pointEntity.setExecutionTime(1);
            pointEntity.setX(request.getX());
            pointEntity.setY(request.getY());
            pointEntity.setR(request.getR());
            pointEntity.setUserId(request.getUserId());
            pointEntity.setIsHit(Checker.isHit(pointEntity.getX(), pointEntity.getY(), pointEntity.getR()));
            service.savePoint(pointEntity);
            List<PointEntity> points = service.getAllPointsByUserId(request.getUserId());
            List<PointsResponse.PointResponse> responsePoints = points.stream()
            .map(p -> new PointsResponse.PointResponse(
                p.getX(),
                p.getY(),
                p.getR(),
                p.getExecutionTime(),
                p.getIsHit()))
            .toList();

        return ResponseEntity.ok(new PointsResponse(responsePoints));
        } catch(Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new PointsResponse("Error processing point: " + exception.getMessage()));
        }
    }
}
