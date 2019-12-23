export function Statistics(followers, tank){
    //For Followers
    var nodeFollowers = document.createElement("UL");
    nodeFollowers.style.listStyleType = "none"; 
    nodeFollowers.style.fontSize = "45px";
    nodeFollowers.style.color = "green";

    //For Battle Tank
    var nodeTank = document.createElement("UL");
    nodeTank.style.listStyleType = "none"; 
    nodeTank.style.fontSize = "45px";
    nodeTank.style.color = "blue";

    //Creating HTML elements for Health Bar
    function CreateHealthBar(htmlElem, index){
        var barContainer = document.createElement("DIV");
        var bar = document.createElement("DIV");
        barContainer.classList.add('bar-container');
        bar.classList.add('bar');
        barContainer.appendChild(bar);
        barContainer.id = 'bar' + index;
        htmlElem.appendChild(barContainer)
    }
    //For Followers
    followers.map(follower => {
        let listItem = document.createElement('LI');
        let textnode = document.createTextNode(follower.id + 1 + ". Follower: health = " + follower.health + "; ");
        listItem.id = follower.id;         // Create a text node        
        listItem.appendChild(textnode);  
        nodeFollowers.appendChild(listItem);
        CreateHealthBar(nodeFollowers, follower.id);
    }); 
    document.getElementById("followers").appendChild(nodeFollowers);   
    
    //For Battle Tank
    let listItem = document.createElement('LI');
    let textnode = document.createTextNode("Tank: health = " + tank.health + "; ");
    listItem.id = 0;         // Create a text node        
    listItem.appendChild(textnode);  
    nodeTank.appendChild(listItem);
    CreateHealthBar(nodeTank, 0);  
    document.getElementById("tank").appendChild(nodeTank);     
}

export function Update(followers, tank){

    function UpdateHealthBar(index, health, color){
        document.getElementById('bar' + index).querySelector('.bar').style.width = Math.round(100 * health / 6) + "%";
        document.getElementById('bar' + index).querySelector('.bar').style.backgroundColor = color;
    }

    followers.map(follower => {
        let color = '';
        document.getElementById(follower.id).innerHTML = follower.id + ". Follower: health = " + follower.health + "; ";
        
        if(follower.health < 5 && follower.health >= 3) color = 'orange';
        else if(follower.health <= 2 && follower.health > 1) color = 'red';
        else if(follower.health <= 1) {
            color = 'grey';
            document.getElementById(follower.id).innerHTML = follower.id + ". Follower: KILLED; ";
        }
        UpdateHealthBar(follower.id, follower.health, color);
        document.getElementById(follower.id).style.color = color;
    });


    let color = '', ratio = followers.health / tank.health;
    document.getElementById(tank.id).innerHTML = "Tank: health = " + tank.health + "; ";
    
    if(tank.health < 50 && tank.health >= 30) color = 'orange';
    else if(tank.health <= 20 && tank.health > 10) color = 'red';
    else if(tank.health <= 10) {
        color = 'grey';
        document.getElementById(tank.id).innerHTML = tank.id + ". Tank: DESTROYED; ";
    }
    UpdateHealthBar(tank.id, tank.health * ratio, color);
    document.getElementById(tank.id).style.color = color;
}

    

