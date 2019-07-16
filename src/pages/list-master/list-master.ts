import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  toogleSearch = false;
  currentItems: Item[] = [];
  loader: any;

  constructor(public navCtrl: NavController,
              public items: Items,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public loadingController: LoadingController) {

    this.items.items = this.navParams.get('cards');
    this.currentItems = this.items.items;
    this.loader = this.navParams.get('loader');
  }
  
  /**
   * The view loaded, let's query our items for the list
   */
  
  ionViewDidEnter() {
    if(this.loader){
      console.log(this.loader);
      console.log(this.currentItems);
    }
  }

  ionViewDidLoad(){
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      content: 'Loading cards',
      duration: 2000
    });
    await loading.present();

    loading.onDidDismiss(()=>{
      console.log('Loading dismissed!');
    });

  }
  
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = this.items.items;
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
