const ITEMS = {
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
  AgedBrie: 'Aged Brie',
  ConcertTicket: 'Backstage passes to a TAFKAL80ETC concert'
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

      if (this.items[i].name !== ITEMS.AgedBrie && this.items[i].name !== ITEMS.ConcertTicket && this.items[i].name != ITEMS.Sulfuras) {
        if (this.items[i].quality > 0) {
          // for non specialty items, decrease quality by 1
          this.items[i].quality = this.items[i].quality - 1;     
        }
      } else {
        // specialty items
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name === ITEMS.ConcertTicket) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                // increase quality by 1
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                // increase quality by 1
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != ITEMS.Sulfuras) {
        // decrease quality by 1
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== ITEMS.AgedBrie) {
          if (this.items[i].name !== ITEMS.ConcertTicket) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name !== ITEMS.Sulfuras) {
                // decrease quality by 1
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = 0;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
