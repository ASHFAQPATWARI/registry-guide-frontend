import { http } from "@/api/http";
import endpoints from "@/constants/endpoints";
import { IGuideDetails } from "@/types";

export const fetchGuide = async (url: string) => {
  return await http.get<IGuideDetails>(`${endpoints.guides.index}/${url}`);
};
