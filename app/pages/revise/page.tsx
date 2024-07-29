"use client"

import React, { useState } from "react";

const page = () => {
  const [revising, setRevising] = useState(false);
  return (
    <>
      {revising ? (
        <></>
      ) : (
        <main className="flex items-center justify-center absolute top-1/2 w-full">
          <button className="btn-secondary text-4xl" onClick={() => setRevising(true)}>Start Revision</button>
        </main>
      )}
    </>
  );
};

export default page;
