import { useState, useEffect } from "react";

export const ShowMarriges = ({ state }) => {
  const [showMarriges, setShowMarriages] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const marriages = async () => {
      const marriages = await contract?.getCoupleDetails();
      setShowMarriages(marriages);
    };
    contract && marriages();
  }, [contract, state]);
  return (
    <div className="mx-40">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Husband Name
              </th>
              <th scope="col" className="px-6 py-3">
                Wife's Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Husband's NID
              </th>
              <th scope="col" className="px-6 py-3">
                Wife's NID
              </th>
              <th scope="col" className="px-6 py-3">
                TimeStamp
              </th>
            </tr>
          </thead>

          <tbody>
            {showMarriges.map((marriage) => (
              <tr
                key={marriage[5]._nameOfHusband}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {marriage.nameOfHusband}
                </th>
                <td className="px-6 py-4">{marriage.nameOfWife}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {marriage.idOfHusband}
                </td>
                <td className="px-6 py-4">{marriage.idOfWife}</td>
                <td className="px-6 py-4">
                  {new Date(marriage.timestamp * 1000).toLocaleString()}
                </td>
              </tr>
            ))}

            {/* Additional rows...*/}
          </tbody>
        </table>
      </div>
    </div>
  );
};
