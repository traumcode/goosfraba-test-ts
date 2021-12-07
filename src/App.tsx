import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import './App.css';
import Main from './pages/Main';

const errorLink = onError(({
                              graphQLErrors,
                              networkError
                           }) => {
   if (graphQLErrors) {
      graphQLErrors.map(({
                            message,
                            path
                         }) => {
         return alert(`GraphQL error ${message}`);
      });
   }
});

const link = from([ errorLink, new HttpLink({ uri: "https://fakerql.goosfraba.ro/graphql" }) ]);

const client = new ApolloClient({
   cache: new InMemoryCache(),
   link: link,
});


function App() {
   return (
      <ApolloProvider client={client}>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Main client={client}/>}/>
            </Routes>
         </BrowserRouter>
      </ApolloProvider>
   );
}

export default App;
