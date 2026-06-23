import { RiDice4Line } from 'react-icons/ri';
import { SanitizedThemeConfig } from '../../interfaces/sanitized-config';
import { LOCAL_STORAGE_KEY_NAME } from '../../constants';
import { skeleton } from '../../utils';
import { MouseEvent } from 'react';

/**
 * Renders a theme changer component.
 *
 * @param {Object} props - The props object.
 * @param {string} props.theme - The current theme.
 * @param {function} props.setTheme - A function to set the theme.
 * @param {boolean} props.loading - Whether the component is in a loading state.
 * @param {SanitizedThemeConfig} props.themeConfig - The theme configuration object.
 * @return {JSX.Element} The rendered theme changer component.
 */
const ThemeChanger = ({
  theme,
  setTheme,
  loading,
  themeConfig,
}: {
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  themeConfig: SanitizedThemeConfig;
}) => {
  const changeTheme = (
    e: MouseEvent<HTMLAnchorElement>,
    selectedTheme: string,
  ) => {
    e.preventDefault();

    document.querySelector('html')?.setAttribute('data-theme', selectedTheme);

    typeof window !== 'undefined' &&
      localStorage.setItem(LOCAL_STORAGE_KEY_NAME, selectedTheme);

    setTheme(selectedTheme);
  };

  return (
    <div title="Change Theme" className="dropdown dropdown-end">
      <div
        tabIndex={0}
        className="btn btn-ghost btn-circle bg-base-100/50 backdrop-blur shadow-sm text-base-content opacity-70 hover:opacity-100 m-1"
      >
        {loading ? (
          skeleton({
            widthCls: 'w-5',
            heightCls: 'h-5',
            shape: 'rounded-full',
          })
        ) : (
          <RiDice4Line className="w-5 h-5 stroke-current" />
        )}
      </div>
      <div
        tabIndex={0}
        className="mt-2 overflow-y-auto shadow-2xl dropdown-content max-h-96 min-w-max rounded-2xl bg-base-200 text-base-content z-50 p-2"
      >
        <ul className="menu menu-sm gap-1">
          {[
            themeConfig.defaultTheme,
            ...themeConfig.themes.filter(
              (item) => item !== themeConfig.defaultTheme,
            ),
          ].map((item, index) => (
            <li key={index}>
              <a
                onClick={(e) => changeTheme(e, item)}
                className={`rounded-lg ${theme === item ? 'active' : ''}`}
              >
                <span className="opacity-80 capitalize">
                  {item === themeConfig.defaultTheme ? 'Default' : item}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThemeChanger;
