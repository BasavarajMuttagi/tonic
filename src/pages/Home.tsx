import PodcastCarousel from "@/components/PodcastCarousel";

const Home = () => {
  return (
    <div className="mx-20 space-y-3.5">
      <PodcastCarousel category="2" />
      <PodcastCarousel category="4" />
      <PodcastCarousel category="6" />
    </div>
  );
};

export default Home;
