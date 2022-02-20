import { FC } from 'react';
import Budget from '../components/Budget';
import Loading from '../components/Loading';
import NewBudgetButton from '../components/NewBudgetButton';
import { useBudgetsQuery } from '../generated/graphql';

const Home: FC = () => {
  const [{ fetching, data }] = useBudgetsQuery();

  return (
    <>
      {fetching && <Loading />}

      {data?.budgets.map((budget) => (
        <Budget
          key={budget.id}
          budgetId={budget.id}
          name={budget.name}
          maxValue={budget.maxValue}
          currentValue={budget.currentValue}
        />
      ))}

      {!fetching && <NewBudgetButton />}
    </>
  );
};

export default Home;
