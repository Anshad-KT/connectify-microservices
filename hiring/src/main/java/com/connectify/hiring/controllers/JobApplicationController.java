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

import com.connectify.hiring.DTO.JobApplicationDTO;
import com.connectify.hiring.models.JobApplication;
import com.connectify.hiring.services.HiringService;

@RestController
@RequestMapping("/api/job-posts/{jobPostId}/applications")
public class JobApplicationController {

    @Autowired
    private HiringService hiringService;

   @PostMapping
public ResponseEntity<JobApplicationDTO> createJobApplication(@PathVariable Integer jobPostId, @RequestBody JobApplicationDTO jobApplicationDTO) {
    JobApplication jobApplication = hiringService.createJobApplication(jobPostId, new JobApplication(jobApplicationDTO));
    return ResponseEntity.ok(new JobApplicationDTO(jobApplication));
}

@GetMapping
public ResponseEntity<List<JobApplicationDTO>> getAllJobApplications(@PathVariable Integer jobPostId) {
    List<JobApplication> jobApplications = hiringService.getAllJobApplications(jobPostId);
    List<JobApplicationDTO> jobApplicationDTOs = jobApplications.stream().map(JobApplicationDTO::new).collect(Collectors.toList());
    return ResponseEntity.ok(jobApplicationDTOs);
}

@GetMapping("/{applicationId}")
public ResponseEntity<JobApplicationDTO> getJobApplicationById(@PathVariable Integer jobPostId, @PathVariable Integer applicationId) {
    JobApplication jobApplication = hiringService.getJobApplicationById(jobPostId, applicationId);
    return ResponseEntity.ok(new JobApplicationDTO(jobApplication));
}

@PatchMapping("/{applicationId}")
public ResponseEntity<JobApplicationDTO> updateJobApplication(@PathVariable Integer jobPostId, @PathVariable Integer applicationId, @RequestBody JobApplicationDTO jobApplicationDTO) {
    JobApplication jobApplication = hiringService.updateJobApplication(jobPostId, applicationId, new JobApplication(jobApplicationDTO));
    return ResponseEntity.ok(new JobApplicationDTO(jobApplication));
}

@DeleteMapping("/{applicationId}")
public ResponseEntity<Void> deleteJobApplication(@PathVariable Integer jobPostId, @PathVariable Integer applicationId) {
    hiringService.deleteJobApplication(jobPostId, applicationId);
    return ResponseEntity.ok().build();
}

}
