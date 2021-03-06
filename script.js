var context, playerOne, controller, platforms, goal, loop;


context = document.getElementById('myCanvas').getContext('2d');

context.canvas.height = 1000;
context.canvas.width = 2000;

playerOne = { //Size of player and start position
    height: 25,
    width: 25,
    isOnGround: true,
    isJumping: false,
    positionX: /*(context.canvas.width - 25) / 2*/ 150,
    velocityX: 0,
    positionY: /*context.canvas.height - 25*/350,
    velocityY: 0,
};

platforms = [{ //new and improved platfrom structure
    height: 20, //7 a fälla
    width: 10,
    positionX: 540,
    positionY: 400
}, 


{
    height: 20, //1a
    width: 100,
    positionX: 1200,
    positionY: 400
   },

   {
    height: 20, //1a
    width: 100,
    positionX: 1000,
    positionY: 300
   },

   {
    height: 20, //överst höger
    width: 50,
    positionX: 700,
    positionY: 200
   },
{
    height: 20, //2a
    width: 100,
    positionX: 400,
    positionY: 750
   },
   
   
   {
    height: 20, //3a bredda
    width: 300,
    positionX: 520,
    positionY: 600
   },
   {
    height: 20, //3a vanster
    width: 180,
    positionX: 300,
    positionY: 600
   },
   {
    height: 20, //5a
    width: 100,
    positionX: 290,
    positionY: 800
   },
   
   {
    height: 20,   //5
    width: 250,
    positionX: 920,
    positionY: 520
   },
{
    height: 20, //6
    width: 30,
    positionX: 300,
    positionY: 320
}, {
    height: 20, //7a överst vanster
    width: 30,
    positionX: 900,
    positionY: 200
},
{
    height: 20, //7a överst höger
    width: 30,
    positionX: 800,
    positionY: 150
},

{
    height: 20, //7a hoger
    width: 28,
    positionX: 200,
    positionY: 200
}, 

{
    height: 20,  //överst till vänster sista
    width: 40,
    positionX: 265,
    positionY: 190
   },

   
   {
    height: 20,  //överst till vänster sista
    width: 30,
    positionX: 400,
    positionY: 120
   },

   {
    height: 20,
    width: 50,
    positionX: 540,
    positionY: 150
   },
{
    height: 10,
    width: context.canvas.width,
    positionX: (context.canvas.width - context.canvas.width) / 2,
    positionY: context.canvas.height -10, 
    
}];

goal = { //goal size and position
    height: 20,
    width: 50,
    positionX: 150,
    positionY: 70,
}
    goal2 = { //goal2 size and position
        height: 20,
        width: 190,
        positionX: 550,
        positionY: 400,  
};

goal2 = { //goal2 size and position
    height: 20,
    width: 240,
    positionX: 550,
    positionY: 400,  
};

goal3 = { //goal2 size and position
    height: 20,
    width: 50,
    positionX: 620,
    positionY: 150,  
};



controller = {  //Controlles for the player
    left: false,
    right: false,
    up: false,
    down: false,
    keyListner: function (event) {
        var keyState = (event.type == 'keydown') ? true : false; //cheacks if it is keydown or not
        switch (event.keyCode) {
            case 39:
                controller.right = keyState;
                break;
            case 37:
                controller.left = keyState;
                break;
            case 38:
                controller.up = keyState;
                break;
        }
    }
};

loop = function () {
    playerOne.velocityY *= 0.9; //friction
    playerOne.velocityX *= 0.9;

    if (controller.up && playerOne.isOnGround == true && playerOne.isJumping == false) { //set speed of which object will move in.
        playerOne.velocityY -= 30;
        playerOne.isOnGround = false;
    }
    else if (controller.right) {
        playerOne.velocityX += 1;
    }
    else if (controller.left) {
        playerOne.velocityX -= 1;
    };

    if (playerOne.velocityX < -4) { //max velocity
        playerOne.velocityX = -4;
    }
    if (playerOne.velocityX > 4) {
        playerOne.velocityX = 4;
    }
    if (playerOne.velocityY <= -30) {
        playerOne.velocityY = -30;
    }
    if (playerOne.velocityY > 8) {
        playerOne.velocityY = 8;
    }

    playerOne.isOnGround = false; //allways assum that player is not on the ground

    if (playerOne.positionY > context.canvas.height - 25) { //collision with floor
        //playerOne.positionY = context.canvas.height - 25; //this causes the shaking but removing this makes it not possible to jump on the floor.
        playerOne.isOnGround = true;
        playerOne.isJumping = false;
    } else if (playerOne.positionY < 0) { //collision with roof
        playerOne.velocityY = 1;
    } else if (playerOne.positionX > context.canvas.width - 25) { //collision with right wall. player reapers on opposite side
        playerOne.positionX = 0;
    } else if (playerOne.positionX < 0) { //collision with left wall. player reapers on opposite side
        playerOne.positionX = context.canvas.width - 25;
    }


    for (let i = 0; i < platforms.length; i++) { //new and improved platfrom collision
        const platform = platforms[i];

        if (playerOne.positionX + playerOne.width > platform.positionX && playerOne.positionX < platform.positionX + platform.width) {
            
            // Topside
            if (playerOne.positionY + playerOne.height + 4 > platform.positionY && playerOne.positionY + playerOne.height < platform.positionY + platform.height) {
                playerOne.isOnGround = true;
                if (controller.up && playerOne.isOnGround == true && playerOne.isJumping == false) { //set speed of which object will move in.
                    playerOne.velocityY -= 30;
                    playerOne.isOnGround = false;
                }
            };

            // Underside
            if (playerOne.positionY - 1 < platform.positionY + platform.height && playerOne.positionY > platform.positionY) {
                playerOne.velocityY = 0;
                playerOne.isOnGround = false;
            };

        }
    }

    //Goal platfrom
        if (playerOne.positionX + playerOne.width > goal.positionX && playerOne.positionX < goal.positionX + goal.width && 
    playerOne.positionY > goal.positionY - playerOne.height && playerOne.positionY < goal.positionY + goal.height) {
        location.reload();
        playerOne.isOnGround = true;
        alert('You Win!!');
        //window.location.replace("https://xenodochial-morse-75e689.netlify.com/?fbclid=IwAR135FGNzFDMLeFFWHWuHKdmRJs23GfmcQpxl9l8NG-VsKLRDnfCKn39tYMp://stackoverflow.com");
        
       
        // loadScript("script2.js", function() { playerOne.isOnGround = true }) 
        
        
    }
    
    if (playerOne.positionX + playerOne.width > goal2.positionX && playerOne.positionX < goal2.positionX + goal2.width && 
        playerOne.positionY > goal2.positionY - playerOne.height && playerOne.positionY < goal2.positionY + goal2.height) {
       playerOne.positionX = 1300;
       playerOne.positionY = 600;
        }

     if (playerOne.positionX + playerOne.width > goal3.positionX && playerOne.positionX < goal3.positionX + goal3.width && 
        playerOne.positionY > goal3.positionY - playerOne.height && playerOne.positionY < goal3.positionY + goal3.height) {
        playerOne.positionX = 1000;
        playerOne.positionY = 700;
            }


    //onground function
    if (!playerOne.isOnGround) { //gravity
        playerOne.velocityY += 1.5;
        playerOne.isJumping = true;
        console.log('Ground false');
    } else {
        playerOne.velocityY = 0;
        playerOne.isJumping = false;
        console.log('Ground true');
    }

    playerOne.positionX += playerOne.velocityX; //transfroms the speed to position.
    playerOne.positionY += playerOne.velocityY;

    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); //x, y, w, h
    context.fillStyle = 'white';
    context.beginPath();
    //drawing the player
    context.fillRect(playerOne.positionX, playerOne.positionY, playerOne.width, playerOne.height);
    //drawing the platforms
    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
    
        context.fillStyle="green";
        context.fillRect(platform.positionX, platform.positionY, platform.width, platform.height);
    };
    //drawing the goal
    context.font = "30px Arial";
    context.fillStyle ='purple';
    context.fillRect(goal.positionX, goal.positionY, goal.width, goal.height);
    context.fillText("GOAL", goal.positionX, goal.positionY, "100", "10");

    //draw
    context.fillStyle ='green';
    context.fillRect(goal2.positionX, goal2.positionY, goal2.width, goal2.height);

    // 
    context.fillStyle ='brown';
    context.fillRect(goal3.positionX, goal3.positionY, goal3.width, goal3.height);
    

    window.requestAnimationFrame(loop);
};
window.addEventListener('keydown', controller.keyListner);
window.addEventListener('keyup', controller.keyListner);

window.requestAnimationFrame(loop);