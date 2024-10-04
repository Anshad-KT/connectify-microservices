package com.connectify.hiring.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.connectify.hiring.DTO.CandidateDTO;
import com.connectify.hiring.DTO.JobPostDTO;
import com.connectify.hiring.models.Candidate;
import com.connectify.hiring.models.JobPost;
import com.connectify.hiring.services.HiringService;

@RestController
@RequestMapping("/api/job-posts")
public class JobPostController {

    @Autowired
    private HiringService hiringService;
    
    @PostMapping
    public ResponseEntity<JobPostDTO> createJobPost(@RequestBody JobPostDTO jobPostDTO) {
        JobPost jobPost = hiringService.createJobPost(new JobPost(jobPostDTO));
        return ResponseEntity.ok(new JobPostDTO(jobPost));
    }

    @GetMapping("/{jobPostId}/shortlisted-candidates")
    public ResponseEntity<List<CandidateDTO>> getShortlistedCandidates(@PathVariable Integer jobPostId) {
        List<Candidate> shortlistedCandidates = hiringService.getShortlistedCandidates(jobPostId);
        List<CandidateDTO> candidateDTOs = shortlistedCandidates.stream().map(CandidateDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(candidateDTOs);
    }

    @GetMapping("/{jobPostId}/rejected-candidates")
    public ResponseEntity<List<CandidateDTO>> getRejectedCandidates(@PathVariable Integer jobPostId) {
        List<Candidate> rejectedCandidates = hiringService.getRejectedCandidates(jobPostId);
        List<CandidateDTO> candidateDTOs = rejectedCandidates.stream().map(CandidateDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(candidateDTOs);
    }

    @GetMapping
    public ResponseEntity<List<JobPostDTO>> getAllJobPosts() {
        List<JobPost> jobPosts = hiringService.getAllJobPosts();
        List<JobPostDTO> jobPostDTOs = jobPosts.stream().map(JobPostDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(jobPostDTOs);
    }

    @GetMapping("/{jobPostId}")
    public ResponseEntity<JobPostDTO> getJobPostById(@PathVariable Integer jobPostId) {
        JobPost jobPost = hiringService.getJobPostById(jobPostId);
        return ResponseEntity.ok(new JobPostDTO(jobPost));
    }

    @PatchMapping("/{jobPostId}")
    public ResponseEntity<JobPostDTO> updateJobPost(@PathVariable Integer jobPostId,
            @RequestBody JobPostDTO jobPostDTO) {
        JobPost jobPost = hiringService.updateJobPost(jobPostId, new JobPost(jobPostDTO));
        return ResponseEntity.ok(new JobPostDTO(jobPost));
    }

    @DeleteMapping("/{jobPostId}")
    public ResponseEntity<Void> deleteJobPost(@PathVariable Integer jobPostId) {
        hiringService.deleteJobPost(jobPostId);
        return ResponseEntity.noContent().build();
    }

}
