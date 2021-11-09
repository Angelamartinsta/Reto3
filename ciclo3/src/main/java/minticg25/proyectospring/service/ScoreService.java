package minticg25.proyectospring.service;

import minticg25.proyectospring.model.Score;
import java.util.List;
import java.util.Optional;


public interface ScoreService{

    public List<Score> listarScore();
    public Optional<Score> listarScoreId(Integer Id);
    public Score guardarScoreId(Score c);
    public boolean borrarScoreId(Integer id);
    public Score actualizarScore (Score c);
}