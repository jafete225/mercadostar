import Link from "next/link";
import Image from "next/image";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Pagination from "./Pagination";

const PRODUCTS_PER_PAGE = 8; // Corrigido o erro de digitação

const ProductList = async ({
  categoryId,
  limit,
  searchParams
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCTS_PER_PAGE)
    .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCTS_PER_PAGE) : 0);

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    
    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }

    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          href={"/" + (product.slug)}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt={product.name || "Produto"}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
            />
            {product.media?.items && product.media.items.length > 1 && (
              <Image
                src={product.media.items[1]?.image?.url || "/product.png"}
                alt={product.name || "Produto"}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name || "Nome do Produto"}</span>
            <span className="font-semibold">
              {product.price?.price || "Preço indisponível"}.00MT
            </span>
          </div>
          {product.additionalInfoSections && (
            <div className="text-sm text-gray-500">
              {product.additionalInfoSections.find(
                (section: any) => section.title === "shortDesc"
              )?.description || ""}
            </div>
          )}
          <button className="mt-1 rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
            Adicionar ao carrinho
          </button>
        </Link>
      ))}
      <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev ? res.hasPrev() : false} // Verifique se hasPrev está disponível
        hasNext={res.hasNext ? res.hasNext() : false} // Verifique se hasNext está disponível
      />
    </div>
  );
};

export default ProductList;
