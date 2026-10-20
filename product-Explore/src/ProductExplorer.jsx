import { useEffect, useMemo, useState } from "react";

const PRODUCTS_URL = "https://dummyjson.com/products?limit=30";

function ProductCard({ product }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-sky-100">
        {product.thumbnail ? (
          <img
            className="h-full w-full rounded-xl object-contain p-4"
            src={product.thumbnail}
            alt={product.name}
          />
        ) : (
          <span className="text-4xl" aria-hidden="true">📦</span>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
          {product.category}
        </p>
        <h2 className="text-lg font-bold text-slate-900">{product.name}</h2>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="text-xl font-extrabold text-slate-900">
            ${product.price.toFixed(2)}
          </p>
          {product.rating && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700">
              ★ {product.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function LoadingCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5 h-40 rounded-xl bg-slate-200" />
      <div className="mb-3 h-3 w-1/3 rounded bg-slate-200" />
      <div className="mb-5 h-5 w-3/4 rounded bg-slate-200" />
      <div className="h-6 w-1/3 rounded bg-slate-200" />
    </div>
  );
}

export default function ProductExplorer() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(PRODUCTS_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const formattedProducts = data.products.map((product) => ({
          id: product.id,
          name: product.title,
          category: product.category,
          price: product.price,
          rating: product.rating,
          thumbnail: product.thumbnail,
        }));

        setProducts(formattedProducts);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError("We couldn't load the products. Check your connection and try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, [reloadKey]);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });
  }, [products, search, selectedCategory, sortOrder]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortOrder("Default");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 px-6 py-10 text-white shadow-xl sm:px-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-200">
            Discover something new
          </p>
          <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            Product Explorer
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-indigo-100 sm:text-lg">
            Browse our collection, find exactly what you need, and compare
            products with simple search and filters.
          </p>
        </header>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" aria-label="Product filters">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px_auto]">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400" aria-hidden="true">⌕</span>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <label>
              <span className="sr-only">Filter by category</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value="All">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="sr-only">Sort products</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="Default">Default order</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>

            <button
              className="rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              type="button"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </section>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">
            {loading ? "Loading products..." : `${visibleProducts.length} products found`}
          </p>
          {!loading && products.length > 0 && (
            <p className="hidden text-sm text-slate-400 sm:block">Updated just now</p>
          )}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-semibold text-red-800">{error}</p>
            <button
              className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => <LoadingCard key={index} />)}
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-4xl" aria-hidden="true">🔎</p>
            <h2 className="mt-4 text-xl font-bold text-slate-900">No products found</h2>
            <p className="mt-2 text-slate-500">Try a different search term or clear your filters.</p>
            <button
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
              type="button"
              onClick={resetFilters}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
