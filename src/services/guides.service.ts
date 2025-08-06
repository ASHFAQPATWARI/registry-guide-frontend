import { http } from "@/api/http";
import endpoints from "@/constants/endpoints";
import { IGuideDetails, IStoreDetails } from "@/types";

export const fetchGuide = async (url: string) => {
  return await http.get<IGuideDetails>(`${endpoints.guides.index}/${url}`);
};

export const fetchStore = async (url: string) => {
  return await http.get<IStoreDetails>(`${endpoints.stores.index}/${url}`);
};

export const fetchProductAndStore = async (productIds: any, storeIds: any) => {
  const payload = { productIds, storeIds };
  return await http.post<any>(
    `${endpoints.guides.index}/products-and-stores`,
    payload
  );
};
