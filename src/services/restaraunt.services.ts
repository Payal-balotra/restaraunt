import { Restaraunt } from "../models/restaraunt.model";

export const create = async (
  name: string,
  description: string,
  cuisine: string,
  images: string[],
  owner: string,
  address: string,
) => {
  const restaraunt = Restaraunt.create({
    name,
    description,
    cuisine,
    images,
    owner,
    address,
  });
  console.log("Restaraunt created");
  return restaraunt;
};

export const findRestarauntByname = (name: string) => {
  const existingRestaraunt = Restaraunt.findOne({ name });
  return existingRestaraunt;
};
export const findRestarauntById = (id: any) => {
  const existingRestaraunt = Restaraunt.findById(id);
  return existingRestaraunt;
};

export const updateRestarauntById = (id: any, data: any) => {
  const updatedRestaraunt = Restaraunt.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  return updatedRestaraunt;
};

export const deleteRestarauntById = async (id: any) => {
  const deletedRes = Restaraunt.findByIdAndDelete(id);
  return deletedRes;
};
