import React, { Component } from "react";

export class ProductTable extends Component {

  render() {
    return (
      <React.Fragment>
        <h4 className="p-2">
          Showing {this.props.products.length} Products from the Uploaded File.
        </h4>

        <div className="p-2 m-2">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>SKU</th>
                <th>Type</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              {this.props.products.map((product, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{product.SKU}</td>
                  <td>{product.Type}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>{product.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
