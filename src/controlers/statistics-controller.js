import {UserStatsComponent} from "../components/user-stats";
import {render} from "../components/utils/render";

export class UserStatsController {
  constructor(container) {
    this._container = container;
    this._userStatsComponent = new UserStatsComponent();
  }

  render() {
    render(this._container, this._userStatsComponent);
  }

  show() {
    this._userStatsComponent._element.classList.remove(`hidden`);
  }

  hide() {
    this._userStatsComponent._element.classList.add(`hidden`);
  }
}
