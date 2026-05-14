"use client";

import { Input } from "../ui/input";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const NavSearch = () => {
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search")?.toString() || "");
  const handleChange = useDebouncedCallback((e: string) => {
    const test = new URLSearchParams(params);
    // let test2 = test.get("search");
    test.set("search", e);
    let check = test.get("search")?.toString();
    if (!check) {
      test.delete("search");
    }
    redirect(`/products?${test}`);
  }, 3000);

  // const testDebounce = useDebounce(handleChange,3000)
  // const test = useDebounce(setSearch, 3000);

  useEffect(() => {
    let test = params.get("search");
    if (!test) {
      console.log("ciao");
      setSearch("");
    }
  }, [params.get("search")]);
  // end
  return (
    <div>
      <Input
        type='search'
        placeholder='Search items...'
        className='max-w-xs dark:bg-muted'
        onChange={(e) => {
          setSearch(e.target.value);
          handleChange(e.target.value);
        }}
        value={search}
      />
    </div>
  );
};

export default NavSearch;
