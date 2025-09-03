type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
};

export function filterSortPaginate(
  items: Item[],
  query: string,
  sortBy: "price" | "rating",
  dir: "asc" | "desc",
  page: number,
  pageSize: number
): { total: number; results: Item[] } {
  const q = query.trim().toLowerCase();

  const filtered = q
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
    : [...items];

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (valA === valB) return 0;
    return dir === "asc" ? valA - valB : valB - valA;
  });

  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const results = sorted.slice(start, start + pageSize);

  return { total, results };
}
