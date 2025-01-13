package com.github.arseeenyyy.repositories;

import java.util.List;

import org.springframework.data.geo.Point;
import org.springframework.data.projection.EntityProjectionIntrospector;

import com.github.arseeenyyy.models.entities.PointEntity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

public class PointRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public void save(PointEntity pointEntity) {
        entityManager.persist(pointEntity);
    }

    public void removePoint(PointEntity pointEntity) {
        PointEntity managedPoint = entityManager.find(PointEntity.class, pointEntity);
        if (managedPoint != null) {
            entityManager.remove(managedPoint);
        }
    }
    public void update(PointEntity pointEntity) {
        entityManager.merge(pointEntity);
    }
    public void removeAllPoints() {
        entityManager.createQuery("DELETE FROM PointEntity").executeUpdate();
    }
    public List<PointEntity> getAllPointsByUserId(long userId) {
        return entityManager.createQuery(
                "SELECT p FROM PointEntity p WHERE p.user_id = :userId", PointEntity.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
