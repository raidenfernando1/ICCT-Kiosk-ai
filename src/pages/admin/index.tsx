import { useState } from "react";
import { insertData } from "../../hooks/useSupabase";

export const AdminPage = () => {
  return (
    <div>
      <button
        onClick={() =>
          insertData(
            "other",
            "who where your creators or developers",
            `my creator is Raiden Fernando`
          )
        }
      >
        test
      </button>
    </div>
  );
};
