import IconButton from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/global/EmptyList";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { deleteProduct, fetchAdminProducts } from "@/utils/actions";
import Link from "next/link";
import React from "react";

const AdminProducts = async () => {
  const products = await fetchAdminProducts();
  if (products.length === 0) return <EmptyList />;

  return (
    <section>
      <Table>
        <TableCaption className='capitalize'>
          total products: {products.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>company</TableHead>
            <TableHead>price</TableHead>
            <TableHead>action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const { id, name, company, price } = product;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    className='text-muted-foreground underline tracking-wide'
                    href={`/products/${id}`}
                  >
                    {name}
                  </Link>
                </TableCell>

                <TableCell>{company}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Button asChild size='icon' variant='link'>
                    <Link href={`/admin/products/${id}/edit`}>
                      <IconButton actionType='edit' />
                    </Link>
                  </Button>
                  <DeleteProductAction productId={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
};
async function DeleteProductAction({ productId }: { productId: string }) {
  const deleteAction = deleteProduct.bind(null, { productId });
  return (
    <FormContainer actionTest={deleteAction}>
      <Button type='submit' variant='link' size='icon'>
        <IconButton actionType='delete' />
      </Button>
    </FormContainer>
  );
}
export default AdminProducts;
