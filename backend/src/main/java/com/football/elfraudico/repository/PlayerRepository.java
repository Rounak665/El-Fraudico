package com.football.elfraudico.repository;

import com.football.elfraudico.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
