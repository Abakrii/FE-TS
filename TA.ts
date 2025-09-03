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

// ---------------- Sample Data ----------------
const items: Item[] = [
  { id: 1, name: "Apple iPhone", category: "Electronics", price: 999, rating: 5 },
  { id: 2, name: "Samsung Galaxy", category: "Electronics", price: 899, rating: 4 },
  { id: 3, name: "Sony Headphones", category: "Accessories", price: 199, rating: 4 },
  { id: 4, name: "Banana", category: "Groceries", price: 2, rating: 3 },
  { id: 5, name: "Orange Juice", category: "Groceries", price: 5, rating: 4 },
  { id: 6, name: "Laptop", category: "Electronics", price: 1200, rating: 5 },
];

// ---------------- Example Usage ----------------
const result1 = filterSortPaginate(items, "Electronics", "price", "asc", 1, 2);
console.log("Page 1:", result1);

/*
Expected Output Page 1:
{
  "total": 3,
  "results": [
    {
      "id": 2,
      "name": "Samsung Galaxy",
      "category": "Electronics",
      "price": 899,
      "rating": 4
    },
    {
      "id": 1,
      "name": "Apple iPhone",
      "category": "Electronics",
      "price": 999,
      "rating": 5
    }
  ]
}
*/

const result2 = filterSortPaginate(items, "Electronics", "price", "asc", 2, 2);
console.log("Page 2:", result2);

/*
Expected Output Page 2:
{
  "total": 3,
  "results": [
    {
      "id": 6,
      "name": "Laptop",
      "category": "Electronics",
      "price": 1200,
      "rating": 5
    }
  ]
}
*/
