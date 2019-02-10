import React, { Component } from "react";

export class Pagination extends Component {
  state = {
    totalCount: 0,
    itemsPerPage: 0,
    currentPageNumber: 0
  };

  //   component lifecycle hooks --> https://reactjs.org/docs/react-component.html

  componentDidMount() {
    this.setState(() => ({
      totalCount: this.props.totalCount,
      itemsPerPage: this.props.itemsPerPage,
      currentPageNumber: this.props.currentPageNumber
    }));
  }

  handlePageChange = navigateTo => {
    this.props.changePage(navigateTo);
  };

  render() {
    console.log(this.props);

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
            <li className="page-item" key={i}>
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
