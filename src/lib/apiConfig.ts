const API_BASE = import.meta.env.VITE_API_BASE as string;

type PodcastID = string | number;
type CategoryID = string | number;

interface ApiClient {
  search: (q: string) => Promise<any>;
  podcastDetails: (id: PodcastID) => Promise<any>;
  podcastEpisodes: (id: PodcastID, limit?: number) => Promise<any>;
  podcastsByCategoryId: (categoryId: CategoryID) => Promise<any>;
  categories: () => Promise<any>;
  podcastEpisodeMedia: (id: string | number) => Promise<any>;
}

async function fetchJson(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP error ${response.status}`);
  }
  return response.json();
}

const podcastClient: ApiClient = {
  // Search for podcasts (and other entities)
  search: (q) =>
    fetchJson(
      `${API_BASE}/search/combined?boostMarketId=159&bundle=true&keyword=true&keywords=${encodeURIComponent(
        q,
      )}&countryCode=WW&artist=true&playlist=true&station=true&podcast=true&track=true`,
    ),

  // Get podcast show details (about the show, not episodes)
  podcastDetails: (id) =>
    fetchJson(`${API_BASE}/podcast/podcasts/${encodeURIComponent(id)}`),

  // Get podcast episodes (list of episodes for a show)
  podcastEpisodes: (id, limit = 5) =>
    fetchJson(
      `${API_BASE}/podcast/podcasts/${encodeURIComponent(
        id,
      )}/episodes?newEnabled=false&limit=${limit}&sortBy=startDate-desc`,
    ),

  // Get podcasts by category/genre ID
  podcastsByCategoryId: (categoryId) =>
    fetchJson(
      `${API_BASE}/podcast/categories/${encodeURIComponent(categoryId)}`,
    ),

  // Get all podcast categories/genres
  categories: () => fetchJson(`${API_BASE}/catalog/genres?genreType=picker`),

  podcastEpisodeMedia: (id) => fetchJson(`${API_BASE}/podcast/episodes/${id}`),
};

export default podcastClient;
