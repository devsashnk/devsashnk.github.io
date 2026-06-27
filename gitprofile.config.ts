// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'devsashnk', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: false, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
    },
  },
  seo: { title: 'Portfolio of Saeesh Naik', description: '', imageURL: '' },
  // Personal details displayed on the profile card
  personalDetails: {
    name: 'Saeesh Naik',
    titles: ['.NET', 'Full-Stack developer', 'Lead Developer'],
    about: `I'm a .NET developer with over 7 years of experience building web applications and APIs. I enjoy creating solutions that are reliable, secure, and easy to maintain, with a strong focus on application scalability and performance.
Technology is something I genuinely enjoy, not just as a profession but as a hobby. I like exploring new tools, frameworks, and industry trends to keep learning and improving my skills.
Outside of work, I love playing table tennis, carrom, and cricket, listening to music, and reading about the latest developments in technology.`,
    location: 'Merces, Goa, India',
    birthdate: '14th October 1990',
    gender: 'Male',
    nationality: 'Indian',
    languages: 'English, Konkani, Hindi and Marathi',
    interests: 'Playing sports',
  },
  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    codepen: 'devsashnk',
    stackoverflow: '', // example: '1/jeff-atwood'
    discord: '',
    telegram: '',
    website: 'https://devsashnk.github.io',
    phone: '',
    email: 'saeeshnaik@gmail.com',
  },
  resume: {
    fileUrl:
      'https://drive.google.com/file/d/1-0lFlM8LE3TBQSJe_tO1Y-vP4A9_DVi4/view?usp=sharing', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    '.NET',
    'JavaScript',
    'React.js',
    'MsSqlServer',
    'PostgreSQL',
    'Git',
    'Docker',
    'CSS',
    'Tailwind',
    'Dapper',
    'Github',
    'Oracle',
    'Entity Framework',
  ],
  experiences: [
    {
      company: 'National Informatics Centre',
      position: 'Software Developer',
      from: 'October 2022',
      to: 'Present'
    },
    {
      company: 'Plus Innovations',
      position: 'Senior Software Developer',
      from: 'March 2020',
      to: 'June 2020',
    },
    {
      company: 'eDot Solutions',
      position: 'Software Developer',
      from: 'May 2016',
      to: 'September 2019',
    }
  ],
  certifications: [
    {
      name: 'Advanced ASP.NET',
      body: 'System Domain, Bangalore',
      year: '2016'
    },
  ],
  educations: [
    {
      institution: 'Shree Rayeshwar Institute of Engineering & Information Technology',
      degree: 'BE Computer',
      from: '2009',
      to: '2013',
    },
    {
      institution: 'Peoples Higher Secondary School',
      degree: 'HSSC - Science',
      from: '2006',
      to: '2008',
    },
    {
      institution: 'Peoples High School',
      degree: 'SSC',
      from: '2000',
      to: '2006',
    }
  ],
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: { id: '', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'nord',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: true,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'nord',
      'corporate',
      'business',
      'lofi',
      'black',
      'wireframe'
    ],
  },

  // Optional Footer. Supports plain text or HTML.
  footer: '',

  enablePWA: true,
};

export default CONFIG;
