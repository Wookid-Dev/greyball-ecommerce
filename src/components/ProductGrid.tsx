"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SearchAndFilter from "@/components/SearchAndFilter";
import { Product } from "@/utils/types";
import { fetchProducts } from "@/services/productApi";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);

  const initialCount = 10;
  const loadCount = 5;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function getProducts() {
      const productsData: Product[] = await fetchProducts();
      setProducts(productsData);

      // Load the initial set of products and categories
      const initialProducts = productsData.slice(0, initialCount);
      setDisplayedProducts(initialProducts);
      updateCategories(initialProducts);
    }

    getProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        hasMore
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedProducts, hasMore]);

  const loadMoreProducts = () => {
    const nextProducts = products.slice(
      displayedProducts.length,
      displayedProducts.length + loadCount
    );
    setDisplayedProducts((prevProducts) => [...prevProducts, ...nextProducts]);

    updateCategories(nextProducts); // Update categories based on loaded products

    if (displayedProducts.length + nextProducts.length >= products.length) {
      setHasMore(false);
    }
  };

  const updateCategories = (productsSubset: Product[]) => {
    const uniqueCategories = Array.from(
      new Set(productsSubset.map((product) => product.category))
    );

    setCategories((prevCategories) => [
      ...Array.from(new Set([...prevCategories, ...uniqueCategories])),
    ]);
  };

  const filteredProducts = displayedProducts.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating =
      product.rating.rate >= ratingRange[0] &&
      product.rating.rate <= ratingRange[1];

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setPriceRange={setPriceRange}
        setRatingRange={setRatingRange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-4">
          <p>Loading more products...</p>
        </div>
      )}
    </div>
  );
}
