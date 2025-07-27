import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaptopIcon from '@mui/icons-material/Laptop';
import PersonIcon from '@mui/icons-material/Person';
import Radio from '@mui/material/Radio';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const UseCase = () => {
  const [selected, setSelected] = useState('bot');
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if(selected ==='human'){
      timer = setTimeout(()=>{
        navigate('/questionare');
      },2000)
    }
    return () => clearTimeout(timer);
  },[selected,navigate]);

  const UseCaseCard = ({ type, icon, title, description, bgColor, color }) => (
    <div
      onClick={() => setSelected(type)}
      className={`flex flex-col border rounded-xl p-4 gap-4 cursor-pointer w-1/2 
        ${selected === type ? 'border-blue-600 shadow-md' : 'border-gray-300'}`}
    >
      <div className='flex gap-2 items-center'>
        <div className={`rounded-full p-2 ${bgColor}`}>
          {icon}
        </div>
        <div className='font-semibold text-xl'>{title}</div>
      </div>
      <p className='text-gray-600'>{description}</p>
      <div className='flex justify-end'>
        <Radio
          checked={selected === type}
          onChange={() => setSelected(type)}
          value={type}
          color="primary"
        />
      </div>
    </div>
  );

  return (
    <div className='flex flex-col gap-6 px-4 py-6'>
      <div className='flex items-center gap-2'>
        <IconButton><ArrowBackIcon /></IconButton>
        <div className='font-semibold text-2xl'>Create a new use case</div>
      </div>

      <div className='p-6 shadow-xl transform hover:-translate-y-1 rounded-xl flex flex-col gap-6'>
        <div className='font-semibold text-lg'>Select use case type</div>

        <div className='flex gap-4'>
          <UseCaseCard
            type="bot"
            icon={<LaptopIcon sx={{ color: 'blue' }} />}
            title="AI Bot"
            description="Create an automated AI system that operates without human intervention."
            bgColor="bg-blue-100"
          />
          <UseCaseCard
            type="human"
            icon={<PersonIcon sx={{ color: 'purple' }} />}
            title="Human Operated"
            description="Create an AI system that requires human oversight and intervention."
            bgColor="bg-purple-100"
          />
        </div>
      </div>
    </div>
  );
};

export default UseCase;
