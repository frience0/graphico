import FashionSection from "@/components/shared/home/fashion-card";
import { HomeCarousel } from "@/components/shared/home/home-carousel";
import BestSeller from "@/components/shared/product/best-seller";
import Features from "@/components/shared/product/features";
import ProductGrid from "@/components/shared/product/fun-things";
import ProductSlider from "@/components/shared/product/product-slider";
import { Card, CardContent } from "@/components/ui/card";

import { getProductsByTag } from "@/lib/actions/product.actions";
import { getSetting } from "@/lib/actions/setting.actions";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const { carousels } = await getSetting();
  const todaysDeals = await getProductsByTag({ tag: "todays-deal" });
  const bestSellingProducts = await getProductsByTag({ tag: "best-seller" });

  return (
    <>
      <HomeCarousel items={carousels} />
      <div className="md:p-4 md:space-y-4 bg-border">
        <FashionSection />
        <Card className="w-full rounded-none">
          <CardContent className="p-4 items-center gap-3">
            <ProductSlider
              title={t("Community Favorites")}
              products={todaysDeals}
            />
          </CardContent>
        </Card>
        <Card className="w-full rounded-none">
          <CardContent className="items-center gap-3">
            <BestSeller
              title={t("Top Picks")}
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-background">
        <Features />
      </div>

      <div className="w-full h-full">
        <ProductGrid title={t("Collections")} />
      </div>
    </>
  );
}
