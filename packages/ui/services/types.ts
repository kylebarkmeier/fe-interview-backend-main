export type Address = {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
};

export type Company = {
  id: string;
  starred: boolean;
  name: string;
  description: string;
  address: Address;
  image?: string;
};

export type SearchParameters = {
  id?: string;
  q?: string;
  starred?: boolean;
  starred_like?: string;
  name?: string;
  name_like?: string;
  description?: string;
  description_like?: string;
  image_like?: string;
  address?: SearchAddressParameters;
  _page?: number;
  _limit?: number;
};

export type SearchAddressParameters = {
  address1?: string;
  address1_like?: string;
  address2?: string;
  address2_like?: string;
  city?: string;
  city_like?: string;
  state?: string;
  state_like?: string;
  postalCode?: string;
  postalCode_like?: string;
};

export type AddCompanyParameters = {
  name: string;
  description?: string;
  starred: boolean;
  image?: string;
  address: Address;
};

export type UpdateCompanyParameters = {
  id: string;
  name: string;
  description?: string;
  starred: boolean;
  image?: string;
  address: Address;
};

export type EditAddressParameters = {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
};

export type EditCompanyParameters = {
  id: string;
  name?: string;
  description?: string;
  starred?: boolean;
  image?: string;
  address?: EditAddressParameters;
};

export type DeleteCompanyParameters = {
  id: string;
};
