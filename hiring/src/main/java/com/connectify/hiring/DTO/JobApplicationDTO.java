package com.connectify.hiring.DTO;

import com.connectify.hiring.models.JobApplication;

public class JobApplicationDTO {

    private Integer id;
    private Integer jobPostId;
    private String applicationStatus;

    public JobApplicationDTO() {
    }

    public JobApplicationDTO(JobApplication jobApplication) {
        this.id = jobApplication.getId();
        this.jobPostId = jobApplication.getJobPost() != null ? jobApplication.getJobPost().getId() : null;
        this.applicationStatus = jobApplication.getApplicationStatus();
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getJobPostId() {
        return jobPostId;
    }

    public void setJobPostId(Integer jobPostId) {
        this.jobPostId = jobPostId;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }
}
