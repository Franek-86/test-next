import React, { Suspense } from "react";
import CardButton from "./CardButton";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Container from "../global/Container";

const Navbar = () => {
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
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
