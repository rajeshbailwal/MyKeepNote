export class Note {
  id: Number;
  title: string;
  text: string;
  state: string;
  userid: Number;
  tags: Array<string>;

  constructor() {
    this.title = '';
    this.text = '';
    this.state = 'not-started'; // default state
  }
}
