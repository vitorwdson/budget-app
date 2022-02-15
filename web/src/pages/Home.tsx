import { FC } from 'react';
import Budget from '../components/Budget';

const Home: FC = () => {
  return (
    <>
      <Budget name="Education" maxValue={1500.53} currentValue={100} />
      <Budget name="Education" maxValue={1500.53} currentValue={700} />
      <Budget name="Education" maxValue={1500.53} currentValue={1200} />
      <Budget name="Education" maxValue={1500.53} currentValue={1700} />
      <Budget name="Education" maxValue={1500.53} currentValue={500} />
      <Budget name="Education" maxValue={1500.53} currentValue={0} />
    </>
  );
};

export default Home;
