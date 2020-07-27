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
// pictureBig.classList.remove('hidden');

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

pictureBigCommentsList.innerHTML = '';
for (var i = 0; i < pictureArray[0].comments.length; i++) {
  pictureBigCommentText.textContent = pictureArray[0].comments[i].message;
  pictureBigCommentAvatar.src = pictureArray[0].comments[i].avatar;
  var newComment = pictureBigComment.cloneNode(true);
  pictureBigCommentsList.appendChild(newComment);
}

var body = document.querySelector('body');
body.classList.add('modal-open');

var uploadBtn = document.querySelector('#upload-file');
var formEditImg = document.querySelector('.img-upload__overlay');
var closeBtn = document.querySelector('#upload-cancel');


uploadBtn.addEventListener('change', function () {
  formEditImg.classList.remove('hidden');
});

closeBtn.addEventListener('click', function () {
  formEditImg.classList.add('hidden');
  uploadBtn.value = '';
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    formEditImg.classList.add('hidden');
    uploadBtn.value = '';
  }
});


//Отпускание элемента

var effectScroll = document.querySelector('.effect-level__pin');

effectScroll.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  console.log('fff');
});

var effectLvl = document.querySelector('.effect-level__value');
effectLvl.value = effectScroll.style.left;

var filterRadio = document.querySelectorAll('.effects__radio');

var addFilterClickHeandler = function (filterRadio) {
  filterRadio.addEventListener('change', function () {
    effectScroll.style.left = '0';
    effectLvl.value = effectScroll.style.left;
  });
};

for (var i = 0; i < filterRadio.length; i++) {
  addFilterClickHeandler(filterRadio[i]);
}

//валидация хеш тегов
var hashtags = document.querySelector('.text__hashtags');
var imgPublish = document.querySelector('#upload-select-image');

imgPublish.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var hashtagsSplit = hashtags.value.split(' ');
  var tagValid = true;

  if (hashtagsSplit.length <= 5) {
    tagValid = false;
  } else {
    for (var i = 0; i < hashtagsSplit.length; i++) {
      if (hashtagsSplit[i].charAt(0) !== '#' || hashtagsSplit[i].length > 20 || hashtagsSplit[i].length === 1) {
        tagValid = false;
      }
    }
  }
  if (!tagValid) {
    hashtags.setCustomValidity('loh');
  }
});

