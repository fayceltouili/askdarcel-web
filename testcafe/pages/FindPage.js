import ReactSelector from 'testcafe-react-selectors';

export default class FindPage {
  constructor() {
    this.categoryButton = ReactSelector('ContentPage CategoryItem');
  }
}