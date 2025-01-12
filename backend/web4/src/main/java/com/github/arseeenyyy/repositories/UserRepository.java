package com.github.arseeenyyy.repositories;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import com.github.arseeenyyy.models.entities.UserEntity;

@Repository
public class UserRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public UserEntity findByLogin(String login) {
        try {
            return entityManager.createQuery(
                    "SELECT u FROM UserEntity u WHERE u.login = :login", UserEntity.class)
                    .setParameter("login", login)
                    .getSingleResult();
        } catch (jakarta.persistence.NoResultException e) {
            return null;
        }
    }

    public void save(UserEntity userEntity) {
        entityManager.persist(userEntity);
    }
}