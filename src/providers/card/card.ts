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

  public async cardSearch(parameters) {
    let results = [];
    console.log(parameters);
    this.storage.get('allCards').then(cards => {
      for(let card in cards){
        let aux = cards[card];
        
        if(
          this.checkCardName(aux, parameters.name) &&
          this.checkCardType(aux, parameters.type) &&
          this.checkCardText(aux, parameters.text) &&
          this.checkCardColors(aux, parameters.colors, parameters.colorDef)
        ){
          results.push(aux);
          if (aux.length >= 100) {
            break;
          }
        }
      }
    });
    return results;
  }

  private regexPrepare(string) { // Prepara os caracteres especiais da string de input para produzir a regex
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  };

  private checkCardName(card, name) {
    if(name == undefined) name = '';
    return card.name.match(new RegExp(this.regexPrepare(name), "i"));
  }

  private checkCardText(card, text) {
    if(text == undefined) text = [];
    else text = text.split(' ');
    for(let sentence of text){
      if(!card.text || !card.text.match(new RegExp(this.regexPrepare(sentence), "i"))){
        return false;
      }
    }
    return true;
  }

  private checkCardType(card, type) {
    if(type == undefined) type = '';
    return card.type.match(new RegExp(this.regexPrepare(type), "i"));
  }

  private checkCardColors(card, selectedColors, colorDef) {
    if(colorDef == "exactColor"){
      if(selectedColors.length != card.colors.length) return false;
      if(!selectedColors.every(color => card.colors.includes(color))) return false;
    }
    else if(colorDef == "mustColor"){
      for(let color of selectedColors){
        if(!card.colors.includes(color)) return false;
      }
    }
    else if(colorDef == "onlyColor"){
      for(let color of card.colors){
        if(!selectedColors.includes(color)) return false;
      }
    }
    else if(colorDef == "colorIdentity"){
      for(let color of selectedColors){
        if(!card.colorIdentity.includes(color)) return false;
      }
    }
    return true;
  }

  public async getScryfallCard(card){
    let parsedCardName = '';
    for(let name of card.name.split(" ")){
      if (parsedCardName) parsedCardName = parsedCardName + '+';
      parsedCardName = parsedCardName + name;
    }
    return this.http.get(`https://api.scryfall.com/cards/named?exact=${parsedCardName}`,);
  }
}
