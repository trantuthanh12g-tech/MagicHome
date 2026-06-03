export interface ServiceImage {
  id: string;
  url: string;
  caption?: string;
}

export interface ServiceVideo {
  id: string;
  youtubeUrl: string;
  title?: string;
}

export interface BeforeAfterPair {
  id: string;
  before: string;
  after: string;
  label?: string;
}

export interface Service {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  images: ServiceImage[];
  videos?: ServiceVideo[];
  beforeAfterPairs?: BeforeAfterPair[];
  price?: string;
  priceUnit?: string;
  deliveryTime?: string;
}

export type ServiceId = 'photos' | 'day-to-dusk' | 'retouch' | 'virtual-staging' | 'video' | 'floorplan';