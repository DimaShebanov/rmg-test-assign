import React from "react";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import { useProductsList } from "../../entities/Product/hooks/useProductsList";
import ProductsList from "./ProductsList/ProductsList";

const ProductsListPage = () => {
  const { products, isLoading, isError } = useProductsList();

  const getContent = () => {
    if (isLoading) {
      return (
        <div className="size-full flex place-content-center text-2xl">
          Loading...
        </div>
      );
    }

    if (isError) {
      return (
        <div className="size-full flex place-content-center text-2xl">
          Oops! Something went wrong...
        </div>
      );
    }

    return <ProductsList products={products} />;
  };

  return <PageLayout title="My first e-shop">{getContent()}</PageLayout>;
};

export default ProductsListPage;
