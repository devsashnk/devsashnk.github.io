import { FALLBACK_IMAGE } from '../../constants';
import { useState, useEffect } from 'react';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
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
  resumeFileUrl,
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
      <div className="grid place-items-center pt-0 pb-2">
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-8 rounded-full w-32 h-32">
              {skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90">
            <div
              className={`mb-4 rounded-full w-24 h-24 ${
                avatarRing
                  ? 'ring-3 ring-primary ring-offset-base-100 ring-offset-2'
                  : ''
              }`}
            >
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
        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-gradient-animate text-3xl">
                Saeesh Naik
              </span>
            )}
          </h5>
          {/* Typed animation */}
          <p className="typed-text text-base-content mt-1">
            {display}<span className="cursor">|</span>
          </p>
          <div className="mt-1 text-base-content font-mono">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>
        </div>
        {resumeFileUrl &&
          (loading ? (
            <div className="mt-2">
              {skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}
            </div>
          ) : (
            <a
              href={resumeFileUrl}
              target="_blank"
              className="btn btn-primary btn-outline btn-sm text-xs mt-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              download
              rel="noreferrer"
            >
              Download Resume
            </a>
          ))}
      </div>
    </div>
  );
};

export default AvatarCard;
