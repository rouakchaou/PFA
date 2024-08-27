package com.store.repository;

import com.store.model.CommandLine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandLineRepository extends JpaRepository<CommandLine,Long> {
}
