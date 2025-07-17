import Link from "next/link";

import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import {
  getAllCategories,
  getAllProducts,
  getAllTags,
} from "@/lib/actions/product.actions";
import { IProduct } from "@/lib/db/models/product.model";
import ProductSortSelector from "@/components/shared/product/product-sort-selector";
import { getFilterUrl, toSlug } from "@/lib/utils";
import Rating from "@/components/shared/product/rating";

import CollapsibleOnMobile from "@/components/shared/collapsible-on-mobile";
import { getTranslations } from "next-intl/server";
import { SlidersHorizontal } from "lucide-react";

const sortOrders = [
  { value: "price-low-to-high", name: "Price: Low to high" },
  { value: "price-high-to-low", name: "Price: High to low" },
  { value: "newest-arrivals", name: "Newest arrivals" },
  { value: "avg-customer-review", name: "Avg. customer review" },
  { value: "best-selling", name: "Best selling" },
];

const prices = [
  {
    name: "$1 to $20",
    value: "1-20",
  },
  {
    name: "$21 to $50",
    value: "21-50",
  },
  {
    name: "$51 to $1000",
    value: "51-1000",
  },
];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    tag: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations();
  const {
    q = "all",
    category = "all",
    tag = "all",
    price = "all",
    rating = "all",
  } = searchParams;

  if (
    (q !== "all" && q !== "") ||
    category !== "all" ||
    tag !== "all" ||
    rating !== "all" ||
    price !== "all"
  ) {
    return {
      title: `${t("Search.Search")} ${q !== "all" ? q : ""}
          ${category !== "all" ? ` : ${t("Search.Category")} ${category}` : ""}
          ${tag !== "all" ? ` : ${t("Search.Tag")} ${tag}` : ""}
          ${price !== "all" ? ` : ${t("Search.Price")} ${price}` : ""}
          ${rating !== "all" ? ` : ${t("Search.Rating")} ${rating}` : ""}`,
    };
  } else {
    return {
      title: t("Search.Search Products"),
    };
  }
}

export default async function SearchPage(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    tag: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const {
    q = "all",
    category = "all",
    tag = "all",
    price = "all",
    rating = "all",
    sort = "best-selling",
    page = "1",
  } = searchParams;

  const params = { q, category, tag, price, rating, sort, page };

  const categories = await getAllCategories();
  const tags = await getAllTags();
  const data = await getAllProducts({
    category,
    tag,
    query: q,
    price,
    rating,
    page: Number(page),
    sort,
  });
  const t = await getTranslations();
  return (
    <div className="container mx-auto p-4">
      <div className="text-xl sm:text-2xl md:text-3xl font-extrabold italic uppercase text-center mb-4 sm:mb-6 py-1 sm:py-2">
        {category !== "all" && category !== "" ? category : "Graphico Shirts"}
      </div>
      <div className="flex overflow-x-auto space-x-4 mb-6 pb-2 snap-x snap-mandatory scrollbar-hidden md:overflow-x-hidden md:flex-wrap md:justify-center">
        <button className="px-4 py-1 font-bold border border-slate-900 rounded whitespace-nowrap snap-start">
          NEW
        </button>
        <button className="px-4 py-1 font-bold border border-slate-900 rounded whitespace-nowrap snap-start">
          FRESH
        </button>
        <button className="px-4 py-1 font-bold border border-slate-900 rounded whitespace-nowrap snap-start">
          TRENDY
        </button>
        <button className="px-4 py-1 font-bold border border-slate-900 rounded whitespace-nowrap snap-start">
          ALTERNATIVE
        </button>
        <button className="px-4 py-1 font-bold border border-slate-900 rounded whitespace-nowrap snap-start">
          FUNNY
        </button>
        <button className="px-4 py-1 font-bold border border-slate-900 rounded whitespace-nowrap snap-start">
          POP CULTURE
        </button>
        <button className="px-4 py-1 font-bold border border-slate-900 rounded whitespace-nowrap snap-start">
          CUSTOM
        </button>
        <button className="px-4 py-1 font-bold border border-slate-900 rounded whitespace-nowrap snap-start">
          BLANK TEES
        </button>
      </div>
      <div className="my-2 bg-card flex-between flex-col md:flex-row ">
        <div className="flex mb-2 md:mb-0 w-auto items-center">
          <SlidersHorizontal className="mr-2 p-1" />
          {data.totalProducts === 0
            ? t("Search.No")
            : `${data.from}-${data.to} ${t("Search.of")} ${
                data.totalProducts
              }`}{" "}
          {t("Search.results")}
          {(q !== "all" && q !== "") ||
          (category !== "all" && category !== "") ||
          (tag !== "all" && tag !== "") ||
          rating !== "all" ||
          price !== "all"
            ? ` ${t("Search.for")} `
            : null}
          {q !== "all" && q !== "" && '"' + q + '"'}
          {category !== "all" &&
            category !== "" &&
            `   ${t("Search.Category")}: ` + category}
          {tag !== "all" && tag !== "" && `   ${t("Search.Tag")}: ` + tag}
          {price !== "all" && `    ${t("Search.Price")}: ` + price}
          {rating !== "all" &&
            `    ${t("Search.Rating")}: ` + rating + ` & ${t("Search.up")}`}
          &nbsp;
          {(q !== "all" && q !== "") ||
          (category !== "all" && category !== "") ||
          (tag !== "all" && tag !== "") ||
          rating !== "all" ||
          price !== "all" ? (
            <Button variant={"link"} asChild>
              <Link href="/search">{t("Search.Clear")}</Link>
            </Button>
          ) : null}
        </div>
        <div>
          <ProductSortSelector
            sortOrders={sortOrders}
            sort={sort}
            params={params}
          />
        </div>
      </div>

      <div className="bg-card grid md:grid-cols-5 md:gap-4">
        <CollapsibleOnMobile title={t("Search.Filters")}>
          <div className="space-y-4 mt-4">
            <div>
              <div className="font-bold py-1 border-t">
                {t("Search.Department")}
              </div>
              <ul>
                <li>
                  <Link
                    className={`${
                      ("all" === category || "" === category) &&
                      "text-primary hover:font-bold"
                    }`}
                    href={getFilterUrl({ category: "all", params })}
                  >
                    {t("Search.All")}
                  </Link>
                </li>
                {categories.map((c: string) => (
                  <li key={c}>
                    <Link
                      className={`${c === category && "text-primary"} hover:font-bold`}
                      href={getFilterUrl({ category: c, params })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-bold py-1 border-t">{t("Search.Price")}</div>
              <ul>
                <li>
                  <Link
                    className={`${"all" === price && "text-primary hover:font-bold"}`}
                    href={getFilterUrl({ price: "all", params })}
                  >
                    {t("Search.All")}
                  </Link>
                </li>
                {prices.map((p) => (
                  <li key={p.value}>
                    <Link
                      href={getFilterUrl({ price: p.value, params })}
                      className={`${p.value === price && "text-primary"} hover:font-bold`}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-bold py-1 border-t">
                {t("Search.Customer Review")}
              </div>
              <ul>
                <li>
                  <Link
                    href={getFilterUrl({ rating: "all", params })}
                    className={`${"all" === rating && "text-primary"} hover:font-bold`}
                  >
                    {t("Search.All")}
                  </Link>
                </li>

                <li>
                  <Link
                    href={getFilterUrl({ rating: "4", params })}
                    className={`${"4" === rating && "text-primary"} hover:font-bold`}
                  >
                    <div className="flex">
                      <Rating size={4} rating={4} />
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-bold py-1 border-t">{t("Search.Tag")}</div>
              <ul>
                <li>
                  <Link
                    className={`${
                      ("all" === tag || "" === tag) &&
                      "text-primary hover:font-bold"
                    }`}
                    href={getFilterUrl({ tag: "all", params })}
                  >
                    {t("Search.All")}
                  </Link>
                </li>
                {tags.map((t: string) => (
                  <li key={t}>
                    <Link
                      className={`${toSlug(t) === tag && "text-primary"} hover:font-bold`}
                      href={getFilterUrl({ tag: t, params })}
                    >
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleOnMobile>

        <div className="md:col-span-4 space-y-4">
          <div></div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3  ">
            {data.products.length === 0 && (
              <div>{t("Search.No product found")}</div>
            )}
            {data.products.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {data.totalPages > 1 && (
            <Pagination page={page} totalPages={data.totalPages} />
          )}
        </div>
      </div>
    </div>
  );
}
