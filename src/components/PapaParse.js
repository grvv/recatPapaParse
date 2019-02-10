import React, { Component } from "react";
import { Pagination } from "./Pagination";
import { ProductTable } from "./ProductTable";
import { Dropdown } from "react-bootstrap";
import * as Papa from "papaparse/papaparse.min.js";

export class PapaParse extends Component {
  state = {
    fileContainer: null,
    products: [],
    totalProducts: [],
    paginationObj: {
      itemsPerPage: 100,
      currentPageNumber: 0,
      numberOfPages: 0
    }
  };

  handleChange = event => {
    // https://reactjs.org/docs/events.html
    // event.persist();

    let file = event.target.files[0];
    this.setState(() => ({ fileContainer: file }));

    // setState is async --
    // setTimeout(() => {
    //   console.log(this.state.fileContainer);
    // }, 3000);
  };

  parseFile = () => {
    // https://www.papaparse.com/docs
    // https://www.papaparse.com/docs#config --> config object;

    Papa.parse(this.state.fileContainer, {
      header: true,
      download: true,
      skipEmptyLines: true,

      complete: this.handleParsedFile
    });
  };

  handleParsedFile = ({ data }) => {
    let products = data.slice(0, 100);
    // this.setState(() => ({ products: products, totalProducts: data }));

    this.setState(prevState => ({
      fileContainer: null,
      products: products,
      totalProducts: data,
      paginationObj: {
        ...prevState.paginationObj,
        numberOfPages: Math.ceil(
          data.length / prevState.paginationObj.itemsPerPage
        )
      }
    }));
  };

  changePage = (pageNumber, itemsPerPage) => {
    let noOfItemsToSkip = pageNumber * itemsPerPage;

    console.log(pageNumber, itemsPerPage);

    this.setState(prevState => ({
      products: this.state.totalProducts.slice(
        noOfItemsToSkip,
        noOfItemsToSkip + itemsPerPage
      ),
      paginationObj: {
        ...prevState.paginationObj,
        currentPageNumber: pageNumber
      }
    }));
  };

  goToPrevPage = () => {
    let { currentPageNumber: pageNo } = this.state.paginationObj;

    if (pageNo > 0) {
      this.changePage(--pageNo);
    }
  };

  goToNextPage = () => {
    let {
      currentPageNumber: pageNo,
      numberOfPages: totalPage
    } = this.state.paginationObj;

    if (pageNo < totalPage - 1) {
      this.changePage(++pageNo);
    }
  };

  changeItemsPerPage = count => {
    this.setState(prevState => ({
      products: this.state.totalProducts.slice(
        0,
        count
      ),
      paginationObj: {
        ...prevState.paginationObj,
        itemsPerPage: count,
        currentPageNumber: 0,
        numberOfPages: Math.ceil(prevState.totalProducts.length / count)
      }
    }));
  };

  render() {
    return (
      <div className="container pt-5">
        <div className="card col-sm-10 col-xs-12 m-auto">
          <div className="card-body">
            <div className="custom-file my-3">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                accept=".csv"
                onChange={this.handleChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {this.state.fileContainer
                  ? this.state.fileContainer.name
                  : "Select File"}
              </label>
            </div>

            <button
              type="button"
              className="btn btn-success btn-lg btn-block"
              onClick={this.parseFile}
              disabled={!this.state.fileContainer}
            >
              Parse CSV File
            </button>
          </div>
        </div>

        {!this.state.products.length ? (
          <h2 className="text-center m-4">No Data!</h2>
        ) : (
          <>
            <div className="text-center mt-3">
              <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                  Items Per page - {this.state.paginationObj.itemsPerPage}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.changeItemsPerPage(100)}>
                    100
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.changeItemsPerPage(200)}>
                    200
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.changeItemsPerPage(300)}>
                    300
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.changeItemsPerPage(400)}>
                    400
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.changeItemsPerPage(500)}>
                    500
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Pagination
              totalCount={this.state.totalProducts.length}
              itemsPerPage={this.state.paginationObj.itemsPerPage}
              currentPageNumber={this.state.paginationObj.currentPageNumber}
              changePage={this.changePage}
              numberOfPages={this.state.paginationObj.numberOfPages}
              next={this.goToNextPage}
              previous={this.goToPrevPage}
            />
            <ProductTable
              products={this.state.products}
              totalCount={this.state.totalProducts.length}
              currentPageNumber={this.state.paginationObj.currentPageNumber}
              itemsPerPage={this.state.paginationObj.itemsPerPage}
            />
          </>
        )}
      </div>
    );
  }
}
