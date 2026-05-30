import SectionTitle from "@/components/global/SectionTitle";
import {
  Table,
  TableHead,
  TableHeader,
  TableCell,
  TableCaption,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import { fetchUserOrders } from "@/utils/actions";
import { formattedDate, formattedValue } from "@/utils/formattedValue";

import React from "react";

const Orders = async () => {
  const orders = await fetchUserOrders();
  {
    if (orders.length === 0) return <SectionTitle title='no order placed' />;
  }
  return (
    <>
      <SectionTitle title='My orders' />

      <Table>
        <TableCaption>Total products : {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { id, totalOrder, tax, shipping, createdAt, products } =
              order;
            return (
              <TableRow key={id}>
                <TableCell>{products}</TableCell>
                <TableCell>{formattedValue(totalOrder)}</TableCell>
                <TableCell>{formattedValue(tax)}</TableCell>
                <TableCell>{formattedValue(shipping)}</TableCell>
                <TableCell>{formattedDate(createdAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Orders;
