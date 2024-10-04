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
import com.connectify.hiring.models.Candidate;
import com.connectify.hiring.services.HiringService;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private HiringService hiringService;

    @PostMapping
    public ResponseEntity<CandidateDTO> createCandidate(@RequestBody CandidateDTO candidateDTO) {
        Candidate candidate = new Candidate();
        candidate.setName(candidateDTO.getName());
        candidate.setResume(candidateDTO.getResume());

        Candidate createdCandidate = hiringService.createCandidate(candidate);
        return ResponseEntity.ok(new CandidateDTO(createdCandidate));
    }

    @GetMapping
    public ResponseEntity<List<CandidateDTO>> getAllCandidates() {
        List<Candidate> candidates = hiringService.getAllCandidates();
        List<CandidateDTO> candidateDTOs = candidates.stream()
                .map(CandidateDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(candidateDTOs);
    }

    @GetMapping("/{candidateId}")
    public ResponseEntity<CandidateDTO> getCandidateById(@PathVariable Integer candidateId) {
        Candidate candidate = hiringService.getCandidateById(candidateId);
        return ResponseEntity.ok(new CandidateDTO(candidate));
    }

    @PatchMapping("/{candidateId}")
    public ResponseEntity<CandidateDTO> updateCandidate(@PathVariable Integer candidateId, @RequestBody CandidateDTO candidateDTO) {
        Candidate candidate = hiringService.getCandidateById(candidateId);
        candidate.setName(candidateDTO.getName());
        candidate.setResume(candidateDTO.getResume());

        Candidate updatedCandidate = hiringService.updateCandidate(candidateId, candidate);
        return ResponseEntity.ok(new CandidateDTO(updatedCandidate));
    }

    @DeleteMapping("/{candidateId}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Integer candidateId) {
        hiringService.deleteCandidate(candidateId);
        return ResponseEntity.noContent().build();
    }
}
