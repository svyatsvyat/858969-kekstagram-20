var pictureArray = [];
var comment = [];
var names = [
  'Игорь', 'Ольга', 'Святослав', 'Екатерина', 'Михаил', 'Константин', 'Маша', 'Григорий', 'Николай', 'Александр'
];
var messageText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

var createComment = function () {
  for (var i = 0; i < randomInteger(0, 5); i++) {
    comment[i] = {
      message: messageText[randomInteger(0, messageText.length - 1)],
      avatar: "img/avatar-" + randomInteger(1, 6) + ".svg",
      name: names[randomInteger(0, names.length - 1)]
    }
  }
  return comment;
};

var createArray = function (i) {
  var object = {
    url: 'photos/' + (i + 1) + '.jpg',
    description: "описание фотографии",
    likes: randomInteger(15, 200),
    comments: createComment()
  };
  pictureArray[i] = object;
  return pictureArray[i];
};

for (var i = 0; i < 25; i++) {
  createArray(i);
  var picture = pictureTemplate.cloneNode(true);
  var pictureSrc = picture.querySelector('.picture__img');
  var pictureComments = picture.querySelector('.picture__comments');
  var pictureLikes = picture.querySelector('.picture__likes');
  pictureSrc.src = pictureArray[i].url;
  pictureComments.textContent = pictureArray[i].comments.length;
  pictureLikes.textContent = pictureArray[i].likes;
  pictures.appendChild(picture);
}

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// full-size img
var pictureBig = document.querySelector('.big-picture');
pictureBig.classList.remove('hidden');

var pictureBigImg = pictureBig.querySelector('img');
var pictureBigLikes = pictureBig.querySelector('.likes-count');
var pictureBigCommentsCountText = pictureBig.querySelector('.comments-count');

pictureBigImg.src = pictureArray[0].url;
pictureBigLikes.textContent = pictureArray[0].likes;
pictureBigCommentsCountText.textContent = pictureArray[0].comments.length;

var pictureBigCommentsList = pictureBig.querySelector('.social__comments');
var pictureBigComments = document.querySelector('#comment').content;
var pictureBigComment = pictureBigComments.querySelector('.social__comment');
var pictureBigCommentAvatar = pictureBigComment.querySelector('.social__picture');
var pictureBigCommentText = pictureBigComment.querySelector('.social__text');

var pictureBigCaption = pictureBig.querySelector('.social__caption');
pictureBigCaption.textContent = pictureArray[0].description;
var pictureBigCommentsCount = pictureBig.querySelector('.social__comment-count');
var pictureBigCommentsLoad = pictureBig.querySelector('.comments-loader');
pictureBigCommentsCount.classList.add('hidden');
pictureBigCommentsLoad.classList.add('hidden');

pictureBigCommentsList.innerHTML='';
for (var i = 0; i < pictureArray[0].comments.length; i++) {
pictureBigCommentText.textContent = pictureArray[0].comments[i].message;
pictureBigCommentAvatar.src = pictureArray[0].comments[i].avatar;
var newComment = pictureBigComment.cloneNode(true);
pictureBigCommentsList.appendChild(newComment);
}

var body = document.querySelector('body');
body.classList.add('modal-open');
