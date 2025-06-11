"use client";

import { IQueryClientAndReduxWrapper } from "@/interfaces";
import { queryClient } from "@/lib/queryClient";
import { store, persistor } from "@/store";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const QueryClientAndReduxWrapper: React.FC<IQueryClientAndReduxWrapper> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default QueryClientAndReduxWrapper;
