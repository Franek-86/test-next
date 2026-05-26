export type ActionType = {
  children: React.ReactNode;
  actionTest: (
    prevState: any,
    formData: FormData,
  ) => Promise<{ message: string }>;
};

export type ActionTestType = (
  prevState: any,
  formData: FormData,
) => Promise<{ message: string }>;
