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
  colors = ["white", "blue", "black", "red", "green", "colorless"];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cardProvider: CardProvider) {
  }

  ionViewDidLoad() {
    this.cardProvider.getMTGJson();
  }
}
