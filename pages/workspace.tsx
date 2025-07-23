import { useState } from "react";
import { useForm } from "react-hook-form";

// Mock data
const doctors = [
  { id: 1, name: "Dr. Alice Smith" },
  { id: 2, name: "Dr. Bob Johnson" },
];

const times = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM"
];

type AppointmentForm = {
  doctorId: string;
  time: string;
};

export default function Appointment() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { handleSubmit } = useForm<AppointmentForm>();

  const handleDoctorSelect = (id: number) => {
    setSelectedDoctor(id);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleBook = () => {
    alert(
      `Appointment booked with ${
        doctors.find((d) => d.id === selectedDoctor)?.name
      } at ${selectedTime}`
    );
    setStep(1);
    setSelectedDoctor(null);
    setSelectedTime(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Book Appointment</h2>
        {step === 1 && (
          <div>
            <h3 className="mb-4 font-semibold">Select Doctor</h3>
            <ul>
              {doctors.map((doctor) => (
                <li key={doctor.id} className="mb-2">
                  <button
                    className="w-full border px-4 py-2 rounded hover:bg-blue-100"
                    onClick={() => handleDoctorSelect(doctor.id)}
                  >
                    {doctor.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="mb-4 font-semibold">Pick Time</h3>
            <ul>
              {times.map((time) => (
                <li key={time} className="mb-2">
                  <button
                    className="w-full border px-4 py-2 rounded hover:bg-blue-100"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {step === 3 && (
          <div className="text-center">
            <p className="mb-4">
              <span className="font-semibold">Doctor:</span>{" "}
              {doctors.find((d) => d.id === selectedDoctor)?.name}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Time:</span> {selectedTime}
            </p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleBook}
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}