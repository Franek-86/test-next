import SectionTitle from "@/components/global/SectionTitle";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { fetchAdminOrders } from "@/utils/actions";
import { formattedDate, formattedValue } from "@/utils/formattedValue";
import React from "react";

const Sales = async () => {
  const orders = await fetchAdminOrders();
  // if (orders.length === 0) return <SectionTitle title='No order placed' />;
  return (
    <Table>
      <TableCaption>Total orders : {orders.length}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Products</TableHead>
          <TableHead>Order Total</TableHead>
          <TableHead>Tax</TableHead>
          <TableHead>Shipping</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          const { id, products, tax, totalOrder, shipping, createdAt, email } =
            order;
          return (
            <TableRow key={id}>
              <TableCell>{products}</TableCell>
              <TableCell>{formattedValue(totalOrder)}</TableCell>
              <TableCell>{formattedValue(tax)}</TableCell>
              <TableCell>{formattedValue(shipping)}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{formattedDate(createdAt)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Sales;
