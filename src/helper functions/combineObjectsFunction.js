// This function takes an array of objects and combines them into a single object.
export default function combineObjects(objects) {
  const combinedObjects = {};
  for (let i = 0 ; i < objects.length ; i++) {
    Object.assign(combinedObjects, objects[i]);
  }
  return combinedObjects;
}