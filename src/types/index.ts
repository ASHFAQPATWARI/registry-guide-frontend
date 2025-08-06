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

export interface IStoreProductImage {
  id: string;
  path: string;
}

export interface IStoreProduct {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  currencyCode: string;
  images: IStoreProductImage[];
}

export interface IStoreDetails {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionAr: string;
  descriptionEn: string;
  storeLogo: string;
  slug: string;
  products: IStoreProduct[];
}

export interface IStorePageProps {
  store: IStoreDetails;
  lang: string;
  imagePrefix: string;
}

