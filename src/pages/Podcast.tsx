import PodcastDetails from "@/components/PodcastDetails";
import PodcastEpisodes from "@/components/PodcastEpisodes";
import { useParams } from "react-router-dom";

const Podcast = () => {
  const { id } = useParams();
  return (
    <div className="flex h-full w-full items-center justify-center space-y-10">
      <div className="container my-5">
        <PodcastDetails podcastId={id as string} />
        <div>
          <p className="mt-5 mb-2 text-3xl font-medium text-blue-500">
            Episodes
          </p>
          <PodcastEpisodes podcastId={id as string} />
        </div>
      </div>
    </div>
  );
};

export default Podcast;
