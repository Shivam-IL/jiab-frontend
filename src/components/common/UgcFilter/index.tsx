import UgcFilterModal from "@/components/UgcFilterModal";
import React, { useEffect, useState } from "react";
import SvgIcons from "../SvgIcons";
import { ICONS_NAMES } from "@/constants";
import AktivGroteskText from "../AktivGroteskText";
import { updateUgcFilters } from "@/store/ugc";
import useAppDispatch from "@/hooks/useDispatch";
import { useCMSData } from "@/data";
const UgcFilter = ({ filter, text }: { filter: string; text: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);
  const [openUgcFilterModal, setOpenUgcFilterModal] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState({
    language: "",
    category: "",
  });
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const handleApplyFilters = (filters: {
    language: string;
    category: string;
  }) => {
    setSelectedFilters(filters);
    setOpenUgcFilterModal(false);
    dispatch(updateUgcFilters({ filters }));
  };

  console.log(text, "text");
  console.log(selectedFilters, "filter");
  useEffect(() => {
    return () => {
      setSelectedFilters({
        language: "",
        category: "",
      });
      dispatch(
        updateUgcFilters({
          filters: {
            language: "",
            category: "",
          },
        })
      );
    };
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateUgcFilters({ filters: { search } }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, dispatch]);

  return (
    <>
      <div className="flex items-center justify-between md:justify-end md:gap-[12px]">
        <div className="w-[239px] md:w-[418px] rounded-[108px] bg-white px-[10px] md:px-[16px] py-[9px] md:py-[13.5] flex items-center gap-[4px] border-[1px] border-[#383838]">
          <SvgIcons
            name={ICONS_NAMES.GLASS}
            className="w-[17px] h-[17px] md:w-[23px] md:h-[23px]"
          />
          <input
            type="text"
            placeholder={cmsData.jokeBox.searchByName}
            className={`w-full outline-none border-none bg-transparent font-[400] text-[10px] md:text-[16px] text-[#383838]`}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          onClick={() => setOpenUgcFilterModal(true)}
          className="flex items-center gap-[4px] cursor-pointer"
        >
          <AktivGroteskText
            text={filter}
            fontSize="text-[14px] md:text-[16px]"
            fontWeight="font-[400] cursor-pointer"
          />
          <button className="border-none outline-none">
            <SvgIcons name={ICONS_NAMES.FILTER} className="w-[12px] h-[12px]" />
          </button>
        </div>
      </div>
      <UgcFilterModal
        open={openUgcFilterModal}
        onClose={() => setOpenUgcFilterModal(false)}
        onApply={handleApplyFilters}
      />
    </>
  );
};

export default UgcFilter;
