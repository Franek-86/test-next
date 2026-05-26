import { Separator } from "@/components/ui/separator";
import React from "react";
import Sidebar from "./Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2>Dashboard</h2>
      <Separator className='mt-2' />
      <section className='grid lg:grid-cols-12 mt-12 gap-12'>
        <div className='lg:col-span-2'>
          <Sidebar />
        </div>
        <section className='lg:col-span-10'>{children}</section>
      </section>
    </>
  );
};

export default layout;
