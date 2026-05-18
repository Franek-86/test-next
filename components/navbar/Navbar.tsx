import React, { Suspense } from "react";
import CardButton from "./CardButton";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Container from "../global/Container";
import UserIcon from "./UserIcon";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
  let { userId } = await auth();
  let isAdmin = userId === process.env.ID_USER_ADMIN;
  return (
    <nav className='border-b'>
      <Container className='flex flex-col justify-between items-center sm:flex-row  flex-wrap gap-4 py-8'>
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className='flex flex-col gap-4 sm:flex-row items-center flex-wrap'>
          <CardButton />
          <DarkMode />
          <LinksDropdown isAdmin={isAdmin} />
          <UserIcon />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
