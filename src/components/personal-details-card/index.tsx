import { skeleton } from '../../utils';

const PersonalDetailsCard = ({ loading }: { loading: boolean }) => {
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
              <span className="text-base-content opacity-70">Personal Details</span>
            )}
          </h5>
        </div>
        <div className="p-3 text-base-content text-opacity-60 text-sm space-y-4">
          {loading ? (
            renderSkeleton()
          ) : (
            <ul className="list-none space-y-2">
                <li>📍 Based in {CONFIG.personalDetails.location}</li>
                <li>🎂 Born on {CONFIG.personalDetails.birthdate}</li>
                <li>👨 Gender: {CONFIG.personalDetails.gender}</li>
                <li>🌍 Nationality: {CONFIG.personalDetails.nationality}</li>
                <li>🗣️ Languages known: {CONFIG.personalDetails.languages}</li>
                <li>💡 Interests: {CONFIG.personalDetails.interests}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsCard;
