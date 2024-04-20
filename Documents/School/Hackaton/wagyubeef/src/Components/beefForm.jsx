import React, { useState } from 'react';
import { prepareContractCall, sendTransaction, resolveMethod } from "thirdweb";

export default function BeefForm({ contract, account }) {
  const [formData, setFormData] = useState({
    _owner: '',
    id: '',
    _cowId: '',
    _gradeLetter: '',
    _gradeNumber: '',
    _farmName: '',
    _farmLocation: '',
    _destination: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formVisible, setFormVisible] = useState(false); // State to manage form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    try {
      const { _owner, id, _cowId, _gradeLetter, _gradeNumber, _farmName, _farmLocation, _destination } = formData;
      const transaction = prepareContractCall({ 
        contract, 
        method: resolveMethod("createBeef"), 
        params: [_owner, id, _cowId, _gradeLetter, _gradeNumber, _farmName, _farmLocation, _destination] 
      });
      console.log("ac", account)
      const { transactionHash } = await sendTransaction({ 
        transaction, 
        account 
      });
      
      setFormData({
        _owner: '',
        id: '',
        _cowId: '',
        _gradeLetter: '',
        _gradeNumber: '',
        _farmName: '',
        _farmLocation: '',
        _destination: ''
      });
      // Hide the form after submission
      setFormVisible(false);
    } catch (error) {
      console.error("Error submitting transaction:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const handleClose = () => {
    setFormVisible(false);
  };

  return (
    <div>
      {/* Button to toggle form visibility */}
      <button onClick={toggleFormVisibility} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {formVisible ? "Hide Form" : "Show Form"}
      </button>
      {/* Background overlay */}
      {formVisible && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" onClick={toggleFormVisibility}></div>}
      {/* Form */}
      {formVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg">
          <button onClick={handleClose} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {isError && <div>Error submitting transaction</div>}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="_owner" className="block text-gray-700 font-bold mb-2">Owner:</label>
                <input type="text" id="_owner" name="_owner" value={formData._owner} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="id" className="block text-gray-700 font-bold mb-2">ID:</label>
                <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="_cowId" className="block text-gray-700 font-bold mb-2">Cow ID:</label>
                <input type="text" id="_cowId" name="_cowId" value={formData._cowId} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="_gradeLetter" className="block text-gray-700 font-bold mb-2">Grade Letter:</label>
                <input type="text" id="_gradeLetter" name="_gradeLetter" value={formData._gradeLetter} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="_gradeNumber" className="block text-gray-700 font-bold mb-2">Grade Number:</label>
                <input type="text" id="_gradeNumber" name="_gradeNumber" value={formData._gradeNumber} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="_farmName" className="block text-gray-700 font-bold mb-2">Farm Name:</label>
                <input type="text" id="_farmName" name="_farmName" value={formData._farmName} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="_farmLocation" className="block text-gray-700 font-bold mb-2">Farm Location:</label>
                <input type="text" id="_farmLocation" name="_farmLocation" value={formData._farmLocation} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="_destination" className="block text-gray-700 font-bold mb-2">Destination:</label>
                <input type="text" id="_destination" name="_destination" value={formData._destination} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}