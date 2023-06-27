package hac.repo;

import java.util.Objects;

/**
 * This is a movie class, it contains all the fields that a movie needs:
 * id, the name of the movie, the date of publication, the price of the movie and a picture of the movie
 */
public class Movie {
    /**
     * the movie id
     */
    private long id;
    /**
     * the movie title
     */
    private String title;
    /**
     * the movie price
     */
    private double price;
    /**
     * the movie picture
     */
    private String imageUrl;

    /**
     * the movie release date
     */
    private String releaseDate;

    /**
     * Default constructor
     */
    public Movie() {
    }

    /**
     * constructor that which initializes all the parameters that a movie needs
     * @param id the ID of the movie
     * @param title the name of the movie
     * @param price the price of the movie
     * @param poster_path the picture of the movie
     * @param releaseDate the release date of the movie
     */
    public Movie(long id, String title, double price, String poster_path,String releaseDate) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = poster_path;
        this.releaseDate = releaseDate;

    }

    // Getters and Setters

    /**
     * get the movie by id
     * @return movie
     */
    public long getId() {
        return id;
    }

    /**
     * setter
     * @param id movie id
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * getter
     * @return return the movie name
     */

    public String getTitle() {
        return title;
    }

    /**
     * setter
     * @param title the movies title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * getter
     * @return the movies price
     */
    public double getPrice() {
        return price;
    }

    /**
     * setter
     * @param price the movies price
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * getter
     * @return the movies image
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /***
     * setter
     * @param imageUrl the movie image
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * setter
     * @param releaseDate the movies release date
     */
    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    /**
     * getter
     * @return the movies release date
     */
    public String  getReleaseDate() { return releaseDate;}

    /**
     * Override function to equals function
     * @param other the movie to compare
     * @return true or false if  other movie equals to this movie
     */
    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        Movie movie = (Movie) other;
        return Objects.equals(title, movie.title);
    }

    /**
     * Override function to hashCode function
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(title);
    }
}
