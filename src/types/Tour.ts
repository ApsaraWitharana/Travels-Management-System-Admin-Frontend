export interface Tour {
  _id: string;
  title: string;
  city: string;
  address: string;
  distance: number;
  price: number;
  maxGroupSize: number;
  desc: string;
  reviews: any[];
  photo: string;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TourFormData {
  title: string;
  city: string;
  address: string;
  distance: number;
  price: number;
  maxGroupSize: number;
  desc: string;
  photo: string;
  featured: boolean;
}