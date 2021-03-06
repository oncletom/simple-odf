import { List } from "../../src/text/List";
import { ListItem } from "../../src/text/ListItem";
import { TextDocument } from "../../src/TextDocument";

describe(List.name, () => {
  let document: TextDocument;
  let list: List;
  let testItem1: ListItem;
  let testItem2: ListItem;
  let testItem3: ListItem;

  beforeEach(() => {
    document = new TextDocument();
    list = document.addList();

    testItem1 = new ListItem("first");
    testItem2 = new ListItem("second");
    testItem3 = new ListItem("third");
  });

  it("NOT insert an empty list", () => {
    const documentAsString = document.toString();
    expect(documentAsString).not.toMatch(/<text:list/);
  });

  it("insert a list with a list item", () => {
    list.addItem("first");

    const documentAsString = document.toString();
    /* tslint:disable-next-line:max-line-length */
    expect(documentAsString).toMatch(/<text:list><text:list-item><text:p>first<\/text:p><\/text:list-item><\/text:list>/);
  });

  describe("#addItem", () => {
    beforeEach(() => {
      list.addItem("first");
    });

    it("create new item at the end of the list and return the added item", () => {
      const addedItem = list.addItem("second");

      expect(addedItem).toEqual(testItem2);
      expect(list.getItems()).toEqual([testItem1, testItem2]);
    });

    it("add new item to the end of the list and return the added item", () => {
      const addedItem = list.addItem(testItem2);

      expect(addedItem).toBe(testItem2);
      expect(list.getItems()).toEqual([testItem1, testItem2]);
    });
  });

  describe("#insertItem", () => {
    let itemToAdd: ListItem;

    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);

      itemToAdd = new ListItem("new");
    });

    it("insert item at the specified position and return the added item", () => {
      const insertedItem = list.insertItem(2, "new");

      expect(insertedItem).toEqual(itemToAdd);
      expect(list.getItems()).toEqual([testItem1, testItem2, itemToAdd, testItem3]);
    });

    it("add new items to the specified position and return the added item", () => {
      const insertedItem = list.insertItem(2, itemToAdd);

      expect(insertedItem).toBe(itemToAdd);
      expect(list.getItems()).toEqual([testItem1, testItem2, itemToAdd, testItem3]);
    });

    it("insert item at the front of the list if position is negative", () => {
      const insertedItem = list.insertItem(-2, itemToAdd);

      expect(insertedItem).toBe(itemToAdd);
      expect(list.getItems()).toEqual([itemToAdd, testItem1, testItem2, testItem3]);
    });

    it("insert item at the end of the list if position is larger than the size of the list", () => {
      const insertedItem = list.insertItem(10, itemToAdd);

      expect(insertedItem).toBe(itemToAdd);
      expect(list.getItems()).toEqual([testItem1, testItem2, testItem3, itemToAdd]);
    });
  });

  describe("#getItem", () => {
    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);
    });

    it("get the item at the specified position", () => {
      const item = list.getItem(1);

      expect(item).toEqual(testItem2);
    });

    it("return undefined if the specified position is less then 0", () => {
      const item = list.getItem(-2);

      expect(item).toBeUndefined();
    });

    it("return undefined if the specified position is larger than the list size", () => {
      const item = list.getItem(10);

      expect(item).toBeUndefined();
    });
  });

  describe("#getItems", () => {
    it("return the items in order", () => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);

      const items = list.getItems();

      expect(items).toEqual([testItem1, testItem2, testItem3]);
    });
  });

  describe("#removeItemAt", () => {
    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);
    });

    it("remove the item at the specified position and return it", () => {
      const removedItem = list.removeItemAt(1);

      expect(removedItem).toEqual(testItem2);
      expect(list.getItems()).toEqual([testItem1, testItem3]);
    });

    it("return undefined if the specified position is less then 0", () => {
      const removedItem = list.removeItemAt(-2);

      expect(removedItem).toBeUndefined();
    });

    it("return undefined if the specified position is larger than the list size", () => {
      const removedItem = list.removeItemAt(10);

      expect(removedItem).toBeUndefined();
    });
  });

  describe("#clear", () => {
    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);
    });

    it("remove all items from the list", () => {
      list.clear();

      expect(list.size()).toBe(0);
    });
  });

  describe("#size", () => {
    beforeEach(() => {
      list.addItem(testItem1);
      list.addItem(testItem2);
      list.addItem(testItem3);
    });

    it("return the size of the list", () => {
      expect(list.size()).toBe(3);
    });
  });
});
