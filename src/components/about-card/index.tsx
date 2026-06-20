import { skeleton } from '../../utils';

const AboutCard = ({ loading }: { loading: boolean }) => {
  const renderSkeleton = () => {
    return (
      <div className="flex flex-col gap-3">
        {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
        {skeleton({ widthCls: 'w-5/6', heightCls: 'h-4' })}
        {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
      </div>
    );
  };

  return (
    <div className="card shadow-xl card-sm glass-card z-hover">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">About Me</span>
            )}
          </h5>
        </div>
        <div className="p-3 text-base-content text-opacity-60 text-sm text-justify space-y-4">
          {loading ? (
            renderSkeleton()
          ) : (
            <>
              <p>
                I'm a .NET developer with over 7 years of experience building web applications and APIs. I enjoy creating solutions that are reliable, secure, and easy to maintain, with a strong focus on application security and performance.
              </p>
              <p>
                Technology is something I genuinely enjoy, not just as a profession but as a hobby. I like exploring new tools, frameworks, and industry trends to keep learning and improving my skills.
              </p>
              <p>
                Outside of work, I love playing table tennis, carrom, and cricket, listening to music, and reading about the latest developments in technology.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
