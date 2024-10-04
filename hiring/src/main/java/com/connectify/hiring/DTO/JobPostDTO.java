package com.connectify.hiring.DTO;

import com.connectify.hiring.models.JobPost;

public class JobPostDTO {

    private Integer id;
    private String jobTitle;
    private String jobDescription;

    public JobPostDTO() {
    }

    public JobPostDTO(JobPost jobPost) {
        this.id = jobPost.getId();
        this.jobTitle = jobPost.getJobTitle();
        this.jobDescription = jobPost.getJobDescription();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}
