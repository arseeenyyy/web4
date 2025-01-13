package com.github.arseeenyyy.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.arseeenyyy.models.entities.PointEntity;
import com.github.arseeenyyy.repositories.PointRepository;
import com.github.arseeenyyy.utils.Checker;

import jakarta.transaction.Transactional;

@Service
public class PointService {
    private final PointRepository pointRepository;

    @Autowired
    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    @Transactional
    public void savePoint(PointEntity pointEntity) {
        pointRepository.save(pointEntity);
    }
    @Transactional
    public List<PointEntity> getAllPointsByUserId(long userId) {
        return pointRepository.getAllPointsByUserId(userId);
    }

    @Transactional
    public void updateAllPoints(int newR, long userId) {
        List<PointEntity> points = pointRepository.getAllPointsByUserId(userId);
        points.forEach(point -> {
            point.setR(newR);
            boolean isHit = Checker.isHit(point.getX(), point.getY(), newR);
            point.setIsHit(isHit);
        });
        points.forEach(pointRepository :: update);
    }
    @Transactional 
    public void removeAllPoints(long userId) {
        pointRepository.removeAllPoints(userId);
    } 

}
