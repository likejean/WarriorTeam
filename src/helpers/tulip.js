export default function ToolTip(follower) {
    var ref = this; 
    this.follower = follower;
    var timeout = 1000,
    div = document.createElement("div"),      // the tool-tip div
    parent = follower.canvas.parentNode,               // parent node for canvas
    visible = false; 
    div.style.cssText = "width:" + this.follower.width/2 + "px; height:" + this.follower.height/5 + "px; background-color: rgba(255,125,255,0.3); color: #fff; text-align: center; border-radius: 6px; padding: 4px 0; position: absolute; z-index: 1; bottom: 100%; left: 50%; margin-right: 50px;";
    div.innerHTML = follower.id;
    
    this.update = () => {
        let region = {
            x: ref.follower.position.x, 
            y: ref.follower.position.y, 
            w: ref.follower.width/4, 
            h: ref.follower.height/4
        }; 
        function show(pos) {
            if (!visible) {                             // ignore if already shown (or reset time)
                visible = true;                           // lock so it's only shown once
                setDivPos(pos);                           // set position
                parent.appendChild(div);                  // add to parent of canvas
                setTimeout(hide, timeout);                // timeout for hide
            }
        }
        function hide() {
            visible = false;                            // hide it after timeout
            parent.removeChild(div);                    // remove from DOM
        }
        function check(e) {
            if (!visible &&
                e.clientX >= region.x && e.clientX < region.x + region.w &&
                e.clientY >= region.y && e.clientY < region.y + region.h) {
                show(region);                          // show tool-tip at this pos
            }
            else setDivPos(region);                    
        }
        function setDivPos(pos) {
            if (visible){
                if (pos.x < 0) pos.x = 0;
                if (pos.y < 0) pos.y = 0;
                // other bound checks here
                div.style.left = pos.x + "px";
                div.style.top = pos.y + "px";
            }
        }
        follower.canvas.addEventListener("mousemove", check);
        setTimeout(() => follower.canvas.removeEventListener("mousemove", check),1000); 
    } 
}