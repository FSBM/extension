


const ColorChangingSpinner = () => {
  const blades = Array.from({ length: 12 }, (_, i) => i * 30);
  
  return (
    <div className="flex justify-center items-center h-[12px] bg-transparent">
      <div className="w-9 h-9 relative mt-[3px]">
        {blades.map((angle, index) => (
          <div
            key={angle}
            className="absolute w-[2px] h-[9px] rounded-sm origin-[50%_150%] opacity-25"
            style={{
              left: 'calc(50% - 1.25px)',
              top: '25%',
              transform: `rotate(${angle}deg)`,
              animation: 'spinner-blade 1.2s linear infinite',
              animationDelay: `${-0.1 * index}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes spinner-blade {
          0% {
            opacity: 0.25;
            transform: rotate(inherit) scaleY(1);
            background-color: black;
          }
          50% {
            opacity: 1;
            transform: rotate(inherit) scaleY(1.5);
            background-color: black;
          }
          65% {
            opacity: 0.25;
            transform: rotate(inherit) scaleY(0.75);
            background-color: black;
          }
          85% {
            opacity: 0.25;
            transform: rotate(inherit) scaleY(1);
            background-color: black;
          }
          100% {
            opacity: 0.25;
            transform: rotate(inherit) scaleY(1);
            background-color: black;
          }
        }
      `}</style>
    </div>
  );
};

export default ColorChangingSpinner;