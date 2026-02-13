// src/services/memberPhotosService.ts
// Servicio para gestionar fotos de la misión

import { StorageService } from '../utils/storage';

const MEMBER_PHOTOS_KEY = '@memberPhotos';

export interface MemberPhoto {
  id: string;
  url: string; // URL de la imagen (puede ser base64, blob URL, o URL externa)
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  date: string; // ISO string - fecha en que se tomó la foto
  area?: string;
  companion?: string;
  tags?: string[];
  category?: 'missionary_work' | 'companions' | 'area' | 'service' | 'other';
  createdAt: string;
}

export const MemberPhotosService = {
  loadPhotos: (): MemberPhoto[] => {
    try {
      const stored = StorageService.getItem(MEMBER_PHOTOS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (e) {
      console.error('Error cargando fotos:', e);
      return [];
    }
  },

  savePhotos: (photos: MemberPhoto[]): void => {
    try {
      StorageService.setItem(MEMBER_PHOTOS_KEY, JSON.stringify(photos));
    } catch (e) {
      console.error('Error guardando fotos:', e);
    }
  },

  addPhoto: (
    url: string,
    thumbnailUrl?: string,
    title?: string,
    description?: string,
    date?: string,
    area?: string,
    companion?: string,
    tags?: string[],
    category?: MemberPhoto['category']
  ): MemberPhoto => {
    const photos = MemberPhotosService.loadPhotos();
    const now = new Date().toISOString();
    const newPhoto: MemberPhoto = {
      id: crypto.randomUUID ? crypto.randomUUID() : `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url,
      thumbnailUrl,
      title: title || '',
      description: description || '',
      date: date || now,
      area,
      companion,
      tags: tags || [],
      category: category || 'other',
      createdAt: now,
    };
    MemberPhotosService.savePhotos([...photos, newPhoto]);
    return newPhoto;
  },

  updatePhoto: (id: string, updates: Partial<MemberPhoto>): void => {
    const photos = MemberPhotosService.loadPhotos();
    const updated = photos.map(photo =>
      photo.id === id ? { ...photo, ...updates } : photo
    );
    MemberPhotosService.savePhotos(updated);
  },

  deletePhoto: (id: string): void => {
    const photos = MemberPhotosService.loadPhotos();
    const filtered = photos.filter(p => p.id !== id);
    MemberPhotosService.savePhotos(filtered);
  },

  getPhotosByCategory: (category: MemberPhoto['category']): MemberPhoto[] => {
    const photos = MemberPhotosService.loadPhotos();
    return photos.filter(p => p.category === category);
  },

  getPhotosByArea: (area: string): MemberPhoto[] => {
    const photos = MemberPhotosService.loadPhotos();
    return photos.filter(p => p.area === area);
  },

  getPhotosByDateRange: (startDate: string, endDate: string): MemberPhoto[] => {
    const photos = MemberPhotosService.loadPhotos();
    return photos.filter(photo => {
      const photoDate = new Date(photo.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return photoDate >= start && photoDate <= end;
    });
  },

  getPhotosByTag: (tag: string): MemberPhoto[] => {
    const photos = MemberPhotosService.loadPhotos();
    return photos.filter(p => p.tags?.includes(tag));
  },

  // Helper para convertir File a base64 (para uso en el frontend)
  fileToBase64: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  },
};
