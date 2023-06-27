package hac.repo;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * This department holds the shopping cart for us, it has the options of adding to the cart, deleting from the cart,
 * deleting the entire cart, and receiving all the products in the cart
 */
@Component
@SessionScope
public class Cart implements Serializable {
    /**
     * list that will contain all the movies un the cart
     */
    private List<Movie> movies;

    /**
     * this function Initializes an empty shopping cart
     */
    public Cart() {
        this.movies = new ArrayList<>();
    }

    /**
     * this function return the list of movies in the cart
     */
    public List<Movie> getMovies() {
        return movies;
    }

    /**
     * this function return the list of movies
     */
    public void addMovie(Movie movie) {
        if (!movies.contains(movie)) {
            movies.add(movie);
        }
        System.out.println("id =  " + movie.getId());
        System.out.println("title =  " + movie.getTitle());
        System.out.println("price =  " + movie.getPrice());
        System.out.println("url =  " + movie.getImageUrl());
        System.out.println("Release Date: =  " + movie.getReleaseDate());

    }

    /**
     * this function delete movie from the list of movie
     * @param movie the movie to delete
     */
    public void removeMovie(Movie movie) {
        movies.remove(movie);
    }

    /**
     * this function delete al the movies in the list
     */
    public void clearCart() {
        movies.clear();
    }
}
