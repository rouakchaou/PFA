package com.store.service;

import com.store.model.Command;
import com.store.model.CommandLine;
import com.store.model.Product;
import com.store.repository.CommandLineRepository;
import com.store.repository.CommandRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CommandService {
    public CommandService(CommandRepository commandRepository,CommandLineRepository commandLineRepository){
        this.commandRepository = commandRepository;
        this.commandLineRepository=commandLineRepository;
    }
    CommandRepository commandRepository;
    CommandLineRepository commandLineRepository;
    public Command saveCommande(Command command){
        return commandRepository.save(command);
    }
    public CommandLine addCommandLine(CommandLine commandLine) {
        return commandLineRepository.save(commandLine);
    }

    public List<Command> getAllCommands() {
        return commandRepository.findAll();
    }

    public Command getCommandById(Long commandId){
        return commandRepository.findCommandById(commandId);
    }

    public void updateCommand(Command command){
         commandRepository.save(command);
    }

    public List<Command> getCommandsByDpId(Long dpId) {
        return commandRepository.findByDpId(dpId);
    }
}
