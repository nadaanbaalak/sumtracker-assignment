import { FC, useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import ResultString from "../../../components/content/result.content";
import Heading from "../../../components/heading/basic.heading";
import Pagination from "../../../components/pagination/basic.pagination";
import SupplierSearchTypeAhead from "../../../components/SupplierSearchTypeAhead";
import { PAGINATION_LIMIT } from "../../../constants/app.constants";
import {
  IProduct,
  ISupplierSerializer,
  PaginateDataType,
  UrlType,
} from "../../../interface/common";
import { listProducts } from "../../../services/products";
import { getQueryFromUrl } from "../../../utils/common.utils";
import ProductsTable from "./components/products.table";

const fixedListParams = {
  paginate: true,
};

const ProductList: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSupplierId, setSupplierId] = useState<number | null>(null);
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginateDataType>({
    next: null,
    prev: null,
    count: null,
    resultsCount: 0,
    offset: null,
    hasOffset: true,
    limit: PAGINATION_LIMIT,
  });

  useEffect(() => {
    const paramValue = searchParams.get("contact");
    if (paramValue) {
      setSupplierId(Number(paramValue));
      loadProducts({ contact: paramValue });
    } else {
      loadProducts();
    }
  }, [searchParams]);

  const init = async () => {
    loadProducts();
  };

  const loadProducts = async (queryParams?: Record<string, any>) => {
    let query = queryParams || {};
    setLoading(true);
    try {
      const res = await listProducts({
        query: { ...fixedListParams, ...query },
      });

      setProducts(res.data.results);
      setPagination((prev) => {
        return {
          ...prev,
          next: res.data.next,
          prev: res.data.previous,
          count: res.data.count,
          resultsCount: res.data.results.length,
          offset: query?.offset ? Number(query.offset) : null,
        };
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleNext = (next: UrlType) => {
    if (next === null) {
      return;
    }
    let query = getQueryFromUrl(next);
    loadProducts(query);
  };

  const handlePrev = (prev: UrlType) => {
    if (prev === null) {
      return;
    }
    let query = getQueryFromUrl(prev);
    loadProducts(query);
  };

  function handleSupplierSelection(id: number | null) {
    navigate(`${location.pathname}${id ? `?contact=${id}` : ""}`);
    if (id === null) {
      setSupplierId(null);
    }
  }

  return (
    <>
      <div style={{ marginBottom: "1rem", display: "flex" }}>
        <Heading titleLevel={2}>Products</Heading>
        <SupplierSearchTypeAhead
          onSelection={(itemId) => {
            handleSupplierSelection(itemId);
          }}
          preSelectedSupplierId={selectedSupplierId}
        />
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "0.5rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <ResultString
                loading={loading}
                pagination={pagination}
                pageString={"product"}
              />
            </div>
            <div>
              <Pagination
                next={pagination.next}
                prev={pagination.prev}
                onNextClick={handleNext}
                onPrevClick={handlePrev}
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <ProductsTable list={products} loading={loading} />
        </div>
        <div>
          <Pagination
            next={pagination.next}
            prev={pagination.prev}
            onNextClick={handleNext}
            onPrevClick={handlePrev}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
