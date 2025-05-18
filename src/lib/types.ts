// search
type PodcastResult = {
  image: string;
  score: number;
  subtitle: string;
  typeName: string;
  description: string;
  id: number;
  title: string;
  normRank: number;
};

type BestMatch = PodcastResult;

export type PodcastSearchResult = {
  results: PodcastResult[];
  bestMatch: BestMatch;
  nextPage: string;
  queryId: string;
};

// TypeScript type aliases for "get podcasts by category id" API

export type PodcastByCategoryIdResult = {
  id: number;
  name: string;
  heroImage: string;
  heroImageColor: string;
  podcasts: Podcast[];
};

export type Podcast = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  lastUpdated: number;
  lastUpdatedEpisodeTime: number;
  slug: string;
  isExternal: boolean;
  isInteractive: boolean;
  imageUrl: string;
  customLinks: CustomLink[];
  socialMediaLinks: SocialLink[];
  editorialContentQuery: string[][];
  hostIds: string[];
  showType: string;
  talkbackEnabled: boolean;
  brand?: string;
  childOriented: boolean;
  heroImage?: string;
  heroImageColor?: string;
  adTargeting?: AdTargeting;
};

type CustomLink = {
  title?: string;
  link: string;
  navigationIcon?: string;
};

type SocialLink = {
  link: string;
  name: string;
};

type AdTargeting = {
  providerId: number;
};

export type Genre = {
  id: number;
  genreGroup: string;
  genreName: string;
  sortOrder: number;
  count: number;
  image: string;
};
export type Categories = {
  total: number;
  genres: Genre[];
};
