"use client"; 
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";


interface BookingFormData {
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

export default function NewBooking() {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    service: "",
    doctor_name: "",
    start_time: "",
    end_time: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://host.docker.internal:5000/api/addBookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      
      if (response.ok) {
        alert("Booking inserted successfully!");
        router.push("/"); // Redirect to the main page after successful insertion
      } else {
        alert("Failed to insert booking.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
  <h1 className="text-3xl text-blue-500 font-bold text-center mb-6">New Booking</h1>
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Service</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="bg-gray-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
        <input
          type="text"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleChange}
          required
          className="bg-gray-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
        />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          required
          className="font-medium text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Time</label>
        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          required
          className="font-medium text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="font-medium text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
    </div>
    <div className="flex justify-center mt-6">
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600"
      >
        Submit Booking
      </button>
    </div>
  </form>
</div>

  );
}