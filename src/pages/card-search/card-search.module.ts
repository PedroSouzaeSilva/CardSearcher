import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardSearchPage } from './card-search'; 

@NgModule({
  declarations: [
    CardSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CardSearchPage),
  ],
})
export class CardSearchPageModule {}
