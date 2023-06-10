import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function NotFound() {
  const error = useRouteError();

  const getErrorText = () => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return (
          <div className="pt-10">
            <h1> 404 Not Found</h1>
            <p> Something is wrong on our end </p>
          </div>
        );
      }
    }
    return (
      <div>
        <p> Something is wrong on our end </p>
      </div>
    );
  };

  return <>{getErrorText()}</>;
}

export default NotFound;
