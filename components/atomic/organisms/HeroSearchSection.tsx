import { SaveSearch, Searchbar } from "../molecules";

const HeroSearchSection = () => {
  return (
    <section className="relative rounded-b-[80px] bg-primary  w-full h-[370px]">
      <div className="absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 flex flex-col items-center justify-between gap-2">
        <h3 className="text-white text-[20px] font-medium">
          What are you looking for?
        </h3>
        <div className="flex gap-4 items-center">
          <Searchbar isHeader={false} placeholder="Search here..." />
          <SaveSearch />
        </div>
      </div>
    </section>
  );
};

export default HeroSearchSection;
