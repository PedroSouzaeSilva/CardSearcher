import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers';
import { CardProvider } from '../../providers/card/card';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  @ViewChild('profilePic') profilePic: ElementRef;
  item: any;
  scryFallCard: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, items: Items, public cardProvider: CardProvider) {
    this.item = navParams.get('item') || items.defaultItem;
  }

  ionViewDidLoad() {
    this.getCardImage();
  }

  public async getCardImage() {
    await this.cardProvider.getScryfallCard(this.item)
    .then((promise)=>{
      promise.subscribe(data => {
        try{
          this.scryFallCard = data;
          if (this.scryFallCard.object != undefined && this.scryFallCard.object == 'card') this.item.profilePic = this.scryFallCard.image_uris.normal;
        }
        catch(err){
          console.log(err);
        }
      });

    })
  }


}
