"use client";
import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  XShareButton,
  XIcon,
  TwitterIcon,
} from "react-share";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

const ShareButton = ({
  productId,
  name,
}: {
  productId: string;
  name: string;
}) => {
  const url = process.env.NEXT_PUBLIC_URL_PROD;
  const shareUrl = `${url}/products/${productId}`;
  console.log("tttt12", shareUrl);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='top' align='start' alignOffset={10}>
        <div className='flex items-center justify-center gap-x-8'>
          <XShareButton url={shareUrl} name={name}>
            <XIcon size={32} round />
          </XShareButton>
          <LinkedinShareButton url={shareUrl} name={name}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <EmailShareButton url={shareUrl} name={name}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
