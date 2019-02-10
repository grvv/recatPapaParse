import React, { Component } from "react";
import { ProductTable } from "./ProductTable";
import * as Papa from "papaparse/papaparse.min.js";

export class PapaParse extends Component {
  state = {
    fileContainer: null,
    products: []
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

    this.setState(() => ({ fileContainer: null }));
  };

  handleParsedFile = ({data}) => {

    let products = data.slice(0, 10)

    this.setState(() => ({ products }));

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
          <ProductTable products={this.state.products} />
        )}
      </div>
    );
  }
}
