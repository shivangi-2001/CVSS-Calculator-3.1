import { FC, useEffect } from "react";
import { bg, bm, BmType } from "./Data";
import { useAppSelector, useAppDispatch } from "./hook";
import { setSelectButtons, setBaseScore, setvector } from "./Slice";

interface GetButtonClassProps {
  index: number;
}

const App: FC = () => {
  const dispatch = useAppDispatch()
  const {baseScore, severity, selectButtons, vector} = useAppSelector((state) => state.cvss)
  const getButtonClass = ({ index }: GetButtonClassProps): string => {
    switch (index) {
      case 0:
        return "hover:bg-red-100 hover:text-red-600";
      case 1:
        return "hover:bg-orange-100 hover:text-orange-500";
      case 2:
        return "hover:bg-yellow-100 hover:text-yellow-600";
      default:
        return "hover:bg-emerald-100 hover:text-emerald-600";
    }
  };


  const inputChecked = (groupKey: keyof BmType,  buttonKey: string, buttonIndex: number): string => {
    const isSelected = selectButtons[groupKey] === buttonKey;
    if (isSelected) {
      switch (buttonIndex) {
        case 0:
          return "bg-red-100 text-red-600";
        case 1:
          return "bg-orange-100 text-orange-500";
        case 2:
          return "bg-yellow-100 text-yellow-600";
        case 3:
          return "bg-emerald-100 text-emerald-600";
        default:
          return "";
      }
    }
    return "";
  };


  const severityClass = (severity: string | null): string => {
    switch (severity) {
      case "Low":
        return "border-0 text-emerald-800 bg-emerald-200 rounded";
      case "Medium":
        return "border border-yellow-600 text-yellow-800 bg-yellow-200 rounded";
      case "High":
        return "border-0 text-orange-800 bg-orange-200 rounded";
      case "Critical":
        return "border-0 text-red-800 bg-red-200 rounded";
      default:
        return "";
    }
  };

  const handleButtonClick = (groupKey: keyof BmType, buttonKey: string) => {
    dispatch(setSelectButtons({ groupKey, buttonKey }));
  };

  useEffect(() => {
    dispatch(setBaseScore())
    dispatch(setvector())
  }, [selectButtons])

  return (
    <div className="flex flex-col justify-center items-center h-full md:h-screen gap-5">
      <form className="grid grid-col-1 md:grid-cols-4 gap-1.5 cvssjs" id="cvss">
        {Object.entries(bg).map(([groupKey, groupName], bgIndex) => (
          <div key={bgIndex} className="h-fit border rounded-md " role="group">
            <div className="text-sm font-bold text-center bg-slate-700 rounded-t-md px-1.5 text-slate-100">
              {groupName}
            </div>
            {Object.entries(bm[groupKey as keyof BmType]).map(
              ([buttonKey, buttonInfo], buttonIndex) => (
                <div
                  key={buttonIndex}
                  className={`relative group h-10 w-full mx-auto ${getButtonClass(
                    { index: buttonIndex }
                  )} ${inputChecked(groupKey as keyof BmType, buttonKey, buttonIndex)}`}
                  onClick={() => handleButtonClick(groupKey as keyof BmType, buttonKey)}
                  >
                  <input
                    type="radio"
                    name={groupKey}
                    value={buttonKey}
                    id={groupKey + buttonKey}
                    className="absolute m-0 w-0 h-0 cursor-pointer opacity-0"
                  />
                  <label
                    htmlFor={groupKey + buttonKey}
                    className="inline-flex w-full align-text-middle text-center justify-center h-full border-b border-solid rounded-sm transition-all ease-in"
                  >
                    <i
                      className={`h-full align-middle ${groupKey}${buttonKey}`}
                    ></i>
                    {buttonInfo.l}
                  </label>
                </div>
              )
            )}
          </div>
        ))}
      </form>

      <div className="grid grid-col-1 gap-1.5 border rounded-md">
        <div className="text-sm w-full rounded-t-md px-1.5 font-bold text-center bg-slate-700 text-slate-100">
          SEVERITY.SCORE.VECTOR
        </div>
        <div className="inline-flex justify-between gap-3 w-full p-2">
          <span className="py-1">{baseScore}</span>
          <span className={`px-2 py-1 ${severityClass(severity)}`}>
            {severity}
          </span>
          <span className="vectors py-1 hover:text-blue-500">
            <a href={`#${vector}`} className="">
              {vector}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
