import React from 'react';

interface RequestStateWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
};

const RequestStateWrapper: React.FC<RequestStateWrapperProps> = ({
  children,
  isLoading,
  isError
}) : React.ReactElement => {
  if (isLoading) {
    return <p className="center-text">loading...</p>
  } else if (isError) {
    return <p className="center-text">Unfortunately something went wrong. Please retry again later</p>
  }

  return <>{children}</>
};

export { RequestStateWrapper };
