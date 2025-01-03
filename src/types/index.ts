import { PageProps } from "../../.next/types/app/layout";

export enum EGuideStatus {
  DRAFT = "Draft",
  SUBMITTED = "Submitted",
  PUBLISHED = "Published",
}

export interface IGuide {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  url?: string,
  bannerImage: string;
  authorId: string;
  categoryId: string;
  status: EGuideStatus;
  isActive: boolean;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
  };
}

export interface IGuideDetails extends IGuide {
  descriptionEn: string;
  descriptionAr: string;
}

export interface GuideDetailPageParams {
  detail: string; // Ensure this matches what Next.js expects
}

// Update GuideDetailPageProps to reflect params as a Promise
export interface GuideDetailPageProps extends PageProps {
  params: Promise<GuideDetailPageParams>; // Change here
}