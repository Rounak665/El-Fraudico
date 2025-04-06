package com.football.elfraudico.service;

import com.football.elfraudico.model.Player;
import com.football.elfraudico.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository repository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public List<Player> getAllPlayers() {
        return repository.findAll();
    }

    public Optional<Player> getPlayerById(Long id) {
        return repository.findById(id);
    }

    // Save player with image
    public Player savePlayer(Player player, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(image,"robbers");
            player.setImageUrl(imageUrl);
        }
        return repository.save(player);
    }

    // Delete player and their Cloudinary image
    public void deletePlayer(Long id) throws IOException {
        Optional<Player> optionalPlayer = repository.findById(id);
        if (optionalPlayer.isPresent()) {
            Player player = optionalPlayer.get();

            if (player.getImageUrl() != null) {
                String publicId = extractPublicId(player.getImageUrl());
                cloudinaryService.deleteFile(publicId);
            }

            repository.deleteById(id);
        }
    }

    // Shortened version to extract public ID from Cloudinary URL
    private String extractPublicId(String imageUrl) {
        return imageUrl
                .substring(imageUrl.lastIndexOf(".com/") + 5)
                .split("\\.")[0];
    }
}
