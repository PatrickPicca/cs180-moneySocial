import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './app/Routes/StackNavigator';
import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';

import React, {useEffect} from 'react';
import { Amplify, Auth, API, graphqlOperation, Storage} from 'aws-amplify';
import {getUser} from './src/aws-exports';
import {createUser} from './src/aws-exports';
import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';
  
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
function App() {

  useEffect(() => {
    const syncUser = async () => {
      // get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      // query the database using Auth user id (sub)
      const userData = await API.graphql(
        graphqlOperation(queries.getUser, { id: authUser.attributes.sub })
      );

      if (userData.data.getUser) {
        console.log("User already exists in DB");
        console.log(userData)
        return;
      }
      // if there is no users in db, create one
      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.name,
        imageUri: '',
        bio: "Hey, I am using MoneySocial"
      };

      await API.graphql(
        graphqlOperation(mutations.createUser, { input: newUser })
      );
    };

    syncUser();
  }, []);

  return (
  <StackNavigator />
  );
};

const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

export default withAuthenticator(App, {signUpConfig}); 
