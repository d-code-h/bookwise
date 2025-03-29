import Image from 'next/image';

interface TotalReport {
  title: string;
  total: number;
  status: string;
  value: number;
}

interface Props {
  totalReports: TotalReport[];
}

const TotalReports = ({ totalReports }: Props) => {
  return (
    <div className="flex gap-4 flex-wrap mb-6">
      {totalReports.map(({ title, total, status, value }, index) => (
        <section
          className="space-y-2.5 p-5 bg-white rounded-xl min-w-80 flex-1"
          key={index}
        >
          <h6 className="font-medium text-base text-[#64748B] tracking-tight flex gap-2.5 items-center">
            <span>{title}</span>
            <span className="flex gap-0.5 items-center">
              <Image
                src={
                  status === 'up'
                    ? '/icons/admin/caret-up.svg'
                    : '/icons/admin/caret-down.svg'
                }
                alt="decrease"
                width={18}
                height={18}
              />
              <span
                className={`${status === 'up' ? 'text-green-500' : 'text-red-500'}`}
              >
                {value}
              </span>
            </span>
          </h6>
          <h3 className="font-semibold text-3xl text-dark-400 tracking-tighter">
            {total}
          </h3>
        </section>
      ))}
    </div>
  );
};

export default TotalReports;
