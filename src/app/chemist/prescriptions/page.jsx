'use client';

import { useState } from 'react';
import { Plus, Trash2, Printer, Download, User, Stethoscope, Calendar } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-hot-toast';



const PrescriptionPage = () => {
  const [patientInfo, setPatientInfo] = useState(null);
const [loadingPatient, setLoadingPatient] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [prescriptionDate, setPrescriptionDate] = useState(new Date().toISOString().split('T')[0]);
  const [medicines, setMedicines] = useState([{ id: Date.now(), name: '', dosage: '', duration: '', instructions: '' }]);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const timeOptions = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
    { value: 'night', label: 'Night' },
  ];

  const handleMedicineChange = (id, field, value) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const addMedicine = () => {
    setMedicines([...medicines, { 
      id: Date.now(), 
      name: '', 
      dosage: '', 
      duration: '', 
      instructions: '',
      beforeAfter: 'after'
    }]);
  };

  const removeMedicine = (id) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter(med => med.id !== id));
    } else {
      toast.error('At least one medicine is required');
    }
  };

  const onSubmit = (data) => {
    const prescriptionData = {
      ...data,
      prescriptionDate,
      medicines,
    };
    console.log('Prescription saved:', prescriptionData);
    toast.success('Prescription saved successfully!');
    // Here you would typically send to API
  };

  const printPrescription = () => {
    toast.success('Opening print dialog...');
    // Implement print functionality
  };

  const downloadPDF = () => {
    toast.success('Downloading PDF...');
    // Implement PDF download
  };

  return (
    <div className="p-5 max-w-4xl mx-auto bg-white rounded-4xl shadow-xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center">
          <Stethoscope className="mr-2" /> Prescription Form
        </h1>
        <div className="flex space-x-3">
          <button 
            onClick={printPrescription}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center hover:bg-gray-200 transition"
          >
            <Printer size={18} className="mr-2" /> Print
          </button>
          <button 
            onClick={downloadPDF}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center hover:bg-gray-200 transition"
          >
            <Download size={18} className="mr-2" /> PDF
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Patient Information */}
        <div className="bg-blue-50 p-4 rounded-xl">
  <h2 className="font-bold text-xl text-blue-800 mb-2">Patient Information</h2>
  
  <div className="grid grid-cols-1 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
      <input
        {...register("patientMobile", {
          required: "Mobile number is required",
          pattern: {
            value: /^[0-9]{10,15}$/,
            message: "Enter a valid phone number",
          },
          onBlur: (e) => fetchPatientInfo(e.target.value),
        })}
        className="w-70 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter mobile number"
      />
    </div>

    {loadingPatient && (
      <p className="text-sm text-blue-500">Fetching patient info...</p>
    )}

    {patientInfo && (
      <div className="bg-white p-4 rounded-md border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-700 mb-2">Fetched Patient Details:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Name:</strong> {patientInfo.name}</li>
          <li><strong>Age:</strong> {patientInfo.age}</li>
          <li><strong>Gender:</strong> {patientInfo.gender}</li>
          <li><strong>Address:</strong> {patientInfo.address}</li>
        </ul>
      </div>
    )}
  </div>
</div>


        {/* Doctor Information */}
        <div className="bg-pink-50 p-4 rounded-xl">
          <h2 className="font-bold text-xl text-pink-800 mb-4 flex items-center">
            <Stethoscope className="mr-2" /> Doctor Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name*</label>
              <input
                {...register("doctor.name", { required: "Doctor name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Dr. Smith"
              />
              {errors.doctor?.name && <p className="mt-1 text-sm text-red-600">{errors.doctor.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization*</label>
              <input
                {...register("doctor.specialization", { required: "Specialization is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Cardiologist"
              />
              {errors.doctor?.specialization && <p className="mt-1 text-sm text-red-600">{errors.doctor.specialization.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
              <input
                {...register("doctor.license")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="MED123456"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic/Hospital*</label>
              <input
                {...register("doctor.clinic", { required: "Clinic name is required" })}
                className=" w-90 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="City General Hospital"
              />
              {errors.doctor?.clinic && <p className="mt-1 text-sm text-red-600">{errors.doctor.clinic.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                type="tel"
                {...register("doctor.contact")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Clinic phone number"
              />
            </div>
          </div>
        </div>

        {/* Prescription Details */}
<div className="bg-purple-50 p-4 rounded-xl">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
        <Calendar className="mr-2" /> Prescription Date
      </label>
      <input
        type="date"
        value={new Date().toISOString().split('T')[0]}
        readOnly
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
      <input
        {...register("diagnosis")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        placeholder="e.g. Hypertension, Diabetes"
      />
    </div>
    
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
      <textarea
        {...register("notes")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        placeholder="Additional instructions for the patient"
        rows={3}
      />
    </div>
  </div>
</div>

        {/* Medicines */}
        <div className="bg-yellow-50 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-xl text-yellow-800">Medications</h2>
            <button
              type="button"
              onClick={addMedicine}
              className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg flex items-center hover:bg-yellow-200 transition"
            >
              <Plus size={18} className="mr-2" /> Add Medicine
            </button>
          </div>
          
          <div className="space-y-4">
            {medicines.map((med) => (
              <div key={med.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-white p-4 rounded-lg shadow-sm">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name*</label>
                  <input
                    value={med.name}
                    onChange={(e) => handleMedicineChange(med.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="e.g. Paracetamol"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage*</label>
                  <input
                    value={med.dosage}
                    onChange={(e) => handleMedicineChange(med.id, 'dosage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="e.g. 500mg"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency*</label>
                  <Controller
                    name={`medicine-${med.id}-frequency`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={timeOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select times"
                      />
                    )}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration*</label>
                  <input
                    value={med.duration}
                    onChange={(e) => handleMedicineChange(med.id, 'duration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="e.g. 7 days"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <input
                    value={med.instructions}
                    onChange={(e) => handleMedicineChange(med.id, 'instructions', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="e.g. After meals"
                  />
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => removeMedicine(med.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Remove medicine"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Tests */}
        <div className="bg-green-50 p-4 rounded-xl">
          <h2 className="font-bold text-xl text-greennpm install react-hook-form react-select react-hot-toast-800 mb-4">Additional Tests</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Tests</label>
            <textarea
              {...register("tests")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="e.g. Complete Blood Count, Lipid Profile"
              rows={2}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-2">
          <button
            type="button"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition font-medium flex items-center"
          >
            Save Prescription
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionPage;