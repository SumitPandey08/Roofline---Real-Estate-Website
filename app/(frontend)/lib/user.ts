
import axios from "axios";

async function saveProperty(propertyId: string) {
  await axios.post('/api/users/save-property', { propertyId });
}

async function unsaveProperty(propertyId: string) {
  await axios.post('/api/users/unsave-property', { propertyId });
}

export { saveProperty, unsaveProperty };
