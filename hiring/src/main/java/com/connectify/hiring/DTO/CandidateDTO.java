package com.connectify.hiring.DTO;

import com.connectify.hiring.models.Candidate;

public class CandidateDTO {

    private Integer id;
    private String name;
    private String resume;

    public CandidateDTO() {
    }

    public CandidateDTO(Candidate candidate) {
        this.id = candidate.getId();
        this.name = candidate.getName();
        this.resume = candidate.getResume();
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

  
}
