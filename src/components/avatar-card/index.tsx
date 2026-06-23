import { FALLBACK_IMAGE } from '../../constants';
import { useState, useEffect } from 'react';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
}

/**
 * Renders an AvatarCard component.
 * @param profile - The profile object.
 * @param loading - A boolean indicating if the profile is loading.
 * @param avatarRing - A boolean indicating if the avatar should have a ring.
 * @param resumeFileUrl - The URL of the resume file.
 * @returns JSX element representing the AvatarCard.
 */
const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
}) => {
  const words = ['.NET', 'Full-Stack developer', 'Lead Developer'];
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (isDeleting) {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(currentWord.slice(0, display.length - 1)), 100);
      } else {
        setIsDeleting(false);
        setWordIdx((wordIdx + 1) % words.length);
      }
    } else {
      if (display.length < currentWord.length) {
        timeout = setTimeout(() => setDisplay(currentWord.slice(0, display.length + 1)), 150);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIdx]);
  return (
    <div className="w-full">
      <div className="flex flex-col items-center pt-2 pb-2">
        {loading || !profile ? (
          <div className="avatar opacity-90 mb-4">
            <div className="rounded-full w-32 h-32">
              {skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90 mb-5 relative group">
            <div className={`rounded-full w-32 h-32 shadow-xl transition-transform duration-300 group-hover:scale-105 ${avatarRing ? 'ring-4 ring-primary ring-offset-base-100 ring-offset-4' : ''}`}>
              {
                <LazyImage
                  src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
                  alt={profile.name}
                  placeholder={skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                />
              }
            </div>
          </div>
        )}
        <div className="text-center mx-auto px-4 flex flex-col items-center">
          <h5 className="font-bold text-3xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-gradient-animate text-3xl">
                Saeesh Naik
              </span>
            )}
          </h5>
          {/* Typed animation */}
          <p className="text-base-content text-sm font-medium opacity-80 mt-1.5 mb-2">
            {display}<span className="cursor opacity-50">|</span>
          </p>
          <div className="text-base-content text-sm opacity-70 max-w-[280px]">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
