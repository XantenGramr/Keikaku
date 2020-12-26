import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components
import Home from './app/screens/Home/Home';
import Randomize from './app/screens/Randomize/Randomize';
import Weekly from './app/screens/Weekly/Weekly';
import DeckDetails from './app/screens/DeckDetails/DeckDetails';
import Review from './app/screens/Review/Review';
import CardList from './app/screens/CardList/CardList';
import WeeknessDetails from './app/screens/WeeknessDetails/WeeknessDetails';
import WeeknessCardList from './app/screens/WeeknessCardList/WeeknessCardList';
import WeeknessReview from './app/screens/WeeknessReview/WeeknessReview';
import Sandbox from './app/screens/Sandbox/Sandbox';

import React from 'react';
import { Root } from 'native-base';

const Navigator = createStackNavigator({
    Home: { screen: Home },
    Randomize: { screen: Randomize },
    Weekly: { screen: Weekly },
    DeckDetails: { screen: DeckDetails },
    Review: { screen: Review },
    CardList: {screen: CardList},
    WeeknessCardList: {screen: WeeknessCardList},
    WeeknessDetails: {screen: WeeknessDetails},
    WeeknessReview: {screen: WeeknessReview},
    Sandbox: { screen: Sandbox },
});

const App = createAppContainer(Navigator);

export default () => 
<Root>
  <App />
</Root>;