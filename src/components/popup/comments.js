import {createNewElement} from "../../utils";

const createComment = (comments) => {
  const watchingDate = new Date(Date.parse(comments.date));
  const fullWatchingDate = `${watchingDate.getFullYear()}/${watchingDate.getMonth() + 1}/${watchingDate.getDate()} ${watchingDate.getHours()}:${watchingDate.getMinutes()}`;

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comments.emotion}.png" width="55" height="55" alt="emoji-${comments.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comments.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comments.author}</span>
        <span class="film-details__comment-day">${(Date.now() - watchingDate < 1000 * 60) ? `One minute ago` : fullWatchingDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

export const createComments = (comments) => {
  let allComents = [];
  for (let i = 0; i < comments.length; i++) {
    allComents.push(createComment(comments[i]));
  }
  return allComents;
};

export class CommentComponent {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
  }

  getTemplate() {
    return createComment(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createNewElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

// export class CommentsComponent {
//   constructor(comments) {
//     this._comments = comments;
//     this._element = null;
//   }

//   getTemplate() {
//     return createComments(this._comments);
//   }

//   getElement() {
//     if (!this._element) {
//       this._element = this.getTemplate();
//       console.log(this._element)
//       //this._element = createNewElement(elem);
//     }
//     return this._element.lastChild;
//   }

//   removeElement() {
//     this._element = null;
//   }
// }



