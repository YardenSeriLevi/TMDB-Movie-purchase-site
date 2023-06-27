package hac;

import hac.repo.Cart;
import hac.repo.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * שמירת התרגום
 * This controller is responsible for everything related to the shopping cart, displaying the products in the cart,
 * deleting products from the cart, deleting all products from the cart, and adding products to the cart
 */
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private Cart cart;


    /**
     * This function is responsible for adding a movie to the shopping cart
     * @param movieDetails the details of the movie that should add
     */
    @PostMapping("/add")
    public void addToCart(@RequestBody Movie movieDetails) {
        Movie movie = new Movie(movieDetails.getId(),movieDetails.getTitle(),movieDetails.getPrice(),movieDetails.getImageUrl(),
                movieDetails.getReleaseDate());
        cart.addMovie(movie);
    }

    /**
     * This function returns us all the movies saved in the shopping cart
     * @return all the movies saved in the shopping cart
     */
    @GetMapping("/items")
    public List<Movie> getCartItems() {
        return cart.getMovies();
    }

    /**
     * This function is responsible for deleting a movie from the shopping cart
     * @param movieId the id of the movie that should remove
     */
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

    /**
     * This function is responsible for deleting all the movies in the shopping cart
     */
    @DeleteMapping("/clear")
    public void clearCart() {
        cart.clearCart();
    }
}
