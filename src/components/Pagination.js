import classNames from "classnames";
import React, { Component } from "react";

export class Pagination extends Component {
  // For Conditional class rendering
  // https://github.com/JedWatson/classnames
  // https://medium.freecodecamp.org/deliberate-practice-what-i-learned-from-reading-classnames-f9b89cb785e4

  makePageActive = pageNumber => {
    return classNames("page-item", {
      active: pageNumber == this.props.currentPageNumber
    });
  };

  handlePageChange = navigateTo => {
    this.props.changePage(navigateTo);
  };

  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-3">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={this.props.previous}
            >
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {Array.from(Array(this.props.numberOfPages)).map((item, i) => (
            <li className={this.makePageActive(i)} key={i}>
              <button
                type="button"
                className="page-link"
                onClick={() => this.handlePageChange(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={this.props.next}
              aria-label="Next"
            >
              <span aria-hidden="true">»</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
