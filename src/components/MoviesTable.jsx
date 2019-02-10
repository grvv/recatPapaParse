import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

export class MoviesTable extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = id => {
    deleteMovie(id);

    this.setState(prevState => ({ movies: getMovies() }));
  };

  render() {
    return (
      <div className="container p-4">
        {!this.state.movies.length ? (
          <h1 className="text-center text-warning">NO Movies!!</h1>
        ) : (
          <React.Fragment>
            <h4 className="p-2">
              Showing {this.state.movies.length} movies from database.{" "}
            </h4>

            {/* Table code */}

            <div className="p-2 m-2">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.movies.map((movie, i) => (
                    <tr key={i}>
                      <th>{movie.title}</th>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(movie._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ React.Fragment>
        )}
      </div>
    );
  }
}
