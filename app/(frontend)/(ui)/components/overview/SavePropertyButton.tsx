'use client';

import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { usePropertySave } from '@/app/(frontend)/hooks/usePropertySave';

interface SavePropertyButtonProps {
  propertyId: string;
}

export default function SavePropertyButton({ propertyId }: SavePropertyButtonProps) {
  const { isSaved, isSaving, handleToggleSave, loading } = usePropertySave(propertyId);

  return (
    <button
      onClick={handleToggleSave}
      disabled={isSaving || loading}
      className={`
        flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-3 
        rounded-2xl border transition-all duration-200 gap-2 font-bold
        ${isSaved 
          ? 'bg-rose-50 border-rose-200 text-rose-600' 
          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      title={isSaved ? "Remove from saved" : "Save property"}
    >
      {isSaved ? (
        <HiHeart className="text-xl md:text-lg fill-current" />
      ) : (
        <HiOutlineHeart className="text-xl md:text-lg" />
      )}
      <span className="hidden md:inline">
        {isSaving ? 'Saving...' : (isSaved ? 'Saved' : 'Save')}
      </span>
    </button>
  );
}