"use client";
import { PreviewData } from "next";
import React, { ReactNode, useActionState, useEffect } from "react";
import { ActionType } from "@/utils/types";
import { toast } from "sonner";

const initialState = {
  message: "",
};
const FormContainer = ({ children, actionTest }: ActionType) => {
  const [state, dispatchAction] = useActionState(actionTest, initialState);
  useEffect(() => {
    if (state.message) {
      toast(state.message);
      state.message = "";
    }
  }, [state.message]);
  return (
    <>
      <form action={dispatchAction}>{children}</form>
    </>
  );
};

export default FormContainer;
