export enum EGuideStatus {
  DRAFT = "Draft",
  SUBMITTED = "Submitted",
  PUBLISHED = "Published",
}

export interface IGuide {
  id: string;
  name: string;
  description: string;
  url?: string;
  bannerImage: string;
  status: EGuideStatus;
  publishedAt: string;
  updatedAt: string;
  isActive: boolean;
  content: string;
  category: {
    id: string;
    name: string;
    parent: {
      id: string;
      name: string;
    };
  };
  author: {
    id: string;
    name: string;
    image: string;
  };
}

export interface IGuideDetails extends IGuide {
  description: string;
}
