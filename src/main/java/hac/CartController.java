package hac;

import hac.repo.Cart;
import hac.repo.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private Cart cart;


    @PostMapping("/add")
    public void addToCart(@RequestBody Movie movieDetails) {
        Movie movie = new Movie(movieDetails.getId(),movieDetails.getTitle(),movieDetails.getPrice(),movieDetails.getImageUrl(),
                movieDetails.getReleaseDate());
        cart.addMovie(movie);
    }
    @GetMapping("/items")
    public List<Movie> getCartItems() {
        System.out.println("in get");
        return cart.getMovies();
    }

    @RequestMapping(value = "/delete/{movieId}", method = RequestMethod.DELETE)
    public void deleteCartItem(@PathVariable("movieId") long movieId) {
        // Find and remove the movie from the cart based on the movieId
        Movie movieToRemove = null;
        for (Movie movie : cart.getMovies()) {
            if (movie.getId() == movieId) {
                movieToRemove = movie;
                break;
            }
        }

        if (movieToRemove != null) {
            cart.removeMovie(movieToRemove);
        }
    }

    @DeleteMapping("/clear")
    public void clearCart() {
        cart.clearCart();
    }
}
