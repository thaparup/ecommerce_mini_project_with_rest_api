import { useEffect } from "react";
import { typeProduct } from "../types/typeProduct";

export const HtmlEmail = ({
  rows,
  address,
  sum,
}: {
  rows: string;
  address: string;
  sum: number;
}) => {
  const totalRow = `
        <tr>
        <td><strong>Total</strong></td>
        <td></td>
        <td><strong></strong></td>
        <td><strong>Rs. ${Math.floor(sum * 135) + 100}</strong></td>
      </tr>
    `;

  return `
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          ${totalRow}
        </tbody>
      </table>
      <h5>Your delievery address:</h5>
         <p style='font-style: italic'>${address}</p>
    `;
};
