import {render} from "../components/utils/render";
import { renderBoard } from "../main";

export class FilmBoardController {

  constructor(container) {
    this._container = container;
  }

  render() {
    renderBoard(this._container);
  }

}
