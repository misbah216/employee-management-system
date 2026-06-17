import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#3D2B1F] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xl md:text-2xl text-[#6E5A45] font-semibold">Managing people, the smarter way</p>
      <button
        onClick={() => navigate('/login')}
        className="mt-8 rounded-full bg-[#3D2B1F] px-8 py-3 text-[#F8F2EA] text-base font-semibold shadow-[0_12px_30px_rgba(61,43,31,0.16)] hover:bg-[#4B3527] transition"
      >
        Get Started →
      </button>
    </div>
  );
}
