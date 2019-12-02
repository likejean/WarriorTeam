export function Statistics(followers){
    var node = document.createElement("UL"); 
    node.style.fontSize = "45px";
    node.style.color = "green";

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

    followers.map(follower => {
        let listItem = document.createElement('LI');
        let textnode = document.createTextNode(follower.id + 1 + ". Follower: health = " + follower.health + "; ");
        listItem.id = follower.id;         // Create a text node        
        listItem.appendChild(textnode);  
        node.appendChild(listItem);
        CreateHealthBar(node, follower.id);
    });    
    document.getElementById("followers").appendChild(node);     
}

export function Update(followers){

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
}

    

