interface ICategoriesStoreState {
  categories: any[];
}

export default class CategoriesStore {
  public state: ICategoriesStoreState = {
    categories: []
  };

  constructor() {

  }

  getCategories() {
    return this.state.categories;
  }
}
