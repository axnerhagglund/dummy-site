import { Container } from "@/components/dummy-site/Container";
import { getProducts } from "@/lib/products/getProducts";
import { ProductsClient } from "./ProductsClient";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const products = await getProducts();
  const { category } = await searchParams;
  const initialCategory = typeof category === "string" ? category : "All Categories";
  return (
    <div className="py-10 lg:py-16 bg-white w-full grow">
      <Container>
        <ProductsClient initialProducts={products} initialCategory={initialCategory} />
      </Container>
    </div>
  );
}
