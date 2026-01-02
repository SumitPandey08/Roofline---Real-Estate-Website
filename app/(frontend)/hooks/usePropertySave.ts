
import { useState, useEffect } from 'react';
import { useUser } from '@/app/(frontend)/context/UserContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { saveProperty, unsaveProperty } from '@/app/(frontend)/lib/user';

export function usePropertySave(propertyId: string) {
  const { user, loading, fetchUserData } = useUser();
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user && user.savedProperties) {
      setIsSaved(user.savedProperties.includes(propertyId));
    } else {
      setIsSaved(false);
    }
  }, [user, propertyId]);

  const handleToggleSave = async () => {
    if (loading) return;

    if (!user) {
      toast.error('You must be logged in to save properties.');
      router.push('/user/auth/login');
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        await unsaveProperty(propertyId);
        toast.success('Property removed from saved!');
      } else {
        await saveProperty(propertyId);
        toast.success('Property saved!');
      }
      await fetchUserData();
    } catch (error) {
      console.error('Failed to save/unsave property:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaved, isSaving, handleToggleSave, loading };
}
