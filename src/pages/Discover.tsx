import { Link } from "react-router-dom";
const categories = [
  {
    id: 2,
    name: "Business & Finance",
    image: "https://i.iheart.com/v3/re/new_assets/67cb22f2b741e4fc29c44519",
  },
  {
    id: 4,
    name: "Comedy",
    image: "https://i.iheart.com/v3/re/new_assets/67cb21f0d17a1819309bdb9a",
  },
  {
    id: 6,
    name: "Games & Hobbies",
    image: "https://i.iheart.com/v3/re/new_assets/67cb256189b93256580cb3ac",
  },
  {
    id: 8,
    name: "Health",
    image: "https://i.iheart.com/v3/re/new_assets/67cb23117281c1babdef3736",
  },
  {
    id: 10,
    name: "News",
    image: "https://i.iheart.com/v3/re/new_assets/67cb2300ab6f47b807ce121e",
  },
  {
    id: 12,
    name: "Science & Technology",
    image: "https://i.iheart.com/v3/re/new_assets/67cb247ab43ca11cfd8d1d60",
  },
  {
    id: 13,
    name: "Society & Culture",
    image: "https://i.iheart.com/v3/re/new_assets/67cb2217bb8c88ce31b10c40",
  },
  {
    id: 14,
    name: "Sports",
    image: "https://i.iheart.com/v3/re/new_assets/67cb22e37e55cb3d148f4f08",
  },
  {
    id: 74,
    name: "Entertainment",
    image: "https://i.iheart.com/v3/re/new_assets/67cb23a6559b32f50f54ce04",
  },
  {
    id: 75,
    name: "Spirituality",
    image: "https://i.iheart.com/v3/re/new_assets/67cb23989ef922734c680117",
  },

  {
    id: 77,
    name: "Food",
    image: "https://i.iheart.com/v3/re/new_assets/67cb254ddc3491867a50964b",
  },
  {
    id: 79,
    name: "Relationships",
    image: "https://i.iheart.com/v3/re/new_assets/67cb25b0a36fb6102742fb3b",
  },
  {
    id: 80,
    name: "Politics",
    image: "https://i.iheart.com/v3/re/new_assets/67cb231f100c38db3c30d057",
  },

  {
    id: 87,
    name: "True Crime",
    image: "https://i.iheart.com/v3/re/new_assets/67cb220215136eb3ddb693e3",
  },
  {
    id: 91,
    name: "Music",
    image: "https://i.iheart.com/v3/re/new_assets/67cb23d72c55b1f4277636b5",
  },
  {
    id: 95,
    name: "Latinx",
    image: "https://i.iheart.com/v3/re/new_assets/67cb28bd5f88ccb83d4b14d3",
  },
  {
    id: 96,
    name: "Fiction",
    image: "https://i.iheart.com/v3/re/new_assets/67cb2487174672494186520f",
  },
  {
    id: 97,
    name: "Spooky",
    image: "https://i.iheart.com/v3/re/new_assets/67cb25d0cefa0a68e104cb1a",
  },
  {
    id: 98,
    name: "Kids & Family",
    image: "https://i.iheart.com/v3/re/new_assets/67cb251e0a961a747275f9ee",
  },
  {
    id: 101,
    name: "Black Culture",
    image: "https://i.iheart.com/v3/re/new_assets/67cb26915933b83890cc2c2d",
  },
  {
    id: 103,
    name: "LGBTQ",
    image: "https://i.iheart.com/v3/re/new_assets/67cb246db3a4d29b596067ff",
  },
  {
    id: 132,
    name: "Top Overall",
    image: "https://i.iheart.com/v3/re/new_assets/67cb223a4ed8707b30f10535",
  },
  {
    id: 151,
    name: "History",
    image: "https://i.iheart.com/v3/re/new_assets/67cb24513a74a5071ff56a70",
  },
  {
    id: 194,
    name: "Climate",
    image: "https://i.iheart.com/v3/re/new_assets/67cb25f3f1ba3907b9c4da19",
  },
  {
    id: 207,
    name: "Rewatch TV Podcasts",
    image: "https://i.iheart.com/v3/re/new_assets/67cb23cbfec4b3616bef0a0b",
  },
  {
    id: 233,
    name: "Mindfulness",
    image: "https://i.iheart.com/v3/re/new_assets/67cb252d1a4b1c5adf6bbe3d",
  },
  {
    id: 234,
    name: "Talkback",
    image: "https://i.iheart.com/v3/re/new_assets/67cb25dabbcaf62aa959954b",
  },
  {
    id: 254,
    name: "Travel",
    image: "https://i.iheart.com/v3/re/new_assets/67cb25e6ce664bf17d7d7f6c",
  },
  {
    id: 256,
    name: "Influencers & Hosts",
    image: "https://i.iheart.com/v3/re/new_assets/67cb253e1c574b3ed15e952d",
  },
  {
    id: 264,
    name: "Top True Crime",
    image: "https://i.iheart.com/v3/re/new_assets/67cb2225d6ed06c374337fcf",
  },
  {
    id: 272,
    name: "Radio On-Demand",
    image: "https://i.iheart.com/v3/re/new_assets/68110953700f290aef5e55f5",
  },
];

const Discover = () => {
  return (
    <div className="mx-20 p-4">
      <p className="mb-10 text-3xl font-medium text-blue-500">Discover</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <Link to={`category/${category.id}`}>
            <img
              key={category.id}
              src={category.image}
              alt={category.name}
              className="mb-4 aspect-square w-full cursor-pointer rounded object-contain"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
