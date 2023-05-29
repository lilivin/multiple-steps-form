import addOnsData from "../data/addOns.json";

export interface AddOn {
  name: string;
  subtitle: string;
  price: number;
}

export interface AddOns{
  [key: string]: AddOn;
}

export function getAddOnById(id: string): AddOn {
  const addOns: AddOns = addOnsData;
  return addOns[id];
}
