import PullToRefresh from 'react-simple-pull-to-refresh';
import Loader from 'react-loader-spinner';
import { useState } from 'react';

const PullToRefreshForPage = (props) => {
  const [refresherCounter, setRefreshCounter] = useState(1000000);

  const refreshFunction = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(refresherCounter + 1);
      }, 1000);
    });
  };

  return (
    <PullToRefresh
      onRefresh={() =>
        refreshFunction().then((value) => {
          setRefreshCounter(value);
        })
      }
      refreshingContent={
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={30}
          width={30}
          style={{ marginTop: '10px' }}
        />
      }
    >
      <div key={refresherCounter}>{props.children}</div>
    </PullToRefresh>
  );
};

export default PullToRefreshForPage;
