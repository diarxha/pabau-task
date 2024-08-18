import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/getBookings', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(' ')[0].split(':').map(Number);
  const period = timeString.split(' ')[1];
  
  let hour = hours;
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  const date = new Date();
  date.setHours(hour, minutes);

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div className='p-6 bg-white min-h-screen flex flex-col items-center justify-between gap-32'>
      
      <h2 className="text-3xl font-semibold text-[#0c55cc] mb-6 mt-[10vh]">Booking List</h2>
      <div className="flex flex-wrap gap-12 justify-around ">
        {bookings.map((booking:any) => (
          <div key={booking.id} className="bg-white flex flex-col items-center justify-between w-64 p-6 shadow-lg rounded-lg ease-out hover:shadow-xl hover:shadow-blue-400/40 cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500 duration-150">
            <p className="text-lg text-black">{formatTime(booking.start_time)}</p>
            <p className="text-lg text-black">{formatDate(booking.date)}</p>
            <Link href={`/booking/${booking.id}`}>
              <p className="text-lg mt-4 w-full text-center text-black transition-colors duration-300 hover:text-[#0c55cc]">
                Details
              </p>
            </Link>
          </div>
        ))}
      </div>
      <Link href={"/booking/newPage"}>
        <p className='w-full p-4 border-2 border-[#0c55cc] text-[#0c55cc] bg-white rounded-lg text-center transition-all duration-500 cursor-pointer hover:bg-[#0c55cc] hover:text-white'>
          Add Booking
        </p>
      </Link>
    </div>
  );
};

export default Home;