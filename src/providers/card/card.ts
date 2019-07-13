import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


/*
  Generated class for the CardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello CardProvider Provider');
  }

  getMTGJson() {
    this.http.get('https://mtgjson.com/json/AllCards.json').subscribe(data => {
      //let map = new Map(data);
      this.storage.set('allCards', data).then(result => {
      });
    });
  }

  public cardSearch(parameters) {
    let results = [];
    this.storage.get('allCards').then(cards => {
      for(let card in cards){
        let aux = cards[card];
        
        if(aux.type.includes(parameters.type)){
          results.push(aux);
        }
      }
    });
    console.log(results);
    return results;
  }

  private checkCardName(card, name) {
    return card.name == name;
  }
}
