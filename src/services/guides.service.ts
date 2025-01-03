// import { http } from "@/api/http";
import endpoints from "@/constants/endpoints";
import { IGuideDetails } from "@/types";

// export const fetchGuide = async (url: string) => {
//   return await http.get<IGuideDetails>(`${endpoints.guides.index}/${url}`);
// };

export const fetchGuideByUrl = async (url: string): Promise<IGuideDetails> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoints.guides.index}/${url}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: IGuideDetails = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching guide:", error);
    throw error;
  }
};
