package com.connectify.hiring.repositories;

import com.connectify.hiring.models.Candidate;
import com.connectify.hiring.models.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {

    // Finds candidates by job post and application status (e.g., shortlisted or rejected)
    List<Candidate> findByJobPostAndApplicationStatus(JobPost jobPost, String applicationStatus);
}
