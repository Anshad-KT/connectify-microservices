package com.connectify.hiring.repositories;

import com.connectify.hiring.models.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Integer> {
    // No custom methods needed as of now
}
