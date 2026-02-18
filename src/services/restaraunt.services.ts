import { Restaraunt } from "../models/restaraunt.model";

export const create =  async (
  name: string,
  description: string,
  cuisine: string,
  images: string[],
  owner: string,
  address: string,
  isActive: boolean,
) => {
  const restaraunt = Restaraunt.create({ name, description, cuisine, images, owner ,address ,isActive});
  console.log("Restaraunt created");
  return restaraunt;
};

export const findRestarauntByname = (name: string) =>{
    const existingRestaraunt = Restaraunt.findOne({name});
    return existingRestaraunt;

}
