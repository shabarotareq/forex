const Widget = ({ title, value }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col">
      <span className="text-gray-500 dark:text-gray-300">{title}</span>
      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </span>
    </div>
  );
};

export default Widget;
