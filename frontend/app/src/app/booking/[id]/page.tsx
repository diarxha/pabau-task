import Link from 'next/link';

async function getBookings(bookingId:string) {
  const res = await fetch(`http://host.docker.internal:5000/api/bookings/${bookingId}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const data = await res.json();
  console.log('Fetched bookings:', data); 

  return data;
}

const BookingPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const booking = await getBookings(params.id);
  console.log('Params ID:', params.id); 



  if (!booking) {
    return (
      <div>
        <h1>Error</h1>
        <p>Booking not found.</p>
        <Link href="/">Back</Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
    <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Booking Details</h1>
    <p className="text-gray-700 text-lg font-semibold mb-2">{booking.service}</p> 
    <p className="text-md text-gray-700 mb-4">{booking.doctor_name}</p> 
    <hr className="my-4" />
    <div className="flex justify-between text-gray-700">
      <p className="font-semibold">Start: {booking.start_time}</p> 
      <p className="font-semibold">End: {booking.end_time}</p> 
    </div>
    <p className="text-gray-700 mt-4">Date: {new Date(booking.date).toLocaleDateString()}</p> 
    <div className="mt-6 text-center">
      <Link href="/">
        <p className="cursor-pointer inline-block bg-transparent text-blue-500 border border-blue-500 rounded-lg py-2 px-4 hover:bg-blue-500 hover:text-white transition duration-300">
          ← Back
        </p>
      </Link>
    </div>
  </div>
</div>
  );
};

export default BookingPage;