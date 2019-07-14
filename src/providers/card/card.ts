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
    if(! this.storage.get('allCards')) {
      this.http.get('https://mtgjson.com/json/AllCards.json').subscribe(data => {
        this.storage.set('allCards', data).then(result => {
        });
      });
    }
    else {
      console.log("JSON já armazenado");
    }
  }

  public cardSearch(parameters) {
    let results = [];
    console.log(parameters);
    this.storage.get('allCards').then(cards => {
      for(let card in cards){
        let aux = cards[card];
        
        if(
          this.checkCardName(aux, parameters.name) &&
          this.checkCardType(aux, parameters.type) &&
          this.checkCardText(aux, parameters.text) &&
          this.checkCardColors(aux, parameters.colors)
        ){
          results.push(aux);
        }
      }
    });
    console.log(results);
    return results;
  }

  private checkCardName(card, name) {
    if(name == undefined) name = '';
    return card.name.match(new RegExp(name, "i"));
  }

  private checkCardText(card, text) {
    if(text == undefined) text = [];
    else text = text.split(' ');
    for(let sentence of text){
      if(!card.text || !card.text.match(new RegExp(sentence, "i"))){
        return false;
      }
    }
    return true;
  }

  private checkCardType(card, type) {
    if(type == undefined) type = '';
    return card.type.match(new RegExp(type, "i"));
  }

  private checkCardColors(card, colors) {
    for(let color of colors){
      if(!card.colorIdentity) console.log(card.colorIdentity);
      if(!card.colorIdentity.includes(color)) return false;
    }
    return true;
  }
}
