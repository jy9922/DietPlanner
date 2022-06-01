const main = document.querySelector('#main');
const exercise = document.querySelector('#exercise');
const planner = document.querySelector('#planner');
const endpoint = 4;

const myKcal = [ ];
const myPlannerLink = [ ];
const exName = [ ];

function addAnswer(answerText, eIdx, index){
    var a = document.querySelector('.aBox');
    var answer = document.createElement('button');

    answer.classList.add('answerList');
    answer.classList.add('my-5');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');

    answer.classList.add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener('click', function( ){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i <children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.aimation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            for (let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }

            var name = exerciseList[eIdx].a[index].exercises;
            exName.push(name);

            var mylink = exerciseList[eIdx].a[index].link;
            myPlannerLink.push(mylink);

            var kcal = exerciseList[eIdx].a[index].kcal;
            myKcal.push(kcal);

            goNext(++eIdx);
        }, 450)
    }, false)
}
function calKcal( ){
    var total = 0;
    for (let i = 0; i < myKcal.length; i++){
        total += myKcal[i];
    }
    return total;
}
function setResult( ){
    let kcal_total = calKcal( );
    const plannerKcal = document.querySelector('.plannerKcal');
    plannerKcal.innerHTML = "&#128293 오늘 불태울 칼로리 : " + kcal_total + 'Kcal &#128293';

    const plannerLink = document.querySelector('.pBox');

    for (let i = 0; i < myPlannerLink.length; i++){
        var link = document.createElement('button');
        var exerciseName = document.createElement('p');
        
        exerciseName.classList.add('linkList');
        exerciseName.classList.add('my-2');
        exerciseName.classList.add('mt-3');
        exerciseName.classList.add('py-3');
        exerciseName.classList.add('mx-auto');

        link.classList.add('py-3');
        link.classList.add('px-5');
        link.classList.add('mx-auto');
        link.classList.add('exercisename');

        plannerLink.appendChild(exerciseName);
        exerciseName.innerHTML = exName[i];
        plannerLink.append(link);

        link.innerHTML = '운동하러 가기'
        link.onclick = function( ){
            var golink = myPlannerLink[i];
            window.open(golink);
        }
    }
    
    var plannerImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = "https://mblogthumb-phinf.pstatic.net/MjAxNzAzMjJfMjY2/MDAxNDkwMTQyNTQ0NjMz.tvDn5qO8P-FrVFn3xGsAusdl28Kazv-vyYwgMU3XMBAg.qTfJr_HWTzLax67ZZMGzsBcboyF7MyCVL_HM7wHZox8g.GIF.neoksthink/%EC%9A%B4%EB%8F%99%ED%95%98%EB%8A%94_%ED%86%A0%ED%86%A0%EB%A1%9C_1.GIF?type=w2";
    plannerImg.src = imgURL;
    plannerImg.alt = 'myplanner';
    plannerImg.classList.add('img-fluid');
    imgDiv.appendChild(plannerImg);

}

function goResult( ){
    exercise.style.WebkitAnimation = 'fadeOut 1s';
    exercise.animation = 'fadeOut 1s';
    setTimeout(( ) => {
        planner.style.WebkitAnimation = 'fadeIn 1s';
        planner.animation = 'fadeIn 1s';
        setTimeout(( ) => {
            exercise.style.display = 'none';
            planner.style.display = 'block';         
        }, 450);
    }, 450);
    setResult( );
}

function goNext(eIdx){
    if (eIdx === endpoint){
        goResult();
        return;
    }
    var e = document.querySelector('.eBox');
    e.innerHTML = exerciseList[eIdx].e;

    for(let i in exerciseList[eIdx].a)
    {
        addAnswer(exerciseList[eIdx].a[i].exercises, eIdx, i);
    }

    var countStatusNum = document.querySelector('.countStatus');
    countStatusNum.innerHTML = (eIdx + 1) + '/' + endpoint;

    var status = document.querySelector('.statusBar');
    status.style.width = (100/endpoint) * (eIdx+1) + '%';
}

function start( ){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.aimation = "fadeOut 1s";
    setTimeout(( ) => {
        exercise.style.WebkitAnimation = "fadeIn 1s";
        exercise.style.aimation = "fadeIn 1s";
        setTimeout(( ) => {
            main.style.display = 'none';
            exercise.style.display = 'block';
        }, 450);
        let eIdx = 0;
        goNext(eIdx);
    }, 450);
}