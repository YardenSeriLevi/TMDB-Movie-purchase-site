package hac.repo;

import java.util.Objects;

public class Movie {
    private long id;
    private String title;
    private double price;
    private String imageUrl;

    private String releaseDate;

    public Movie() {
        // Default constructor
    }

    public Movie(long id, String title, double price, String poster_path,String releaseDate) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = poster_path;
        this.releaseDate = releaseDate;

    }

    // Getters and Setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String  getReleaseDate() { return releaseDate;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return Objects.equals(title, movie.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title);
    }
}
