"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: true });
  };

  const t = useTranslations();
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2">
        <Button
          size="lg"
          variant="outline"
          onClick={() => onClick("prev")}
          disabled={Number(page) <= 1}
          className="w-20"
        >
          <ChevronsLeft />
        </Button>
        {t("Search.Page")} {page} {t("Search.of")} {totalPages}
        <Button
          size="lg"
          variant="outline"
          onClick={() => onClick("next")}
          disabled={Number(page) >= totalPages}
          className="w-20"
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
