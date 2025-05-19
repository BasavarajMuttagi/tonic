import PodcastCarousel from "@/components/PodcastCarousel";

const Home = () => {
  return (
    <div className="space-y-3.5">
      <PodcastCarousel category="74" />
      <PodcastCarousel category="2" />
      <PodcastCarousel category="4" />
      <PodcastCarousel category="6" />
      <PodcastCarousel category="12" />
      <PodcastCarousel category="77" />
      <PodcastCarousel category="91" />
    </div>
  );
};

export default Home;
