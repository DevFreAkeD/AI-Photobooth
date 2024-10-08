import { ObjectId } from 'mongodb';

export const objectIdService = (Id) => {
  let objectId = new ObjectId(Id);
  return objectId;
};