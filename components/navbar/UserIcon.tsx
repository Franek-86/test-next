import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { LuUser } from "react-icons/lu";

const UserIcon = async () => {
  const user = await currentUser();
  console.log("t123", user);

  let pic = user?.imageUrl;
  if (pic) {
    return <img src={pic} className='w-6 h-6 rounded-full' alt='profile-pic' />;
  }
  return <LuUser className='w-6 h-6 rounded-full bg-primary text-white' />;
};

export default UserIcon;
