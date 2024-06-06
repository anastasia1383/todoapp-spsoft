interface SwitcherProps {
  isChecked: boolean;
  handleCheckboxChange: () => void;
}

export const Switcher: React.FC<SwitcherProps> = ({
  isChecked,
  handleCheckboxChange,
}) => {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <div
          className="block h-8 w-14 rounded-full bg-[#E5E7EB] relative transition-transform"
          style={{
            transform: isChecked ? 'translate-x-full' : 'translate-x-0',
          }}
        ></div>
        <div
          className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
            isChecked ? 'translate-x-full bg-indigo-400' : 'bg-white-400'
          }`}
        ></div>
      </div>
      <span className="ml-2 text-sm font-medium">
        {isChecked ? 'Toggle to view' : 'Toggle to edit'}
      </span>
    </label>
  );
};
