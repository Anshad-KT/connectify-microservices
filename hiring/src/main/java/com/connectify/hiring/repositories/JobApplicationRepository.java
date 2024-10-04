package com.connectify.hiring.repositories;

import com.connectify.hiring.models.JobApplication;
import com.connectify.hiring.models.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {

    // Finds all job applications by job post
    List<JobApplication> findByJobPost(JobPost jobPost);
}
