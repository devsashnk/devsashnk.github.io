import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import {
  CustomError,
  GENERIC_ERROR,
  INVALID_CONFIG_ERROR,
  INVALID_GITHUB_USERNAME_ERROR,
  setTooManyRequestError,
} from '../constants/errors';
import '../assets/index.css';
import { getInitialTheme, getSanitizedConfig, setupHotjar } from '../utils';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import ErrorPage from './error-page';
import { DEFAULT_THEMES } from '../constants/default-themes';
import ThemeChanger from './theme-changer';
import AvatarCard from './avatar-card';
import { Profile } from '../interfaces/profile';
import DetailsCard from './details-card';
import SkillCard from './skill-card';
import ExperienceCard from './experience-card';
import EducationCard from './education-card';
import CertificationCard from './certification-card';
import { GithubProject } from '../interfaces/github-project';
import GithubProjectCard from './github-project-card';
import ExternalProjectCard from './external-project-card';
import BlogCard from './blog-card';
import Footer from './footer';
import PublicationCard from './publication-card';

/**
 * Renders the GitProfile component.
 *
 * @param {Object} config - the configuration object
 * @return {JSX.Element} the rendered GitProfile component
 */
const GitProfile = ({ config }: { config: Config }) => {
  const [sanitizedConfig] = useState<SanitizedConfig | Record<string, never>>(
    getSanitizedConfig(config),
  );
  const [theme, setTheme] = useState<string>(DEFAULT_THEMES[0]);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);

  const getGithubProjects = useCallback(
    async (publicRepoCount: number): Promise<GithubProject[]> => {
      if (sanitizedConfig.projects.github.mode === 'automatic') {
        if (publicRepoCount === 0) {
          return [];
        }

        const excludeRepo =
          sanitizedConfig.projects.github.automatic.exclude.projects
            .map((project) => `+-repo:${project}`)
            .join('');

        const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excludeRepo}`;
        const url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`;

        const repoResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        const repoData = repoResponse.data;

        return repoData.items;
      } else {
        if (sanitizedConfig.projects.github.manual.projects.length === 0) {
          return [];
        }
        const repos = sanitizedConfig.projects.github.manual.projects
          .map((project) => `+repo:${project}`)
          .join('');

        const url = `https://api.github.com/search/repositories?q=${repos}+fork:true&type=Repositories`;

        const repoResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        const repoData = repoResponse.data;

        return repoData.items;
      }
    },
    [
      sanitizedConfig.github.username,
      sanitizedConfig.projects.github.mode,
      sanitizedConfig.projects.github.manual.projects,
      sanitizedConfig.projects.github.automatic.sortBy,
      sanitizedConfig.projects.github.automatic.limit,
      sanitizedConfig.projects.github.automatic.exclude.forks,
      sanitizedConfig.projects.github.automatic.exclude.projects,
    ],
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.github.com/users/${sanitizedConfig.github.username}`,
      );
      const data = response.data;

      setProfile({
        avatar: data.avatar_url,
        name: data.name || ' ',
        bio: data.bio || '',
        location: data.location || '',
        company: data.company || '',
      });

      if (!sanitizedConfig.projects.github.display) {
        return;
      }

      setGithubProjects(await getGithubProjects(data.public_repos));
    } catch (error) {
      handleError(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  }, [
    sanitizedConfig.github.username,
    sanitizedConfig.projects.github.display,
    getGithubProjects,
  ]);

  useEffect(() => {
    if (Object.keys(sanitizedConfig).length === 0) {
      setError(INVALID_CONFIG_ERROR);
    } else {
      setError(null);
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      loadData();
    }
  }, [sanitizedConfig, loadData]);

  useEffect(() => {
    theme && document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleError = (error: AxiosError | Error): void => {
    console.error('Error:', error);

    if (error instanceof AxiosError) {
      try {
        const reset = formatDistance(
          new Date(error.response?.headers?.['x-ratelimit-reset'] * 1000),
          new Date(),
          { addSuffix: true },
        );

        if (typeof error.response?.status === 'number') {
          switch (error.response.status) {
            case 403:
              setError(setTooManyRequestError(reset));
              break;
            case 404:
              setError(INVALID_GITHUB_USERNAME_ERROR);
              break;
            default:
              setError(GENERIC_ERROR);
              break;
          }
        } else {
          setError(GENERIC_ERROR);
        }
      } catch (innerError) {
        setError(GENERIC_ERROR);
      }
    } else {
      setError(GENERIC_ERROR);
    }
  };

  return (
    <div className="fade-in min-h-screen animated-bg relative overflow-hidden">
      <div className="hero-glow"></div>
      {error ? (
        <ErrorPage
          status={error.status}
          title={error.title}
          subTitle={error.subTitle}
        />
      ) : (
        <>
          <div className="p-4 lg:p-10 min-h-full relative z-10 max-w-7xl mx-auto">
            {/* HERO SECTION */}
            <div className="flex flex-col items-center justify-center text-center mb-8 pt-4 lg:pt-8">
              {!sanitizedConfig.themeConfig.disableSwitch && (
                <div className="absolute top-4 right-4 lg:top-10 lg:right-10">
                  <ThemeChanger
                    theme={theme}
                    setTheme={setTheme}
                    loading={loading}
                    themeConfig={sanitizedConfig.themeConfig}
                  />
                </div>
              )}
              <div className="w-full max-w-lg flex flex-col items-center glass-card p-4 rounded-3xl z-hover">
                <AvatarCard
                  profile={profile}
                  loading={loading}
                  avatarRing={sanitizedConfig.themeConfig.displayAvatarRing}
                  resumeFileUrl={sanitizedConfig.resume.fileUrl}
                />
                <div className="mt-4 w-full">
                  <DetailsCard
                    profile={profile}
                    loading={loading}
                    github={sanitizedConfig.github}
                    social={sanitizedConfig.social}
                  />
                </div>
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="columns-1 md:columns-2 gap-8 w-full [&>div]:break-inside-avoid [&>div]:mb-8">
              {sanitizedConfig.skills.length !== 0 && (
                <div>
                  <SkillCard
                    loading={loading}
                    skills={sanitizedConfig.skills}
                  />
                </div>
              )}
              {sanitizedConfig.experiences.length !== 0 && (
                <div>
                  <ExperienceCard
                    loading={loading}
                    experiences={sanitizedConfig.experiences}
                  />
                </div>
              )}
              {sanitizedConfig.educations.length !== 0 && (
                <div>
                  <EducationCard
                    loading={loading}
                    educations={sanitizedConfig.educations}
                  />
                </div>
              )}
              {sanitizedConfig.certifications.length !== 0 && (
                <div>
                  <CertificationCard
                    loading={loading}
                    certifications={sanitizedConfig.certifications}
                  />
                </div>
              )}
              {sanitizedConfig.projects.github.display && (
                <div>
                  <GithubProjectCard
                    header={sanitizedConfig.projects.github.header}
                    limit={sanitizedConfig.projects.github.automatic.limit}
                    githubProjects={githubProjects}
                    loading={loading}
                    googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                  />
                </div>
              )}
              {sanitizedConfig.publications.length !== 0 && (
                <div>
                  <PublicationCard
                    loading={loading}
                    publications={sanitizedConfig.publications}
                  />
                </div>
              )}
              {sanitizedConfig.projects.external.projects.length !== 0 && (
                <div>
                  <ExternalProjectCard
                    loading={loading}
                    header={sanitizedConfig.projects.external.header}
                    externalProjects={sanitizedConfig.projects.external.projects}
                    googleAnalyticId={sanitizedConfig.googleAnalytics.id}
                  />
                </div>
              )}
              {sanitizedConfig.blog.display && (
                <div>
                  <BlogCard
                    loading={loading}
                    googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                    blog={sanitizedConfig.blog}
                  />
                </div>
              )}
            </div>
          </div>
          {sanitizedConfig.footer && (
            <footer className="p-4 footer text-base-content footer-center relative z-10 pb-8">
              <div className="glass-card px-8 py-4 rounded-full shadow-lg">
                <Footer content={sanitizedConfig.footer} loading={loading} />
              </div>
            </footer>
          )}
        </>
      )}
    </div>
  );
};

export default GitProfile;
