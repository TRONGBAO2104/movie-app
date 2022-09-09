import React from "react";
import { Stack, Pagination } from "@mui/material";

export default function PaginationBar({ setPage }) {
  const handleChangePage = (e) => {
    setPage(e.target.textContent);
  };
  return (
    <Stack spacing={2}>
      {/* The idea of prop numberOfPage is put it in count={numberOfPage} --> I wanna render all of page
      the API have (total_pages: 34948) but "errors": ["page must be less than or equal to 500"] */}
      <Pagination size="large" count={500} onChange={handleChangePage} />
    </Stack>
  );
}
