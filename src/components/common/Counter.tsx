interface CounterProps {
  current: number;
  total: number;
}

const Counter = ({ current, total }: CounterProps) => {
  return (
    <p className="text-gray8">
      {current} / {total}
    </p>
  );
};

export default Counter;
