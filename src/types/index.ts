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