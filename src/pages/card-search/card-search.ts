import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardProvider } from '../../providers/card/card';
/**
 * Generated class for the CardSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-search',
  templateUrl: 'card-search.html',
})
export class CardSearchPage {
  parameters = {
    colors: {},
  };
  colors = [
            {name: "white", letter: "W", value: false},
            {name: "blue", letter: "U", value: false},
            {name: "black", letter: "B", value: false},
            {name: "red", letter: "R", value: false},
            {name: "green", letter: "G", value: false},
          ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cardProvider: CardProvider) {
  }

  cardSearch(parameters){
    let colorParameter = [];
    for(let color of this.colors) {
      if(color.value) colorParameter.push(color.letter);
    }
    parameters.colors = colorParameter;
    this.cardProvider.cardSearch(parameters);
  }

  ionViewDidLoad() {
    this.cardProvider.getMTGJson();
  }
}
