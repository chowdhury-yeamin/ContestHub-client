import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase.config';

export const uploadImage = async (file, path = 'images') => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const uploadMultipleImages = async (files, path = 'images') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, path));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

