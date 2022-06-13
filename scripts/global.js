const container = document.getElementById('container');
let container1 = document.createElement('div');
const resultElt = document.getElementById('resultContainer');
const wpmElt = document.getElementById('wpm')
const accuracyElt = document.getElementById('accuracy')
const timeElt = document.getElementById('time')
const retryElt = document.getElementById('retry');
const timerElt = document.getElementById('timer');
let letterContainers = [];
container1.id = 'container-1';

let index = 0;
let countError = 0;
let error = false;
let begin = false;
let beginTime = 0;
let typed = 0;