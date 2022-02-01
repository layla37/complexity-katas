const ITEMS = {
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
  AgedBrie: 'Aged Brie',
  ConcertTicket: 'Backstage passes to a TAFKAL80ETC concert',
  Conjured: 'Conjured'
};


class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let itemName = this.items[i].name;
      let itemQuality = this.items[i].quality;
      let itemSellIn = this.items[i].sellIn;
      
      switch (itemName) {
        case ITEMS.Sulfuras:
          break;
        
        case ITEMS.AgedBrie:
          if(itemSellIn > 0) {
            itemQuality = itemQuality + 1;
          }
          else {
            itemQuality = itemQuality + 2;
          }
          itemSellIn = itemSellIn-1;
          break;
        
        case ITEMS.ConcertTicket:
          if(itemSellIn > 10) {
            itemQuality = itemQuality + 1;
          } 
          else if (itemSellIn <= 10 && itemSellIn > 5) {
            itemQuality = itemQuality + 2;
          }
          else if (itemSellIn <= 5 && itemSellIn > 0) {
            itemQuality = itemQuality + 3;
          }
          else {
            itemQuality = 0;
          }
          itemSellIn = itemSellIn - 1;
          break;

        case ITEMS.Conjured:
          if(itemSellIn <= 0) {
            itemQuality = itemQuality - 4;
          }
          else {
            itemQuality = itemQuality - 2;
          }
          itemSellIn = itemSellIn - 1;
          break;

        default:
          if(itemSellIn <= 0) {
            itemQuality = itemQuality - 2;
          }
          else {
            itemQuality = itemQuality - 1;
          }
          itemSellIn = itemSellIn - 1;
          break;
      }

      if(itemName !== ITEMS.Sulfuras && itemQuality > 50) {
          itemQuality = 50;
      }
      if(itemQuality < 0) {
          itemQuality = 0;
      }

      this.items[i].quality = itemQuality
      this.items[i].sellIn = itemSellIn
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}