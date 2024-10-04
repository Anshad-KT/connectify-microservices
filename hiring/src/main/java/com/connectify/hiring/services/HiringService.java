package com.connectify.hiring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectify.hiring.models.Candidate;
import com.connectify.hiring.models.JobApplication;
import com.connectify.hiring.models.JobPost;
import com.connectify.hiring.repositories.CandidateRepository;
import com.connectify.hiring.repositories.JobApplicationRepository;
import com.connectify.hiring.repositories.JobPostRepository;

import java.util.List;

@Service
public class HiringService {

    @Autowired
    private JobPostRepository jobPostRepository; // Parameterized with JobPost and Integer

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    // Job Post APIs

    public JobPost createJobPost(JobPost jobPost) {
        return jobPostRepository.save(jobPost);
    }

    public List<JobPost> getAllJobPosts() {
        return jobPostRepository.findAll();
    }

    public JobPost getJobPostById(Integer jobPostId) {
        return jobPostRepository.findById(jobPostId).orElseThrow(() -> new RuntimeException("JobPost not found"));
    }

    public JobPost updateJobPost(Integer jobPostId, JobPost jobPost) {
        JobPost existingJobPost = getJobPostById(jobPostId);
        existingJobPost.setJobTitle(jobPost.getJobTitle());
        existingJobPost.setJobDescription(jobPost.getJobDescription());
        return jobPostRepository.save(existingJobPost);
    }

    public void deleteJobPost(Integer jobPostId) {
        jobPostRepository.deleteById(jobPostId);
    }

    // Candidate APIs

    public Candidate createCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidate getCandidateById(Integer candidateId) {
        return candidateRepository.findById(candidateId).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    public Candidate updateCandidate(Integer candidateId, Candidate candidate) {
        Candidate existingCandidate = getCandidateById(candidateId);
        existingCandidate.setName(candidate.getName());
        existingCandidate.setResume(candidate.getResume());
        return candidateRepository.save(existingCandidate);
    }

    public void deleteCandidate(Integer candidateId) {
        candidateRepository.deleteById(candidateId);
    }

    // Job Application APIs

    public JobApplication createJobApplication(Integer jobPostId, JobApplication jobApplication) {
        JobPost jobPost = getJobPostById(jobPostId);
        jobApplication.setJobPost(jobPost);
        return jobApplicationRepository.save(jobApplication);
    }

    public List<JobApplication> getAllJobApplications(Integer jobPostId) {
        JobPost jobPost = getJobPostById(jobPostId);
        return jobApplicationRepository.findByJobPost(jobPost);
    }

    public JobApplication getJobApplicationById(Integer jobPostId, Integer applicationId) {
        return jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("JobApplication not found"));
    }

    public JobApplication updateJobApplication(Integer jobPostId, Integer applicationId, JobApplication jobApplication) {
        JobApplication existingJobApplication = getJobApplicationById(jobPostId, applicationId);
        existingJobApplication.setApplicationStatus(jobApplication.getApplicationStatus());
        return jobApplicationRepository.save(existingJobApplication);
    }

    public void deleteJobApplication(Integer jobPostId, Integer applicationId) {
        jobApplicationRepository.deleteById(applicationId);
    }

    // Additional APIs

    public List<Candidate> getShortlistedCandidates(Integer jobPostId) {
        JobPost jobPost = getJobPostById(jobPostId);
        return candidateRepository.findByJobPostAndApplicationStatus(jobPost, "SHORTLISTED");
    }

    public List<Candidate> getRejectedCandidates(Integer jobPostId) {
        JobPost jobPost = getJobPostById(jobPostId);
        return candidateRepository.findByJobPostAndApplicationStatus(jobPost, "REJECTED");
    }
}
