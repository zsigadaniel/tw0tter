// Main variables
let postsZone = document.querySelector('.posts-zone');
let postsControl = document.querySelector('.postsControl');
let button = document.querySelector('header button');
let message = document.querySelector('header h3');
let message2 = document.querySelector('header h4');

// HTML variable
let text = `
<div class ="postsContainer">
<div class="posts">
      <div class="profilePick"></div>
      <div class="textContainer">
          <div class="nameTagTime">
              <div class="userName"></div>
              <div class="userTag"></div>
              <div class="timeOfPost"></div>
          </div>
          <div class="post"></div>
      </div>
</div>
   <div class="userInteractions">
      <div class="comment"></div>
      <div class="retweet"></div>
      <div class="like"></div>
   </div>
</div>`

// The main function
async function list() {
    // List function variables
    let titleName = '';
    // Data fetching zone
    let data = await fetch('https://jsonplaceholder.typicode.com/posts');
    let users = await fetch('https://jsonplaceholder.typicode.com/users');
    let images = await fetch('https://jsonplaceholder.typicode.com/photos');

    let dataJson = await data.json();
    let usersJson = await users.json();
    let imagesJson = await images.json();

    //Data manipulation zone
    let name = dataJson.filter(ti => ti.id <= 10).map(tit => tit.title).forEach((nam) => {
        titleName += text;
        postsControl.innerHTML = titleName;
    });

    let postCont = dataJson.filter(ct => ct.id <= 10).map(cont => cont.body);
    let useId = usersJson.map(use => use.name);
    let userTag = usersJson.map(ustg => ustg.username);
    let profilePick = imagesJson.filter(im => im.id <= 10).map(proIm => proIm.url);
    let post = document.querySelectorAll('.post');
    let posts = document.querySelectorAll('.posts');
    let userName = document.querySelectorAll('.userName');
    let tag = document.querySelectorAll('.userTag');
    let pic = document.querySelectorAll('.profilePick');
    let timeOfPost = document.querySelectorAll('.timeOfPost');
    let postContainer = document.querySelectorAll('.postsContainer');
    // Function that places the data inside the DOM
    function thePosts(hold1, hold2) {
        return new Promise((resolve, reject) => {
            let array = [];
            let counter = -1;
            let counter1 = -1;
            let myTimer = setInterval(() => {
                counter++;
                counter1++;
                array.push(hold1[counter]);
                hold2[counter1].innerHTML = array[counter1];
                postContainer[counter1].classList.add('borderBottom');
                posts[counter1].style.margin = '10px';
                if (hold1 == profilePick && hold2 == pic) {
                    hold2[counter1].classList.add('profilePickDisplay')
                    hold2[counter1].style.background = `url('${array[counter1]}')`
                    hold2[counter1].style.backgroundPosition = "center";
                    hold2[counter1].style.backgroundSize = "cover";
                    hold2[counter1].innerHTML = '';
                }
                if (counter >= postCont.length - 1) {
                    clearInterval(myTimer);
                }
                let error = false;
                if (!error) {
                    resolve()
                } else {
                    reject()
                }

            }, 2000);
        })

    }
    thePosts(postCont, post);
    thePosts(useId, userName);
    thePosts(userTag, tag);
    thePosts(profilePick, pic);

    // Function that controls the timers for each post
    function time() {
        let counter = -1;

        function secondCount(postings) {
            let secs = 0;
            let minutes = 0;
            let hours = 0;
            setInterval(() => {
                secs++
                if (minutes < 1 && hours < 1) {
                    postings.innerHTML = `${secs}s`;
                }
                if (secs == 60) {
                    minutes++
                }
                if (hours <= 1 && secs == 60) {
                    postings.innerHTML = `${minutes}m`;
                }
                if (secs == 60) {
                    secs = 0;
                }
                if (minutes == 60) {
                    hours++
                    minutes = 0;
                    postings.innerHTML = `${hours}h`;
                }
            }, 1000)
        }

        //Function that inserts the timers in each post
        function insertTimer() {
            let myTimer2 = setInterval(() => {
                counter++;
                secondCount(timeOfPost[counter]);
                if (counter >= timeOfPost.length - 1) {
                    clearInterval(myTimer2);
                }
            }, 2000);
        }
        insertTimer();
    }
    time();

}

//Prevents user form making multiple data requests
let controler = true;
button.addEventListener('click', () => {
    if (controler == false) {
        message2.style.display = 'block'
        setTimeout(() => {
            message2.style.display = 'none';
        }, 3000);
        return;
    }
    message.style.display = 'block'
    setTimeout(() => {
        message.style.display = 'none'
    }, 3000);
    list();
    controler = false;
})






// function summing(value) {
//     let number = [];
//     for (let i = 0; i < value.length; i++) {
//         number.push(parseInt(value[i]))
//     }

//     function adder(total, num) {
//         return total + num;
//     }

//     let number2 = number.reduce(adder)
//     return number2;
// }


// let result = summing('252525');


// function checker(result) {
//     if (result > 10) {
//         let chk = summing(result.toString())
//         console.log(chk);
//         if (chk > 10) {
//             console.log(summing(chk.toString()));
//         }
//     }
// };
// console.log(result);
// checker(result);