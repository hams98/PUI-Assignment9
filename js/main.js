//creating a scene
var scene = new THREE.Scene();

//create a camera

var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)
// we won't be able to see the object as we need to set camera position
camera.position.z = 5;

// renderer
var renderer = new THREE.WebGLRenderer({antialias: true}); 
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

// append child with renderer dom element (To display on the html page)
document.body.appendChild(renderer.domElement);

//it's not responsive i.e when you change window size 
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    // everytime the camera is adjusted we need to call 
    camera.updateProjectionMatrix();
})

//raycaster to determine where the mouse is
var raycaster =  new THREE.Raycaster();
var mouse = new THREE.Vector2();


//form and material

var geometry = new THREE.BoxGeometry(1,1,1);

var material = new THREE.MeshLambertMaterial({color:0xFFCC00});

// combine with mesh
var mesh = new THREE.Mesh(geometry, material);

// how to move it around (without animation)
/* mesh.position.set(2,2,-2 );
mesh.scale.set(1,2,1);
mesh.rotation.set(1,2,1) */


scene.add(mesh)


// set light
var light = new THREE.PointLight(0xFFFFFF,1,500)
light.position.set(10,0,25);
scene.add(light);

//to render the scene
//renderer.render(scene, camera);

//but aspect ratio gets skewed while being responsive with above code
var render = function(){

    requestAnimationFrame(render);
    //rotate or scale animation
    //you can rotate along multiple axes
   /*  mesh.rotation.x +=0.01;
       mesh.scale.x-=0.01; */
  renderer.render(scene, camera);
}
// function to detect muse click on object and then the animation takes place
function OnMouseMove(event){
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) *2 -1;
  mouse.y = -(event.clientY / window.innerHeight) *2 +1;
  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i=0; i < intersects.length; i++){
    this.t1 = new TimelineMax();
    this.t1.to (intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
    this.t1.to (intersects[i].object.scale, 0.5, {x: .05, ease: Expo.easeOut})
    this.t1.to (intersects[i].object.rotation, 1, {x: 2, ease: Expo.easeOut})
    this.t1.to (intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut},"=-1.5")       }
}
render();

//for animation sequences we can use gsap plugin

//this.t1 = new TimelineMax().delay(.3);
/* this.t1 = new TimelineMax({paused: true});
this.t1.to (this.mesh.scale, 1, {x: 2, ease: Expo.easeOut})
this.t1.to (this.mesh.scale, 0.5, {x: .05, ease: Expo.easeOut})
this.t1.to (this.mesh.rotation, 1, {x: 2, ease: Expo.easeOut})
this.t1.to (this.mesh.scale, 1, {x: 2, ease: Expo.easeOut},"=-1.5") */

//when there is a click event (anywhere) do the animation
/*  document.body.addEventListener('click', ()=>{
  this.t1.play();
})
*/

window.addEventListener('mousemove', OnMouseMove)
