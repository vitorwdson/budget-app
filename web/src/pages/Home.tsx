import { FC } from 'react';
import Budget from '../components/Budget';
import NewBudgetButton from '../components/NewBudgetButton';
import { useBudgetsQuery } from '../generated/graphql';

const Home: FC = () => {
  const [{ fetching, data }] = useBudgetsQuery();

  return (
    <>
      {fetching && <h1>Loading...</h1>}

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
