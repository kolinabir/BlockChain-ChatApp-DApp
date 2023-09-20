import { ethers } from "ethers";

export const Marry = ({ state }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameOfHusband = e.target.nameOfHusband.value;
    const nameOfWife = e.target.nameOfWife.value;
    const idOfHusband = e.target.idOfHusband.value;
    const idOfWife = e.target.idOfWife.value;
    console.log(nameOfHusband, nameOfWife, idOfHusband, idOfWife);
    const { contract } = state;
    console.log(contract);
    const amount = { value: ethers.utils.parseEther("0.01") };
    const transaction = await contract?.getMarried(
      nameOfHusband,
      nameOfWife,
      idOfHusband,
      idOfWife,
      amount
    );
    await transaction.wait();
    alert("Transaction mined");
    console.log("Transaction mined");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center flex-col px-20 gap-5 my-10"
      >
        <input
          required
          placeholder="Enter name of Husband"
          className="border rounded border-blue-600 p-3"
          type="text"
          name="nameOfHusband"
        />
        <input
          required
          placeholder="Enter name of Wife"
          className="border rounded border-blue-600 p-3"
          type="text"
          name="nameOfWife"
        />
        <input
          required
          placeholder="Enter NID number of Husband"
          className="border rounded border-blue-600 p-3"
          type="text"
          name="idOfHusband"
        />
        <input
          required
          placeholder="Enter NID number of Wife"
          className="border rounded border-blue-600 p-3"
          type="text"
          name="idOfWife"
        />
        {/* <input
          placeholder="Amount"
          className="border rounded border-blue-600 p-3"
          type="number"
          name="amount"
        /> */}

        <button
          type="submit"
          className="p-3 bg-blue-700 w-fit self-center rounded-lg px-6 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};
