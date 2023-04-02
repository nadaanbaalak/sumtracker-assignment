export type UrlType = string | null;

interface IPaginationUI {
  next: UrlType;
  prev: UrlType;
  onPrevClick?: (prev: UrlType) => void;
  onNextClick?: (next: UrlType) => void;
}

interface ResultStringInterface {
  pagination: PaginateDataType;
  loading: boolean;
  pageString?: string;
}

type PaginateDataType = {
  next: UrlType;
  prev: UrlType;
  count: number | null;
  count: number | null;
  resultsCount: number;
  limit: number | null;
  hasOffset: boolean;
  offset: number | null;
};

interface IProduct {
  alert_threshold: number | null;
  available: number;
  barcode: string;
  booked: number;
  bundle_type: "NONE" | "BUNDLE";
  category: string;
  client: number;
  close_at_quantity: number;
  cost: string;
  created: Date;
  id: number;
  image_url: string;
  in_stock: number;
  incoming: number;
  is_archived: boolean;
  lead_time: null;
  name: string;
  notes: string;
  sku: string;
  tax: number | null;
  tax_id: number | string | null;
  tracking_type: number;
  uom: "pcs";
  updated: Date;
  variant_name: string;
}

interface ISupplierSerializer {
  id: number;
  dispatch_address_id: number | null;
  dispatch_address: IDispatchAddress | null;
  currency: string;
  created: Date;
  updated: Date;
  code: string;
  first_name: string;
  last_name: string;
  company_name: string;
  payment_terms: string;
  notes: string;
  email: string;
  phone: string;
}

interface IDispatchAddress {
  id: number;
  label: string;
  company_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  tax_num: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}
