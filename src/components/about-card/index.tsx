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
              {CONFIG.personalDetails.about.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
