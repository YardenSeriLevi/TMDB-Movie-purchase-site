package hac.repo;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Component
@SessionScope

public class Cart implements Serializable {
    private List<Movie> movies;

    public Cart() {
        this.movies = new ArrayList<>();
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void addMovie(Movie movie) {
        if (!movies.contains(movie)) {
            movies.add(movie);
        }
    }
    public void removeMovie(Movie movie) {
        movies.remove(movie);
    }

    public void clearCart() {
        movies.clear();
    }
}
