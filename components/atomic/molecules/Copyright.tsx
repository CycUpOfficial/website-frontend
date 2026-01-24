import { Text } from "../atoms";

const Copyright = () => {
  return (
    <div className="bg-[#20FFA6] rounded-t-[30px] absolute -translate-x-1/2 left-1/2 bottom-0  w-fit px-16 py-2 text-xs text-white font-bold">
      <Text className="" type="p">
        &copy; {new Date().getFullYear()} CycUp
      </Text>
    </div>
  );
};

export default Copyright;
