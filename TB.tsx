import React from "react";

type Item = {
  id: number;
  name: string;
};

type ListProps = {
  items: Item[];
  onBuy: (item?: Item) => void;
};

function List({ items, onBuy }: ListProps) {
  const [q, setQ] = React.useState("");
  const query = q.toLowerCase();

  const filtered = React.useMemo(
    () => items.filter(i => i.name.toLowerCase().includes(query)),
    [items, query]
  );

  const handleBuy = React.useCallback(() => onBuy(), [onBuy]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value);

  return (
    <>
      <button className="btn" onClick={handleBuy}>Buy</button>
      <input
        type="search"
        placeholder="Search"
        aria-label="Search items"
        value={q}
        onChange={handleSearch}
      />
      {filtered.map(i => (
        <Row key={i.id} item={i} onClick={() => onBuy(i)} />
      ))}
    </>
  );
}

export default List;
