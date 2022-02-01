const {Shop, Item} = require("../src/gilded_rose");

const ItemType = {
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
  AgedBrie: 'Aged Brie',
  ConcertTicket: 'Backstage passes to a TAFKAL80ETC concert',
  CoolItem: "super cool item",
  Conjured: 'Conjured'
};

const QUALITY = {
  sulfurasQuality: 80,
  agedBrieQuality: 2,
  concertQuality: 5,
  coolItemQuality: 20,
  conjuredQuality: 20
};

describe("Gilded Rose", function() {
  it("should not modify the sell in of a Sulfuras item", function() {
    const quality = QUALITY.sulfurasQuality;
    const sellIn = 5;
    let items = [new Item(ItemType.Sulfuras, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(sellIn);
    }
  });

  it(`should not modify the quality of a Sulfuras item (remains ${QUALITY.sulfurasQuality})`, function() {
    const quality = QUALITY.sulfurasQuality;
    const sellIn = 5;
    let items = [new Item(ItemType.Sulfuras, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality);
    }
  });

  it("should increase the quality of the aged brie item by 1 up until sellIn === 0", function() {
    let quality = QUALITY.agedBrieQuality;
    const sellIn = 3;
    let items = [new Item(ItemType.AgedBrie, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = sellIn; i > 0; i--) {
      items = gildedRose.updateQuality();
      quality = quality + 1;
    }
    expect(items[0].quality).toBe(quality);
  });

  it("should increase the quality of the aged brie item by 2 after sellIn has passed", function() {
    let quality = QUALITY.agedBrieQuality;
    const sellIn = 0;
    let items = [new Item(ItemType.AgedBrie, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i > -3; i--) {
      items = gildedRose.updateQuality();
      quality = quality + 2;
    }
    expect(items[0].quality).toBe(quality);
  });

  it("should increase the quality of the concert ticket item by 2 until sellin is 5 or less", function() {
    const quality = QUALITY.concertQuality;
    const sellIn = 10;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < sellIn-5; i++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality + 2*(i+1));
    }
  });

  it("should increase the quality of the concert ticket item by 1 until sellin is 10 or less", function() {
    const quality = QUALITY.concertQuality;
    const sellIn = 15;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = sellIn; i > 10; i--) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality + (sellIn - i) + 1);
    }
  });

  it("should increase the quality of the concert ticket item by 3 when sellin is 5 or less", function() {
    let quality = QUALITY.concertQuality;
    const sellIn = 5;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = sellIn; i > 0; i--) {
      items = gildedRose.updateQuality();
      quality = quality + 3;
      expect(items[0].quality).toBe(quality);
    }
  });

  it("concert ticket item should have quality of 0 when sellin is 0 or less", function() {
    let quality = QUALITY.concertQuality;
    const sellIn = 0;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = sellIn; i > -3; i--) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    }
  });

  it("should degrade non-special items by 1 each day", function() {
    let quality = QUALITY.coolItemQuality;
    const sellIn = 10;
    let items = [new Item(ItemType.CoolItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = sellIn; i > 0; i--) {
      items = gildedRose.updateQuality();
      if (quality > 0) {
        quality = quality - 1;
      }
      expect(items[0].quality).toBe(quality);
    }
  });

  it("should degrade non-special items twice as fast once the sell by date has passed", function() {
    let quality = QUALITY.coolItemQuality;
    const sellIn = 0;
    let items = [new Item(ItemType.CoolItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i > -3; i--) {
      items = gildedRose.updateQuality();
      if (quality > 1) {
        quality = quality - 2;
      } else {
        quality = 0;
      }
      expect(items[0].quality).toBe(quality);
    }

  });

  it("should degrade conjured items by 2 each day", function() {
    let quality = QUALITY.conjuredQuality;
    const sellIn = 10;
    let items = [new Item(ItemType.Conjured, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = sellIn; i > 0; i--) {
      items = gildedRose.updateQuality();
      if (quality > 0) {
        quality = quality - 2;
      }
      expect(items[0].quality).toBe(quality);
    }
  });

  it("should degrade conjured items twice as fast once the sell by date has passed", function() {
    let quality = QUALITY.conjuredQuality;
    const sellIn = 0;
    let items = [new Item(ItemType.Conjured, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i > -3; i--) {
      items = gildedRose.updateQuality();
      if (quality > 1) {
        quality = quality - 4;
      } else {
        quality = 0;
      }
      expect(items[0].quality).toBe(quality);
    }

  });

  it("should never have quality less than 0", function() {
    let quality = QUALITY.coolItemQuality;
    const sellIn = 0;
    let items = [new Item(ItemType.CoolItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = sellIn; i > -30; i--) {
      items = gildedRose.updateQuality();
      
      if (quality > 0) {
        quality = quality - 2;
      }
    }
    expect(items[0].quality).toBe(0);
  });


  it("should never have quality be more than 50", function() {
    const quality = QUALITY.agedBrieQuality;
    const sellIn = 0;
    let items = [new Item(ItemType.AgedBrie, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i > -60; i--) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(50);
  });
});

// Example items
//
// const items = [
//   new Item("+5 Dexterity Vest", 10, 20),
//   new Item("Aged Brie", 2, 0),
//   new Item("Elixir of the Mongoose", 5, 7),
//   new Item("Sulfuras, Hand of Ragnaros", 0, 80),
//   new Item("Sulfuras, Hand of Ragnaros", -1, 80),
//   new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
//   new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
//   new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

//   // This Conjured item does not work properly yet
//   new Item("Conjured Mana Cake", 3, 6),
// ];